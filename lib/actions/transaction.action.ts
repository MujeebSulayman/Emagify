import { redirect } from 'next/navigation';
import { handleError } from '../utils';
import { connectToDatabase } from '../database/mongoose';
import Transaction from '../database/models/transaction.model';
import { updateCredits } from './user.actions';
import axios from 'axios'; // Import Axios for HTTP requests

export async function checkoutCredits(transaction: CheckoutTransactionParams) {
	try {
		await connectToDatabase();

		const amount = Number(transaction.amount) * 100; // Convert amount to kobo (Paystack uses kobo as the smallest currency unit)

		const transactionParams = {
	
			amount: amount,
			reference: 'your_unique_reference', // Generate a unique reference for each transaction
			metadata: {
				plan: transaction.plan,
				credits: transaction.credits,
				buyerId: transaction.buyerId,
			},
			callback_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/paystack/callback`, // Your Paystack callback URL
		};

		// Make a POST request to Paystack to initialize the transaction
		const response = await axios.post(
			'https://api.paystack.co/transaction/initialize',
			transactionParams,
			{
				headers: {
					Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY}`, // Add Paystack secret key in the Authorization header
					'Content-Type': 'application/json',
				},
			}
		);

		// Redirect to Paystack authorization URL
		redirect(response.data.data.authorization_url);
	} catch (error) {
		handleError(error);
	}
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
