'use client'
import React, { useEffect, useState } from 'react';
import { ReviewFormCreate } from './_components/form';
import { useSearchParams } from 'next/navigation';
import Wrapper from '@/components/wrapper';
import { getEventbyId } from '@/lib/events';

const HomePage: React.FC = () => {
  const searchParams = useSearchParams();
  const [eventId, setEventId] = useState<string>('');
  const [event, setEvent] = useState<any>();

  useEffect(() => {
    const id = searchParams.get('id') || '';

    if (id) {
      setEventId(id);

      const fetchEvent = async () => {
        const event = await getEventbyId(id);
        setEvent(event.event);
      }

      fetchEvent();
    }

  }, [])


  return (
    <div className="container flex flex-col min-h-screen p-4 mx-auto mt-2">
      <div className='my-[20px]'>
        <p className='mb-6'>Event Name : <span className='font-semibold'>{event?.name}</span></p>
        <ReviewFormCreate eventId={Number(eventId)} />
      </div>
    </div>
  );
};

export default HomePage;
