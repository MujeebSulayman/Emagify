"use client"

import { useEffect } from 'react';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '../ui/button';

const Checkout = ({
	plan,
	amount,
	credits,
	buyerId,
}: {
	plan: string;
	amount: number;
	credits: number;
	buyerId: string;
}) => {
	const { toast } = useToast();

	useEffect(() => {
		// Load any necessary scripts or SDKs here if required by Paystack
		// For Paystack, you might need to include their inline script in your HTML template
	}, []);

	const onCheckout = async () => {
		try {
			// Make a POST request to your server to initiate the Paystack transaction
			const response = await axios.post('/api/paystack/initialize', {
				plan,
				amount,
				credits,
				buyerId,
			});

			// Redirect to Paystack checkout page
			window.location.href = response.data.data.authorization_url;
		} catch (error) {
			console.error('Error initiating Paystack transaction:', error);
			toast({
				title: 'Error',
				description: 'Failed to initiate payment. Please try again later.',
				duration: 5000,
				className: 'error-toast',
			});
		}
	};

	return (
		<form onSubmit={onCheckout}>
			<section>
				<Button
					type='submit'
					className='w-full rounded-full bg-purple-gradient bg-cover'>
					Buy Credit
				</Button>
			</section>
		</form>
	);
};

export default Checkout;
