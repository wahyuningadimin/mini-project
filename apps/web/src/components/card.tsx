import { formatDate } from "@/app/helper/formatDate";
import { splitString } from "@/app/helper/splitString";
import Link from "next/link"

interface ICardBlog {
    id: number
    image: string
    name: string
    event_date: string
    location: string
    slug: string
}

export const CardBlog: React.FC<ICardBlog> = ({ id, image, name, event_date, location, slug }) => {
    return (
        <main className='py-4 px-8'>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      <Link key={id} href={`/events/${id}`}>
        <div className="relative bg-white border border-gray-200 shadow-lg flex flex-col transition-transform transform hover:scale-105 p-4" style={{ width: '100%', paddingBottom: '150%' }}>
          <div className="absolute inset-0 flex flex-col">
            <img src={image} alt={name} className="w-full h-3/4 object-cover mb-1" style={{ height: '68%' }} />
            <div className="flex flex-col flex-grow px-4 pt-2" style={{ height: '10%' }}>
              <h2 className="text-lg font-semibold text-gray-900 mb-1">{name}</h2>
              <p className="text-gray-600 text-sm mb-1">{formatDate(event_date)}</p>
              <p className="text-gray-500 text-sm mb-4">{location}</p>
            </div>
          </div>
        </div>
      </Link>
  </div>
</main>
    )
}