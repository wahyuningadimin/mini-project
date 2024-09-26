'use client'

import { CardBlog } from "@/components/card"
import { getEvents, getEventsPaginated } from "@/lib/events"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { useDebounce } from "use-debounce"
import { formatDate } from "../helper/formatDate"
import { debounce } from "lodash"
import Wrapper from "@/components/wrapper"
import Pagination from "@/components/pagination"

export default function SearchEvent() {
    const searchParams = useSearchParams()
    const querySearch = searchParams.get('search')
    const searchRef = useRef<HTMLInputElement | null>(null)
    const [events, setEvents] = useState<any[]>([]);
    const [page, setPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [search, setSearch] = useState<string>(querySearch || '')
    const [size, setSize] = useState<number>(10);
    // const [value] = useDebounce(search, 1000)
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
                const response = await getEventsPaginated(search, page, size, "", "");
                const data = response.result;

                setEvents(data.data);
                
                const totalPages = Math.ceil(data.totalCount/size);
                setTotalPages(totalPages);
            } catch (err) {
                setError('Failed to fetch events')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        if (search) {
            fetchData()
        } else {
            setEvents([])
            setTotalPages(0);
        }
    }, [search, page])

    // Handle input change
    const handleSearch = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
            setPage(0);
    }, 300);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    return (
        <Wrapper>
            <>
                <div className="flex w-full justify-center">
                    <input
                    type="text"
                    placeholder="Search events..."
                    onChange={handleSearch}
                    className="input input-bordered w-full max-w-xs mb-4 lg:mb-0 lg:mr-4"
                    />
                </div>
                <main className='py-12 px-8'>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {events.map((event) => (
                            <Link key={event.id} href={`/events/${event.slug}`}>
                                <div className="relative bg-white border border-gray-200 shadow-lg flex flex-col transition-transform transform hover:scale-105 p-4" style={{ width: '100%', paddingBottom: '150%' }}>
                                <div className="absolute inset-0 flex flex-col">
                                    <img src={event.image} alt={event.name} className="w-full h-3/4 object-cover mb-1" style={{ height: '68%' }} />
                                    <div className="flex flex-col flex-grow px-4 pt-2" style={{ height: '10%' }}>
                                    <h2 className="text-lg font-semibold text-gray-900 mb-1">{event.name}</h2>
                                    <p className="text-gray-600 text-sm mb-1">{formatDate(event.event_date)}</p>
                                    <p className="text-gray-500 text-sm mb-4">{event.location}</p>
                                    </div>
                                </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="flex justify-center space-x-4 mt-8">
                        {
                            totalPages > 0 ?
                            (<Pagination currentPage={page} totalPages={totalPages} handlePageChange={handlePageChange} />) : null
                        }
                    </div>
                </main>

            </>
        </Wrapper>
    )
}
