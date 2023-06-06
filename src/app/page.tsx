import Image from 'next/image'
import { client } from "./lib/sanityClient"
import { Image as IImage } from "sanity"
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
  category: {
    name: string
  }
}

export default async function Home() {
  const data: IProduct[] = await getProductData()

  return (
    <div className='grid grid-cols-[auto,auto,auto] justify-center gap-x-10
     '>
      {data.map((item) => (
        // eslint-disable-next-line react/jsx-key
        <div>
          <Image
            width={300}
            height={400}
            className='max-h-[300px] object-cover object-top'
            src={urlForImage(item.image).url()} alt='product' />
          <h1 className='text-green-400 '>{item.title}</h1>
          <h3>${item.price}</h3>
          <h6 className='text-yellow-300'>{item.description}</h6>
          <button className='border py-2 px-6 rounded bg-neutral-800 text-white  hover:bg-sky-700 '>Add to Card </button>
        </div>
      ))}
    </div>
  )
}
