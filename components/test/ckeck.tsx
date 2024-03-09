'use client';

import { useEffect } from 'react';
import PaystackButton from 'react-paystack';

import { useToast } from '@/components/ui/use-toast';
import { checkoutCredits } from '@/lib/actions/transaction.action';
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

	const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!; // replace with your own public key
	const email = 'customer@example.com'; // replace with the customer's email
	const amountInKobo = amount * 100; // Paystack deals with amounts in kobo

	const componentProps = {
		email,
		amount: amountInKobo,
		metadata: {
			name: 'Customer Name', // replace with the customer's name
			phone: '08012345678', // replace with the customer's phone number
		},
		publicKey,
		text: 'Buy Credit',
		onSuccess: () => {
			toast({
				title: 'Order placed!',
				description: 'You will receive an email confirmation',
				duration: 5000,
				className: 'success-toast',
			});
		},
		onClose: () => {
			toast({
				title: 'Order canceled!',
				description: "Continue to shop around and checkout when you're ready",
				duration: 5000,
				className: 'error-toast',
			});
		},
	};

	return (
		<form>
			<section>
				<PaystackButton {...componentProps} />
			</section>
		</form>
	);
};

export default Checkout;
