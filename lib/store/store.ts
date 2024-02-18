import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type InvoiceStore = {
	alert: boolean;
	toggleAlert: (status : boolean) => void;
	//messages: string[];
	//theme: string;
};

export const useInvoiceStore = create<InvoiceStore>()(
	devtools(

			(set) => ({
				alert: false,
				toggleAlert: (status) => set((state) => ({ alert: status })),
				//messages: [],
				//theme: "light",
			}),

			{
				name: "invoice-app", // name of the item in the storage (must be unique)
				//storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
				//skipHydration: false,
			}

	)
);
