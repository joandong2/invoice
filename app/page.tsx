"use client";
import { useInvoiceStore } from "./utilities/store";
import Invoice from "./components/Invoice";
import Sidebar from "./components/Sidebar";


export default function Home() {
	const fetchMessages = useInvoiceStore((state) => state.messages);
	const currTheme = useInvoiceStore((state) => state.theme);

	// useEffect(() => {
	// 	fetchInvoices('"http://localhost:3000/api/clients");
	// }, []);

	//  useEffect(() => {
	// 	toast('hello world', {
	// 		position: "bottom-right",
	// 		className: "foo-bar",
	// 	});
	//  }, [fetchMessages]);

	return (
		<main className={`${currTheme}`}>
			<div>
				<Sidebar />
				<Invoice />
			</div>
		</main>
	);
}
