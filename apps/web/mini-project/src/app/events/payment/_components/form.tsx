'use client'; // Ensure this is a client component

import { useState } from 'react';

export default function PaymentForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('creditCard');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !cardNumber || !expiryDate || !cvv) {
            setError('Please fill in all fields');
            return;
        }

        setError('');
        // Simulate payment processing
        try {
            console.log('Processing payment...');
            // Implement actual payment processing logic here
        } catch (error) {
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
            {/* Add additional fields for PayPal or Bank Transfer if needed */}
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
                type="submit"
                className="w-full bg-gray-800 text-white p-2 rounded"
            >
                Submit Payment
            </button>
        </form>
    );
}
