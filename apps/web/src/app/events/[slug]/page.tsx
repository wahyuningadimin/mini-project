// 'use client'

// import { formatDate } from "@/app/helper/formatDate";
// import Wrapper from "@/components/wrapper";
// import { useAuth } from "@/context/AuthContext";
// import { getEventbyId, getEvents, getEventTiers } from "@/lib/events";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";


// export default function EventDetail({ params }: { params: { id: string } }) {
//     const authContext = useAuth();
//     const [event, setEvent] = useState<any>();
//     const [tiers, setTiers] = useState<any>();
//     const [role, setRole] = useState<string>('');

//     useEffect(() => {
//         const fetchEvent = async () => {
//             const event = await getEventbyId(params.id);

//             if (event.ok) {
//                 setEvent(event.event);
//             }
//         }

//         const fetchTiers = async () => {
//             const tiers = await getEventTiers(params.id);

//             if (tiers.ok) {
//                 setTiers(tiers.tiers);
//             }
//         }

//         setRole(authContext.user?.role || '');

//         fetchEvent();
//         fetchTiers();
//     }, []);

//     if (!event) {
//         return <div>Event not found</div>;
//     }

//     if (!tiers) {
//         return <div>Tier not found</div>
//     }

//     return (
//         <Wrapper>
//             <div className="flex">
//                 {/* Sidebar with back button */}
//                 <div className="flex-1 sticky top-[50px] h-full max-md:hidden">
//                     <Link href="/" className="flex items-center gap-2 text-blue-500 hover:underline">
//                         <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
//                             <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
//                         </svg>
//                         Back
//                     </Link>
//                 </div>

//                 <div className="flex flex-col sm:flex-row py-4 px-10 my-10 max-lg:p-2 max-lg:pr-0">

//                     {/* Event Image */}
//                     <div className="flex-shrink-0 w-full sm:w-1/3 mb-8 sm:mb-0">
//                         {
//                             event.image.startsWith('http') ?
//                                 (<img src={event.image} alt={event.name} className="h-100 sm:h-80 w-full object-cover rounded-lg shadow-l" style={{ height: '68%' }} />)
//                                 : (<Image width={1280} height={1280} src={`/${event.image}`} alt={event.name} className="h-100 sm:h-80 w-full object-cover rounded-lg shadow-l" style={{ height: '68%' }} />)
//                         }
//                     </div>

//                     {/* Event Details */}
//                     <div className="flex-1 pl-4 flex flex-col">
//                         {/* Category and Event Type */}
//                         <div className="flex flex-col mb-">
//                             <p className="font-bold text-lg uppercase">{event.category}</p>
//                             <p className="text-lg sm:text-base uppercase">{event.event_type}</p>
//                         </div>

//                         {/* Event Name */}
//                         <h5 className="mb-2 text-3xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
//                             {event.name}
//                         </h5>

//                         {/* Event Date and Venue Details */}
//                         <div className="flex flex-col gap-2 mb-4">
//                             <p className="text-md sm:text-base">{formatDate(event.event_date)}</p>
//                             <p className="text-md sm:text-base">
//                                 Venue: {event.venue} <br />
//                                 Location: {event.location}
//                             </p>
//                         </div>

//                         {/* Event Description */}
//                         <div className="text-lg sm:text-base mb-5 flex-grow">
//                             {event.event_description}
//                         </div>


//                         {/* Tier Prices */}
//                         <h5 className="mb-4 mt-5 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
//                             Pricelist
//                         </h5>
//                         <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md mb-8">
//                             {/* Header Row */}

//                             <div className="flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-700 font-bold border-b border-gray-300 dark:border-gray-700">
//                                 <p className="text-md text-gray-900 dark:text-gray-100">Category</p>
//                                 <p className="text-md text-gray-900 dark:text-gray-100">Price</p>
//                                 <p className="text-md text-gray-900 dark:text-gray-100">Available Seats</p>
//                             </div>

//                             {/* Data Rows */}
//                             {tiers.map((tier: any, index: any) => (
//                                 <div
//                                     key={index}
//                                     className={`flex justify-between items-center p-4 ${index % 2 === 0 ? 'bg-white dark:bg-gray-700' : 'bg-gray-50 dark:bg-gray-600'} border-b border-gray-300 dark:border-gray-700 last:border-b-0`}
//                                 >
//                                     <p className="uppercase text-md font-bold text-gray-900 dark:text-gray-100">{tier.tier_name}</p>
//                                     <p className="uppercase text-md text-gray-900 dark:text-gray-100">
//                                         {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'IDR' }).format(tier.price)}
//                                     </p>
//                                     <p className="text-md text-gray-500 dark:text-gray-400">{tier.remaining_capacity}</p>
//                                 </div>
//                             ))}
//                         </div>


