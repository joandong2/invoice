export interface Invoice {
	id: number;
	invoiceCode: string;
	description: string;
	status: string;
	amount: number;
	paymentDue: Date;
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
}

export interface InvoiceStore {
	status: string;
	messages: string[],
	theme: string;
	invoices: Invoice[];
	fetchInvoices: (url: string) => void;
	addInvoice: () => void;
	removeInvoice: () => void;
}
