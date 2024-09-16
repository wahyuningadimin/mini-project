'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Wrapper from '@/components/wrapper';
import PaymentForm from './_components/form';
import { useEffect, useState } from 'react';
import { getEventbyId, getEventTiers } from '@/lib/events';
import Switch from "react-switch";
import { useAuth } from '@/context/AuthContext';
import { getToken } from '@/lib/server';
import { getActivePoints, getUserDiscount } from '@/lib/users';

export default function PaymentPage() {
    const router = useRouter();
    const authContext = useAuth();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [eventId, setEventId] = useState<string | null>(null);
    const [tiers, setTiers] = useState<{ tier_name: string; price: number; id: number }[]>([]);
    const [selectedTier, setSelectedTier] = useState<number>(0);
    const [eventName, setEventName] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);
    const [promoCode, setPromoCode] = useState<string>('');
    const [discount, setDiscount] = useState<number>(0); // Assuming discount is a percentage
    const [finalPrice, setFinalPrice] = useState<number>(0);
    const [usePoints, setUsePoints] = useState<boolean>(false); // Manage the switch state
    const [useDiscount, setUseDiscount] = useState<boolean>(false);
    const [availablePoints, setAvailablePoints] = useState<number>(100); // Example value, replace with real data
    const [availableDiscount, setAvailableDiscount] = useState<boolean>(false);

    useEffect(() => {
        const token = getToken();

        if (!token) {
            return router.push(`/login?redirectUrl=${pathname}?id=${searchParams.get('id')}`);
        }

        const user = authContext.user;

        if (user?.userId) {
            const role = user.role;

            if (role != "CUSTOMER") {
                return router.back();
            }

            const fetchUserPoint = async () => {
                const points = await getActivePoints();

                setAvailablePoints(points.points);
            }
            const fetchUserDiscount = async () => {
                const userDiscount = await getUserDiscount();

                setAvailableDiscount(userDiscount.discountActive);
            }
            fetchUserPoint();
            fetchUserDiscount();
        } 
    }, [authContext])

    useEffect(() => {
        const id = searchParams.get('id');
        setEventId(id);
    }, [searchParams]);

    useEffect(() => {
        const fetchData = async () => {
            if (eventId) {
                try {
                    const eventData = await getEventbyId(eventId);
                    setEventName(eventData.event.name);
                    const { tiers } = await getEventTiers(eventId);
                    setTiers(tiers);

                    if (tiers.length > 0) {
                        setSelectedTier(tiers[0].id);
                    }
                } catch (error) {
                    console.error('Error fetching event or tiers:', error);
                }
            }
        };

        fetchData();
    }, [eventId]);

    useEffect(() => {
        // Calculate the total price whenever tier or quantity changes
        const selectedTierPrice = tiers.find(tier => tier.id === selectedTier)?.price || 0;
        const basePrice = selectedTierPrice * quantity;
        const discountAmount = basePrice * (discount / 100);
        const discountedPrice = basePrice - discountAmount;

        if (usePoints) {
            setFinalPrice(discountedPrice - availablePoints);
        } else {
            setFinalPrice(discountedPrice);
        }
    }, [selectedTier, quantity, discount, tiers, usePoints]);

    const handlePromoCodeApply = () => {
        // Simple example: if promo code is 'DISCOUNT10', apply 10% discount
        if (promoCode === 'DISCOUNT10') {
            setDiscount(10);
        } else {
            setDiscount(0);
            alert('Invalid promo code');
        }
    };

    const handleUseDiscount = (checked: boolean) => {
        setUseDiscount(checked);
        if (checked) {
            setDiscount(10);
        } else {
            setDiscount(0);
        }
    }

    return (
        <Wrapper>
            <div className="flex flex-col items-center">
                <div className="w-full max-w-lg">
                    <h1 className="text-2xl font-bold mb-4">Payment Page</h1>
                    <p className="mb-4">You are buying a ticket for: <strong>{eventName}</strong></p>

                    {/* Ticket Information */}
                    <div className="my-4">
                        <h2 className="text-xl font-semibold mb-2">Ticket Information</h2>
                        <div className="mt-2">
                            <label htmlFor="ticketCategory" className="block text-sm font-medium mb-1">Ticket Category</label>
                            <select
                                id="ticketCategory"
                                value={selectedTier}
                                onChange={(e) => setSelectedTier(Number(e.target.value))}
                                className="w-full p-2 border border-gray-300 rounded"
                            >
                                {tiers.map(tier => (
                                    <option key={tier.id} value={tier.id}>{tier.tier_name.toUpperCase()}</option>
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

                    {/* Promo Code Input */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Redeem Discount</label>
                        <div className="flex justify-between">
                            <span className="mr-8">Available Discount: {availableDiscount ? <span className='text-blue-600'>10% off</span> : "-"}</span> {/* Added margin-right */}
                            <Switch
                                onChange={handleUseDiscount}
                                checked={useDiscount}
                                offColor="#888"
                                onColor="#0d6efd"
                                className=''
                                disabled={!availableDiscount}
                            />
                        </div>
                    </div>

                    {/* Points Switch */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Redeem Points</label>
                        <div className="flex justify-between">
                            <span className="mr-8">Available Points: {availablePoints}</span> {/* Added margin-right */}
                            <Switch
                                onChange={(checked) => setUsePoints(checked)}
                                checked={usePoints}
                                offColor="#888"
                                onColor="#0d6efd"
                                className=''
                                disabled={availablePoints <= 0}
                            />
                        </div>
                    </div>

                    {/* Payment Form */}
                    <PaymentForm totalPrice={finalPrice} eventId={eventId} tierId={selectedTier} quantity={quantity} useDiscount={useDiscount} usePoints={usePoints} />
                </div>
            </div>
        </Wrapper>
    );
}
