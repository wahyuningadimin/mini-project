'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import debounce from 'lodash/debounce';
import { Event } from '../types/events';
import HeroCarousel from './hero-carousel/page';

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    // Fetch events and categories
    const fetchData = async () => {
      const response = await axios.get('http://localhost:8000/api/events/getEvents', {
        // params: { page, category: selectedCategory, location: selectedLocation, search: searchTerm }
      });
      const { events, categories, locations, totalPages } = response.data;
      setEvents(events);
      setFilteredEvents(events);
      setCategories(categories);
      setLocations(locations);
      setTotalPages(totalPages);
    };
    fetchData();
  }, [page, selectedCategory, selectedLocation, searchTerm]);

  // Debounced search handler
  const handleSearch = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(1);
  }, 300);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
    setPage(1);
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocation(event.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
    {/* <HeroCarousel /> */}
    <div className="container mx-auto px-4">
      <header className="my-8">
        <h1 className="text-3xl font-bold mb-4 text-center">Upcoming Events</h1>
        <div className="flex flex-col lg:flex-row lg:justify-between mb-6">
          <input
            type="text"
            placeholder="Search events..."
            onChange={handleSearch}
            className="input input-bordered w-full max-w-xs mb-4 lg:mb-0 lg:mr-4"
          />
          {/* <div className="flex flex-col lg:flex-row lg:space-x-4">
            <select
              onChange={handleCategoryChange}
              value={selectedCategory}
              className="select select-bordered mb-4 lg:mb-0"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
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
          </div> */}
        </div>
      </header>

      <main>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
              <img src={event.image} alt={event.name} className="w-full h-40 object-cover rounded-t-lg" />
              <div className="mt-4">
                <h2 className="text-xl font-bold">{event.name}</h2>
                <p className="text-gray-600">{event.event_date}</p>
                <p className="text-gray-500">{event.location}</p>
                
                  <p className="mt-4 block bg-blue-500 text-white text-center py-2 rounded"><Link href={`/events/${event.id}`}>View Details</Link></p>
                
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="mt-8 flex justify-center space-x-4">
        {page > 1 && (
          <button onClick={() => handlePageChange(page - 1)} className="btn btn-primary">Previous</button>
        )}
        {page < totalPages && (
          <button onClick={() => handlePageChange(page + 1)} className="btn btn-primary">Next</button>
        )}
      </footer>
    </div>
    </>
  );
}

