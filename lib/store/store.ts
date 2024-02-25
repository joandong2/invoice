import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type InvoiceStore = {
	alert: boolean;
	alertState: string;
	theme: string;
	setAlertState: (action: string) => void;
	toggleAlert: (status: boolean) => void;
	setTheme: (status: string) => void;
};

export const useInvoiceStore = create<InvoiceStore>()(
	devtools(
		(set) => ({
			theme: 'light',
			alert: false,
			alertState: "",
			toggleAlert: (status) => set(() => ({ alert: status })),
			setAlertState: (action) => set(() => ({ alertState: action })),
			setTheme: (action) => set(() => ({theme : action })),
		}),
		{
			name: "invoice-app", // name of the item in the storage (must be unique)
			//storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
			//skipHydration: false,
		}
	)
);

// export const getState = useInvoiceStore.getState;
// export const useTheme = useInvoiceStore;

// export const getTheme = () => getState().theme;
// export const toggleTheme = useTheme((state) => state.setTheme)
