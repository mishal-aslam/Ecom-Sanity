import Image from 'next/image'
import { client } from "./lib/sanityClient"
import { Image as IImage} from "sanity"
import { urlForImage } from '../../sanity/lib/image'

export const getProductData = async () => {
  const res = await client.fetch(`*[_type=="product"]{
    price, 
    _id,
    title,
    image,
    category -> {
      name
    }
  }`);
  return res
}

interface IProduct {
  title: string,
  _id: string,
  description: string,
  image: IImage,
  price: number,
  category:{
    name: string
  }
}

export default async function Home() {
  const data: IProduct[] = await getProductData()

  return (
    <div className='grid grid-cols-[auto,auto,auto] justify-center gap-x-10
     '>
      {data.map((item) => (
       <>
<Image 
width={300}
height={400}
className='max-h-[300px] object-cover'
src={urlForImage(item.image).url()} alt='product' />
       </>
      ))}
    </div>
  )
}
