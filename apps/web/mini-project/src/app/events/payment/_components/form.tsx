'use client'; // Ensure this is a client component

import { useState } from 'react';

export default function PaymentForm({ totalPrice, eventId, tierId, quantity }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [selectedBank, setSelectedBank] = useState('BCA');
    const [ovoNumber, setOvoNumber] = useState('');
    const [gopayNumber, setGopayNumber] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('creditCard');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!name || !email || (paymentMethod === 'creditCard' && (!cardNumber || !expiryDate || !cvv)) ||
            (paymentMethod === 'bankTransfer' && !accountNumber) ||
            (paymentMethod === 'ovo' && !ovoNumber) ||
            (paymentMethod === 'gopay' && !gopayNumber)) {
            setError('Please fill in all required fields');
            return;
        }

        setError('');

        // Prepare payment data based on selected payment method
        const paymentData = {
            userId: 1, // You should get the actual user ID from your context or state
            eventId: Number(eventId), // You should get the actual event ID from your context or state
            promoCode: 0, // Optional: If you have a promo code
            pointsUsed: 0, // Optional: If you have a points system
            paymentMethods: 'OVO',
            tickets: [
                {
                    tierId: tierId,
                    quantity: quantity
                }
            ]
        };


        // Submit payment data
        try {
            const response = await fetch('http://localhost:8000/api/events/eventCheckout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentData),
            });

            const result = await response.json();
            if (result.status === 'success') {
                // Handle success (e.g., redirect to a success page)
                console.log('Payment successful');
            } else {
                setError(result.msg || 'Payment processing failed');
            }
        } catch (error) {
            console.error('Payment processing error:', error);
            setError('Payment processing failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="paymentMethod" className="block text-sm font-medium mb-1">Payment Method</label>
                <select
                    id="paymentMethod"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                >
                    <option value="creditCard">Credit Card</option>
                    <option value="bankTransfer">Bank Transfer</option>
                    <option value="ovo">OVO</option>
                    <option value="gopay">GoPay</option>
                </select>
            </div>
            {paymentMethod === 'creditCard' && (
                <>
                    <div className="mb-4">
                        <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">Card Number</label>
                        <input
                            type="text"
                            id="cardNumber"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="flex gap-4 mb-4">
                        <div className="flex-1">
                            <label htmlFor="expiryDate" className="block text-sm font-medium mb-1">Expiry Date</label>
                            <input
                                type="text"
                                id="expiryDate"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="cvv" className="block text-sm font-medium mb-1">CVV</label>
                            <input
                                type="text"
                                id="cvv"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                    </div>
                </>
            )}
            {paymentMethod === 'bankTransfer' && (
                <>
                    <div className="mb-4">
                        <label htmlFor="accountNumber" className="block text-sm font-medium mb-1">Account Number</label>
                        <input
                            type="text"
                            id="accountNumber"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="selectedBank" className="block text-sm font-medium mb-1">Select Bank</label>
                        <select
                            id="selectedBank"
                            value={selectedBank}
                            onChange={(e) => setSelectedBank(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="BCA">BCA</option>
                            <option value="Mandiri">Mandiri</option>
                            <option value="BRI">BRI</option>
                        </select>
                    </div>
                </>
            )}
            {paymentMethod === 'ovo' && (
                <div className="mb-4">
                    <label htmlFor="ovoNumber" className="block text-sm font-medium mb-1">OVO Number</label>
                    <input
                        type="text"
                        id="ovoNumber"
                        value={ovoNumber}
                        onChange={(e) => setOvoNumber(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
            )}
            {paymentMethod === 'gopay' && (
                <div className="mb-4">
                    <label htmlFor="gopayNumber" className="block text-sm font-medium mb-1">GoPay Number</label>
                    <input
                        type="text"
                        id="gopayNumber"
                        value={gopayNumber}
                        onChange={(e) => setGopayNumber(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
            )}
            <div className="mb-4">
                <p className="text-lg font-medium">Total Price: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'IDR' }).format(totalPrice)}</p>
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
                type="submit"
                className="w-full bg-gray-800 text-white p-2 rounded mb-8"
            >
                Submit Payment
            </button>
        </form>
    );
}
