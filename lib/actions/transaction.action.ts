'use server';

import { redirect } from 'next/navigation';
import { Paystack } from 'paystack';
import { handleError } from '../utils';
import { connectToDatabase } from '../database/mongoose';
import Transaction from '../database/models/transaction.model';
import { updateCredits } from './user.actions';

export async function checkoutCredits(transaction: CheckoutTransactionParams) {
	const paystack = new Paystack(process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY!);

	const amount = Number(transaction.amount) * 100;

	const session = await paystack.transaction.initialize({
		amount,
		email: 'customer@example.com', // replace with the customer's email
		metadata: {
			plan: transaction.plan,
			credits: transaction.credits,
			buyerId: transaction.buyerId,
		},
		callback_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
	});

	redirect(session.data.authorization_url);
}

export async function createTransaction(transaction: CreateTransactionParams) {
	try {
		await connectToDatabase();

		// Create a new transaction with a buyerId
		const newTransaction = await Transaction.create({
			...transaction,
			buyer: transaction.buyerId,
		});

		await updateCredits(transaction.buyerId, transaction.credits);

		return JSON.parse(JSON.stringify(newTransaction));
	} catch (error) {
		handleError(error);
	}
}
