// 'use client'

// import { CardBlog } from "@/components/card"
// import Wrapper from "@/components/wrapper"
// import { getEvents } from "@/lib/events"
// import { useRouter, useSearchParams } from "next/navigation"
// import { useEffect, useRef, useState } from "react"
// import { useDebounce } from "use-debounce"

// export default function SearchEvent() {
//     const searchParams = useSearchParams()
//     const querySearch = searchParams.get('search')
//     const searchRef = useRef<HTMLInputElement | null>(null)
//     const [data, setData] = useState([])
//     const [search, setSearch] = useState<string>( querySearch || '')
//     const [value] = useDebounce(search, 1000)
//     const router = useRouter()
    

//     const handleChange = () => {
//         if(searchRef.current) {
//             setSearch(searchRef.current.value)
//         }
//     }

//     const getData = async () => {
//         try{
//             router.push(`?search=${value}`)
//             const { events } = await getEvents()
//             setData(events);
//         } catch(err){
//             console.log(err);
//         }
//     }

//     useEffect(() => {
//         getData()
//     }, [value])

//     return (
//         <Wrapper>
//             <div className="flex w-full justify-center">
//                 <input 
//                 onChange={handleChange}
//                 ref={searchRef}
//                 type="text" 
//                 className="border border-gray-500 h-10 w-full max-w-[500px] rounded-md"
//                 placeholder="Search Event"
//                 />
//             </div>
//             <div>
//             <div></div>
//             <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-2">
//         {
//           data.map((items: any) => {
//             return (
//               <CardBlog 
//                 key={items.id}
//                 name={items.name}
//                 slug={items.slug}
//                 image={items.image} 
//                 id={0} 
//                 event_date={items.event_date} 
//                 location={items.location} 
//                 />
//             )
//           })
//         }
//       </div>
//             </div>
//         </Wrapper>

//     )
// }


'use client'

import { CardBlog } from "@/components/card"
import Wrapper from "@/components/wrapper"
import { getEvents } from "@/lib/events"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { useDebounce } from "use-debounce"

export default function SearchEvent() {
    const searchParams = useSearchParams()
    const querySearch = searchParams.get('search')
    const searchRef = useRef<HTMLInputElement | null>(null)
    const [data, setData] = useState<any[]>([])
    const [search, setSearch] = useState<string>(querySearch || '')
    const [value] = useDebounce(search, 1000)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    
    // Update search state when the URL search parameter changes
    useEffect(() => {
        if (querySearch) {
            setSearch(querySearch)
        }
    }, [querySearch])

    // Fetch data based on search term
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            setError(null)
            try {
                router.push(`?search=${value}`)
                const { events } = await getEvents({ search: value }) // Assuming getEvents accepts query params
                setData(events)
            } catch (err) {
                setError('Failed to fetch events')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        if (value) {
            fetchData()
        } else {
            setData([])
        }
    }, [value, router])

    // Handle input change
    const handleChange = () => {
        if (searchRef.current) {
            setSearch(searchRef.current.value)
        }
    }

    return (
        <Wrapper>
            <div className="flex w-full justify-center">
                <input 
                    onChange={handleChange}
                    ref={searchRef}
                    type="text" 
                    className="border border-gray-500 h-10 w-full max-w-[500px] rounded-md"
                    placeholder="Search Event"
                    defaultValue={search} // Keeps input in sync with state
                />
            </div>
            <div>
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
                <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-2">
                    {data.map((items: any) => (
                        <CardBlog 
                            key={items.id}
                            name={items.name}
                            slug={items.slug}
                            image={items.image} 
                            id={items.id} // Ensure this is correctly assigned
                            event_date={items.event_date} 
                            location={items.location} 
                        />
                    ))}
                </div>
            </div>
        </Wrapper>
    )
}
