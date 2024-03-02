import { createTransaction } from '@/lib/actions/transaction.action';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	const body = await request.json();

	// Assuming Paystack sends a unique event type for transaction completion
	const eventType = body.eventType;

	// CREATE
	if (eventType === 'paystack.transaction.completed') {
		// Change to the correct Paystack event type
		const eventData = body.data; // Assuming Paystack sends transaction data in the "data" field

		const transaction = {
			// Adjust these fields based on the structure of Paystack transaction data
			stripeId: eventData.id, // Change to stripeId
			amount: eventData.amount / 100, // Convert to dollars if necessary
			plan: eventData.metadata.plan || '',
			credits: Number(eventData.metadata.credits) || 0,
			buyerId: eventData.metadata.buyerId || '',
			createdAt: new Date(),
		};

		const newTransaction = await createTransaction(transaction);

		return NextResponse.json({ message: 'OK', transaction: newTransaction });
	}

	return new Response('', { status: 200 });
}
