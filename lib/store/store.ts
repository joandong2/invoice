import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type InvoiceStore = {
	alert: boolean;
	alertState: string;
	setAlertState: (action: string) => void;
	toggleAlert: (status: boolean) => void;
	//messages: string[];
	//theme: string;
};

export const useInvoiceStore = create<InvoiceStore>()(
	devtools(
		(set) => ({
			alert: false,
			alertState: "",
			toggleAlert: (status) => set(() => ({ alert: status })),
			setAlertState: (action) => set(() => ({ alertState: action })),
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
