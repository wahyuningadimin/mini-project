'use client'
import { useRouter } from 'next/navigation'; // For client-side navigation
import Wrapper from '@/components/wrapper';
import PaymentForm from './_components/form';
import { useEffect, useState } from 'react';
import { getEventTiers } from '@/lib/events';

export default function PaymentPage() {
    const router = useRouter();
    const [eventId, setEventId] = useState<string | null>(null);
    const [tiers, setTiers] = useState<{ tier_name: string; price: number }[]>([]);
    const [selectedTier, setSelectedTier] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);

    useEffect(() => {
        const fetchTiers = async () => {
            if (eventId) {
                const { tiers } = await getEventTiers(eventId);
                setTiers(tiers);
    
                // Default to the first tier
                if (tiers.length > 0) {
                    setSelectedTier(tiers[0].tier_name);
                }
            }
        };
    
    
    const url = 'http://localhost:3000/events/1'; // Replace with your URL or fetch it dynamically
    const query = new URLSearchParams(new URL(url).search);
    const id = query.get('id');
    setEventId(id);
    if (id) {
        fetchTiers();
    }
}, [eventId]);

    // Calculate total price based on selected tier and quantity
    const selectedTierPrice = tiers.find(tier => tier.tier_name === selectedTier)?.price || 0;
    const finalPrice = selectedTierPrice * quantity;

    useEffect(() => {
        const fetchTiers = async () => {
            if (eventId) {
                try {
                    const { tiers } = await getEventTiers(eventId);
                    setTiers(tiers);

                    // Default to the first tier
                    if (tiers.length > 0) {
                        setSelectedTier(tiers[0].tier_name);
                    }
                } catch (error) {
                    console.error('Error fetching tiers:', error);
                }
            }
        };

        fetchTiers();
    }, [eventId]); // This effect runs when `eventId` changes

    return (
        <Wrapper>
            <div className="p-4">
                <h1 className="text-2xl font-bold">Payment Page</h1>
                <p>You are buying ticket for: {eventId}</p>

                {/* Ticket Information */}
                <div className="my-4">
                    <h2 className="text-xl font-semibold">Ticket Information</h2>
                    <div className="mt-2">
                        <label htmlFor="ticketCategory" className="block text-sm font-medium mb-1">Ticket Category</label>
                        <select
                            id="ticketCategory"
                            value={selectedTier}
                            onChange={(e) => setSelectedTier(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            {tiers.map(tier => (
                                <option key={tier.tier_name} value={tier.tier_name}>{tier.tier_name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mt-2">
                        <label htmlFor="quantity" className="block text-sm font-medium mb-1">Quantity</label>
                        <input
                            type="number"
                            id="quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            min="1"
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mt-2">
                        <p className="text-lg font-medium">Total Price: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'IDR' }).format(finalPrice)}</p>
                    </div>
                </div>

                {/* Payment Form */}
                <PaymentForm />
            </div>
        </Wrapper>
    );
}
