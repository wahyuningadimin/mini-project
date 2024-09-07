'use client'

import { CardBlog } from "@/components/card"
import Wrapper from "@/components/wrapper"
import { getEvents } from "@/lib/events"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { useDebounce } from "use-debounce"
import { formatDate } from "../helper/formatDate"

export default function SearchEvent() {
    const searchParams = useSearchParams()
    const querySearch = searchParams.get('search')
    const searchRef = useRef<HTMLInputElement | null>(null)
    const [data, setData] = useState([])
    const [search, setSearch] = useState<string>( querySearch || '')
    const [value] = useDebounce(search, 1000)
    const router = useRouter()
    

    const handleChange = () => {
        if(searchRef.current) {
            setSearch(searchRef.current.value)
        }
    }

    const getData = async () => {
        try{
            router.push(`?search=${value}`)
            const { events } = await getEvents()
            setData(events);
        } catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        getData()
    }, [value])

    return (
        <Wrapper>
            <div className="flex w-full justify-center">
                <input 
                onChange={handleChange}
                ref={searchRef}
                type="text" 
                className="border border-gray-500 h-10 w-full max-w-[500px] rounded-md"
                placeholder="Search Event"
                />
            </div>
            <div>
            <div></div>
            <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-2">
        {
          data.map((items: any) => {
            return (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                  <div key={event.id} className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
                    <img src={event.image} alt={event.name} className="w-full h-40 object-cover rounded-t-lg" />
                    <div className="mt-4">
                      <h2 className="text-xl font-bold">{event.name}</h2>
                      <p className="text-gray-600">{formatDate(event.event_date)}</p>
                      <p className="text-gray-500">{event.location}</p>
                      
                        <p className="mt-4 block bg-blue-500 text-white text-center py-2 rounded"><Link href={`/events/${event.id}`}>View Details</Link></p>
                      
                    </div>
                  </div>
                ))}
              </div>
            )
          })
        }
      </div>
            </div>
        </Wrapper>

    )
}