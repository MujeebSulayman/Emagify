const componentProps = {
	email,
	amount: amountInKobo,
	metadata: {
		name: 'Customer Name', // replace with the customer's name
		phone: '08012345678', // replace with the customer's phone number
	},
	publicKey,
	text: 'Buy Credit',
	className: 'your-class-name', // replace with your class name
	callback: (response) => {
		// handle successful payment here
		// response.reference gives the reference for this transaction
	},
	onClose: () => {
		// handle the case when user closes the Paystack dialog
	},
	disabled: false, // set to true to disable the button
	embed: false, // set to true for embedded dialog
	// add other necessary props
};
