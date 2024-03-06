export interface Item {
	id: string
	invoiceID: string;
	itemName: string;
	itemQuantity: number;
	itemPrice: number;
}

export interface Invoice {
	id: string;
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
	expireAt: Date;
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