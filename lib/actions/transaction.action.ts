'use client'

import axios from 'axios';
import { handleError } from '../utils';
import { connectToDatabase } from '../database/mongoose';
import Transaction from '../database/models/transaction.model';
import { updateCredits } from './user.actions';
import { redirect } from 'next/navigation';

export async function checkoutCredits(transaction: CheckoutTransactionParams) {
	const amount = Number(transaction.amount) * 100;

	const response = await axios.post(
		'https://api.paystack.co/transaction/initialize',
		{
			amount: amount,
			metadata: {
				plan: transaction.plan,
				credits: transaction.credits,
				buyerId: transaction.buyerId,
			},
		},
		{
			headers: {
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY!}`,
				'Content-Type': 'application/json',
			},
		}
	);

	redirect('/');
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
