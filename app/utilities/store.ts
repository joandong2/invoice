import { create } from "zustand";
import { InvoiceStore } from "./types";
import { devtools, persist } from "zustand/middleware";

// async function main() {
// 	const hana = await prisma.client.create({
// 		data: {
// 			name: "John Oblenda",
// 			streetAddress: "76 Poplar St.",
// 			city: "Bridgewater",
// 			postcode: "08807",
// 			country: "United States",
// 		},
// 	});
// }

// main()
// 	.catch(console.error)
// 	.finally(() => prisma.$disconnect());

export const useInvoiceStore = create<InvoiceStore>()(
	devtools(
		persist(
			(set) => ({
				status: '',
				messages: [],
				theme: "light",
				invoices: [],
				fetchInvoices: async (url) => {
					const response = await fetch(url);
					set({ invoices: await response.json() });
				},
				addInvoice: () => set((state) => ({})),
				removeInvoice: () => set((state) => ({})),
				currItemsList: [],
			}),

			{
				name: "invoice-app", // name of the item in the storage (must be unique)
				//storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
				//skipHydration: false,
			}
		)
	)
);
