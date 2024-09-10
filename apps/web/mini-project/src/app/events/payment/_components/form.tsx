// components/PaymentForm.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PaymentForm({ totalPrice }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('creditCard');
    const [accountNumber, setAccountNumber] = useState('');
    const [routingNumber, setRoutingNumber] = useState('');
    const [ovoNumber, setOvoNumber] = useState('');
    const [gopayNumber, setGopayNumber] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!name || !email || !paymentMethod) {
            setError('Please fill in all required fields');
            return;
        }

        setError('');
        setLoading(true);

        try {

        } catch (error) {
            console.error('An error occurred:', error);
            setError('Payment processing failed');

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
                    <option value="mobileBanking">Mobile Banking</option>
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
            {paymentMethod === 'mobileBanking' && (
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
                        <label htmlFor="routingNumber" className="block text-sm font-medium mb-1">Routing Number</label>
                        <input
                            type="text"
                            id="routingNumber"
                            value={routingNumber}
                            onChange={(e) => setRoutingNumber(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
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
                disabled={loading}
            >
                {loading ? 'Processing...' : 'Submit Payment'}
            </button>
        </form>
    );
}}