//                         {/* Buy Ticket Button */}
//                         {(role && role == 'CUSTOMER') || !role ? (
//                             <div className="flex justify-end mt-4">
//                                 <button
//                                     type="submit"
//                                     className="w-full sm:w-auto h-10 px-6 py-2.5 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-gray-300 rounded-lg transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
//                                 ><Link href={`/events/payment?id=${event.id}`}>Buy Ticket</Link>

//                                 </button>
//                             </div>
//                         ) : null}

//                     </div>
//                 </div>
//             </div>
//         </Wrapper>
//     );
// }

'use client'

import { formatDate } from "@/app/helper/formatDate";
import Wrapper from "@/components/wrapper";
import { useAuth } from "@/context/AuthContext";
import { getEventBySlug, getEvents, getEventTiers } from "@/lib/events";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function EventDetail({ params }: { params: { slug: string } }) {
    const authContext = useAuth();
    const [event, setEvent] = useState<any>();
    const [tiers, setTiers] = useState<any>();
    const [role, setRole] = useState<string>('');

    useEffect(() => {
        const fetchTiers = async (event: any) => {
            const tiers = await getEventTiers(event.id);
            console.log('Tiers response:', tiers);
            if (tiers.ok) {
                setTiers(tiers.tiers);
            }
        }

        const fetchEvent = async () => {
            const event = await getEventBySlug(params.slug);

            if (event.ok) {
                setEvent(event.events);
                fetchTiers(event.events);
            }
        }

        setRole(authContext.user?.role || '');

        fetchEvent();
    }, []);

    if (!event) {
        return <div>Event not found</div>;
    }

    if (!tiers) {
        return <div>Tier not found</div>
    }

    return (
        <Wrapper>
            <div className="flex">
                {/* Sidebar with back button */}
                <div className="flex-1 sticky top-[50px] h-full max-md:hidden">
                    <Link href="/" className="flex items-center gap-2 text-blue-500 hover:underline">
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                        </svg>
                        Back
                    </Link>
                </div>

                <div className="flex flex-col sm:flex-row py-4 px-10 my-10 max-lg:p-2 max-lg:pr-0">

                    {/* Event Image */}
                    <div className="flex-shrink-0 w-full sm:w-1/3 mb-8 sm:mb-0">
                        {
                            event.image.startsWith('http') ?
                                (<img src={event.image} alt={event.name} className="h-100 sm:h-80 w-full object-cover rounded-lg shadow-l" style={{ height: '68%' }} />)
                                : (<Image width={1280} height={1280} src={`/${event.image}`} alt={event.name} className="h-100 sm:h-80 w-full object-cover rounded-lg shadow-l" style={{ height: '68%' }} />)
                        }
                    </div>

                    {/* Event Details */}
                    <div className="flex-1 pl-4 flex flex-col">
                        {/* Category and Event Type */}
                        <div className="flex flex-col mb-">
                            <p className="font-bold text-lg uppercase">{event.category}</p>
                            <p className="text-lg sm:text-base uppercase">{event.event_type}</p>
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
                        <div className="text-lg sm:text-base mb-5 flex-grow">
                            {event.event_description}
                        </div>


                        {/* Tier Prices */}
                        <h5 className="mb-4 mt-5 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Pricelist
                        </h5>
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md mb-8">
                            {/* Header Row */}

                            <div className="flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-700 font-bold border-b border-gray-300 dark:border-gray-700">
                                <p className="text-md text-gray-900 dark:text-gray-100">Category</p>
                                <p className="text-md text-gray-900 dark:text-gray-100">Price</p>
                                <p className="text-md text-gray-900 dark:text-gray-100">Available Seats</p>
                            </div>

                            {/* Data Rows */}
                            {tiers.map((tier: any, index: any) => (
                                <div
                                    key={index}
                                    className={`flex justify-between items-center p-4 ${index % 2 === 0 ? 'bg-white dark:bg-gray-700' : 'bg-gray-50 dark:bg-gray-600'} border-b border-gray-300 dark:border-gray-700 last:border-b-0`}
                                >
                                    <p className="uppercase text-md font-bold text-gray-900 dark:text-gray-100">{tier.tier_name}</p>
                                    <p className="uppercase text-md text-gray-900 dark:text-gray-100">
                                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'IDR' }).format(tier.price)}
                                    </p>
                                    <p className="text-md text-gray-500 dark:text-gray-400">{tier.remaining_capacity}</p>
                                </div>
                            ))}
                        </div>


                        {/* Buy Ticket Button */}
                        {(role && role == 'CUSTOMER') || !role ? (
                            <div className="flex justify-end mt-4">
                                <button
                                    type="submit"
                                    className="w-full sm:w-auto h-10 px-6 py-2.5 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-gray-300 rounded-lg transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                                ><Link href={`/events/payment?id=${event.id}`}>Buy Ticket</Link>

                                </button>
                            </div>
                        ) : null}

                    </div>
                </div>
            </div>

        </Wrapper>
    );
}
function getEventbySlug(slug: string) {
    throw new Error("Function not implemented.");
}

