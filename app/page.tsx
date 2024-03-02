import { getInvoices } from "@/lib/_actions";
import Invoice from "./components/Invoice";

export default async function Home() {

	const invoices = await getInvoices();

	return <div>{invoices && <Invoice invoices={invoices} />}</div>;
}
