'use client'

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { formatDate } from '../helper/formatDate';
import { getUserEvents } from "@/lib/users";
import Wrapper from "@/components/wrapper";
import { useRouter } from "next/navigation";

export default function CustomerPage() {
    const authContext = useAuth();
    const [events, setEvents] = useState<any>();
    const router = useRouter();

    useEffect(() => {
        const fetchEvents = async () => {
            const events = (await getUserEvents()).events;

            setEvents(events);
        }

        fetchEvents();
    }, [])

    const handleLeaveReview = (event_id: number) => {
        router.push(`/events/review?id=${event_id}`)
    }

    return (
        <>
            <div className="container flex flex-col min-h-screen p-4 mx-auto mt-8">
                <h2 className="font-bold mb-4">Upcoming Events</h2>
                <div className="overflow-x-auto">
                    {events && events.upcoming.length > 0 ? (
                        <table className="min-w-full bg-white border border-gray-200 table-fixed">
                            <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <tr>
                                    <th className="py-3 px-6 text-left w-60">Event Name</th>
                                    <th className="py-3 px-6 text-left w-60">Event Date</th>
                                    <th className="py-3 px-6 text-left w-60">Location</th>
                                    <th className="py-3 px-6 text-left w-60">Venue</th>
                                    <th className="py-3 px-6 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                                {events && events.upcoming.map((data: any) =>
                                (
                                    <tr key={data.id} className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-3 px-6 text-left w-60">{data.name}</td>
                                        <td className="py-3 px-6 text-left w-60">{formatDate(data.event_date)}</td>
                                        <td className="py-3 px-6 text-left w-60">{data.location}</td>
                                        <td className="py-3 px-6 text-left w-60">{data.venue}</td>
                                        <td className="py-3 px-6 text-left cursor-pointer font-semibold text-blue-400"></td>
                                    </tr>
                                )
                                )}
                            </tbody>
                        </table>
                    ) : (
                        <div className="flex justify-center items-center h-64 bg-white border border-gray-200 rounded-md">
                            <p className="text-gray-500 text-lg">No events available.</p>
                        </div>
                    )}
                </div>
                <h2 className="font-bold mb-4 mt-12">Past Events</h2>
                <div className="overflow-x-auto">
                    {events && events.past.length > 0 ? (
                        <table className="min-w-full bg-white border border-gray-200 table-fixed">
                            <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <tr>
                                    <th className="py-3 px-6 text-left w-60">Event Name</th>
                                    <th className="py-3 px-6 text-left w-60">Event Date</th>
                                    <th className="py-3 px-6 text-left w-60">Location</th>
                                    <th className="py-3 px-6 text-left w-60">Venue</th>
                                    <th className="py-3 px-6 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                                {events && events.past.map((data: any) =>
                                (
                                    <tr key={data.id} className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-3 px-6 text-left w-60">{data.name}</td>
                                        <td className="py-3 px-6 text-left w-60">{formatDate(data.event_date)}</td>
                                        <td className="py-3 px-6 text-left w-60">{data.location}</td>
                                        <td className="py-3 px-6 text-left w-60">{data.venue}</td>
                                        {
                                            data.rating ? null : (
                                                <td className="py-3 px-6 text-left cursor-pointer font-semibold text-blue-400" onClick={() => handleLeaveReview(data.event_id)}>Leave Review</td>
                                            )
                                        }
                                        
                                    </tr>
                                )
                                )}
                            </tbody>
                        </table>
                    ) : (
                        <div className="flex justify-center items-center h-64 bg-white border border-gray-200 rounded-md">
                            <p className="text-gray-500 text-lg">No events available.</p>
                        </div>
                    )}
                </div>

            </div >
        </>
    )

}