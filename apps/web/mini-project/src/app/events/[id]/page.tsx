import { formatDate } from "@/app/helper/formatDate";
import Wrapper from "@/components/wrapper";
import { getEvents } from "@/lib/events";
import Link from "next/link";

export const revalidate = 3600;

export const generateStaticParams = async () => {
    const { events } = await getEvents();
    return events.map((event: { id: number }) => ({
        params: {
            id: event.id.toString(),
        },
    }));
};

export async function generateMetadata({ params }: { params: { id: string }}) {
    const { events } = await getEvents();
    const event = events.find((event: { id: number }) => event.id.toString() === params.id);
    
    if (!event) {
        return {
            title: "Event not found",
        };
    }

    return {
        title: event.name,
        category: event.category,
        type: event.event_type,
        date: event.event_date,
        venue: event.venue,
        location: event.location,
        description: event.event_description,
        openGraph: {
            images: [event.image],
        },
    };
}

export default async function EventDetail({ params }: { params: { id: string }}) {
    const { events } = await getEvents(); // Fetch all events
    const event = events.find((event: { id: number }) => event.id.toString() === params.id);

    if (!event) {
        return <div>Event not found</div>;
    }

    return (
        <Wrapper>
            <div className="flex">
                {/* Sidebar with back button */}
                <div className="flex-1 sticky top-[50px] h-full max-md:hidden">
                    <Link href="/" className="flex items-center gap-2 text-blue-500 hover:underline">
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
                        </svg>
                        Back
                    </Link>
                </div>

                <div className="flex flex-col sm:flex-row py-4 px-10 my-10 max-lg:p-2 max-lg:pr-0">
  {/* Event Image */}
  <div className="flex-shrink-0 w-full sm:w-1/3 mb-8 sm:mb-0">
    <img
      className="h-100 sm:h-80 w-full object-cover rounded-lg shadow-lg"
      src={event.image}
      alt={event.name}
    />
  </div>
  
  {/* Event Details */}
  <div className="flex-1 pl-4 flex flex-col">
    {/* Category and Event Type */}
    <div className="flex flex-col mb-2">
      <p className="font-bold text-lg">{event.category}</p>
      <p className="text-lg sm:text-base">{event.event_type}</p>
    </div>
    
    {/* Event Name */}
    <h5 className="mb-2 text-3xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
      {event.name}
    </h5>
    
    {/* Event Date and Venue Details */}
    <div className="flex flex-col gap-2 mb-4">
      <p className="text-md sm:text-base">{formatDate(event.event_date)}</p>
      <p className="text-md sm:text-base">
        Venue: {event.venue} <br />
        Location: {event.location}
      </p>
    </div>
    
    {/* Event Description */}
    <div className="text-lg sm:text-base mb-4 flex-grow">
      {event.event_description}
    </div>
    
    {/* Buy Ticket Button */}
    <div className="flex justify-end mt-4">
      <button
        type="submit"
        className="w-full sm:w-auto h-10 px-6 py-2.5 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-gray-300 rounded-lg transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Buy Ticket
      </button>
    </div>
  </div>
</div>

                {/* <div className="flex flex-col sm:flex-row py-4 px-10 my-20 max-lg:p-2 max-lg:pr-0"> */}
            {/* Event Image */}
            {/* <div className="flex-shrink-0 w-full sm:w-1/3 mb-8 sm:mb-0">
                <img
                className="h-100 sm:h-80 w-full object-cover rounded-lg shadow-lg"
                src={event.image}
                alt={event.name}
                />
            </div> */}
            
            {/* Event Details */}
            {/* <div className="flex-1 pl-4"> */}
                {/* Category and Event Type */}
                {/* <div className="flex flex-col mb-2">
                <p className="font-bold text-lg">{event.category}</p>
                <p className="text-lg sm:text-base">{event.event_type}</p>
            </div> */}
                
            {/* Event Name */}
            {/* <h5 className="mb-2 text-3xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                {event.name}
            </h5> */}
                
            {/* Event Date and Venue Details */}
            {/* <div className="flex flex-col gap-2 mb-4">
                <p className="text-md sm:text-base">{formatDate(event.event_date)}</p>
                <p className="text-md sm:text-base">
                    Venue: {event.venue} <br />
                    Location: {event.location}
                </p>
            </div> */}
                
            {/* Event Description */}
            {/* <div className="text-lg sm:text-base mt-2">
                {event.event_description}
            </div>
            
            </div> */}

            {/* Buy Ticket Button */}
            {/* <div className="flex justify-end mt-4">
            <button
                type="submit"
                className="w-full sm:w-auto h-10 px-6 py-2.5 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-gray-300 rounded-lg transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Buy Ticket
            </button>
            </div>
            </div> */}
        </div>
            
        </Wrapper>
    );
}
