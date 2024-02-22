export interface Item {
	invoiceID: string;
	itemName: string;
	itemQuantity: number;
	itemPrice: number;
}

export interface Invoice {
	invoiceItems?: Item[];
	invoiceCode: string;
	description: string;
	status: string;
	amount: number;
	paymentTerms: string;
	invoiceDate: Date;
	dueDate: Date;
	createdAt: Date;
	udpatedAt: Date;
	billFromStreetAddress: string;
	billFromCity: string;
	billFromPostcode: string;
	billFromCountry: string;
	clientEmail: string;
	clientName: string;
	clientStreetAddress: string;
	clientCity: string;
	clientPostCode: string;
	clientCountry: string;
	items?: Item[];
}