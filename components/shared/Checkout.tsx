'use client'

import { useEffect } from 'react';

import { useToast } from '@/components/ui/use-toast';
import { checkoutCredits } from '@/lib/actions/transaction.action';
import { Button } from '../ui/button';

const Checkout = ({
	plan,
	amount,
	credits,
	buyerId
}: {
	plan: string;
	amount: number;
	credits: number;
	buyerId: string;

}) => {
	const { toast } = useToast();

	useEffect(() => {
		// Check to see if this is a redirect back from Checkout
		const query = new URLSearchParams(window.location.search);
		if (query.get('trxref')) {
			toast({
				title: 'Order placed!',
				description: 'You will receive an email confirmation',
				duration: 5000,
				className: 'success-toast',
			});
		}
	}, []);

	const onCheckout = async () => {
		const transaction = {
			plan,
			amount,
			credits,
			buyerId,
		
		};

		await checkoutCredits(transaction);
	};

	return (
		<form
			action={onCheckout}
			method='POST'>
			<section>
				<Button
					type='submit'
					role='link'
					className='w-full rounded-md  px-4 py-6 bg-cover'>
					Buy Credit
				</Button>
			</section>
		</form>
	);
};

export default Checkout;
