'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import debounce from 'lodash/debounce';
import { Event } from '../types/events';
import Hero from './hero/page';
import { formatDate } from './helper/formatDate';
import { getEventsPaginated, getMasterLocations } from '@/lib/events';
import Pagination from '@/components/pagination';
import Image from 'next/image';
import HeroCarousel from './hero carousel/page';

export default function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [locations, setLocations] = useState<string[]>([]);

  const query = searchParams?.query || '';

  useEffect(() => {
    const fetchMasterLocations = async () => {
      const response = await getMasterLocations("");
      console.log(JSON.stringify(response));
      const data = response.result;
      const masterLocations = data.locations.map((item:any) => item.location);

      setLocations(masterLocations);
    }
    fetchMasterLocations();
  },[]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getEventsPaginated(searchTerm, page, size, "", selectedLocation);
        const data = response.result;

        setEvents(data.data);
        
        const totalPages = Math.ceil(data.totalCount/size);
        setTotalPages(totalPages);
      } catch (error) {
        console.error('Error fetching data:', error);
        setEvents([]);
        setFilteredEvents([]);
      }
    };
    fetchData();
  }, [page, searchTerm, selectedLocation]); // Add selectedLocation as a dependency

  const handleSearch = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0);
  }, 300);

  const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocation(event.target.value);
    setPage(0);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  

  return (
    <>
      <HeroCarousel />
      <div className="container mx-auto px-4">
        <header className="m-8">
          <h1 className="text-2xl font-bold mb-4 text-center">Upcoming Events</h1>
          <div className="flex flex-col lg:flex-row lg:justify-between">
            <input
              type="text"
              placeholder="Search events..."
              onChange={handleSearch}
              className="input input-bordered w-full max-w-xs mb-4 lg:mb-0 lg:mr-4"
            />
            <div className="flex flex-col lg:flex-row lg:space-x-4">
              <select
                onChange={handleLocationChange}
                value={selectedLocation}
                className="select select-bordered"
              >
                <option value="">All Locations</option>
                {locations.map((location) => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
          </div>
        </header>

        <main className='py-4 px-8'>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {events.map((event) => (
              <Link key={event.id} href={`/events/${event.id}`}>
                <div className="relative bg-white border border-gray-200 shadow-lg flex flex-col transition-transform transform hover:scale-105 p-4" style={{ width: '100%', paddingBottom: '150%' }}>
                  <div className="absolute inset-0 flex flex-col">
                    {
                      event.image.startsWith('http') ? 
                      (<img src={event.image} alt={event.name} className="w-full h-3/4 object-cover mb-1" style={{ height: '68%' }} />) 
                      : (<Image width={1280} height={1280} src={`/${event.image}`} alt={event.name} className="w-full h-3/4 object-cover mb-1" style={{ height: '68%' }} />)
                    }
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
            <Pagination currentPage={page} totalPages={totalPages} handlePageChange={handlePageChange} />
          </div>
        </main>
      </div>
    </>
  );
}
