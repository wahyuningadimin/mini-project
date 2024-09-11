'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import debounce from 'lodash/debounce';
import { Event } from '../types/events';
import Hero from './hero/page';
import { formatDate } from './helper/formatDate';

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [locations, setLocations] = useState<string[]>([]); // Add state for locations

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/events');
        const { events, totalPages } = response.data;
        // Extract unique locations
        const uniqueLocations = Array.from(new Set(events.map(event => event.location)));
        setLocations(uniqueLocations);
        
        let filteredEvents = events;

        // Filter based on search term
        if (searchTerm) {
          filteredEvents = filteredEvents.filter(event =>
            event.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        // Filter based on selected location
        if (selectedLocation) {
          filteredEvents = filteredEvents.filter(event =>
            event.location === selectedLocation
          );
        }

        setEvents(events);
        setFilteredEvents(filteredEvents);
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
    setPage(1);
  }, 300);

  const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocation(event.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
      <Hero />
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
            {filteredEvents.map((event) => (
              <Link key={event.id} href={`/events/${event.id}`}>
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

          {/* Pagination Controls */}
          <div className="flex justify-center space-x-4 mt-8">
            {page > 1 && (
              <button onClick={() => handlePageChange(page - 1)} className="btn btn-primary">Previous</button>
            )}
            {page < totalPages && (
              <button onClick={() => handlePageChange(page + 1)} className="btn btn-primary">Next</button>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
