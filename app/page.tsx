import { getInvoices } from "@/lib/_actions";
import Invoice from "./components/Invoice";
import Sidebar from "./components/Sidebar";

export default async function Home() {

	const invoices = await getInvoices();

	return (
		<div>
			<Invoice invoices={invoices} />
		</div>
	);
}
