import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { leagueSpartan, roboto } from "../lib/font";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });
//.getState() will only retrieve the initial state and will not reactively update when the state changes

export const metadata: Metadata = {
	title: "Invoice App",
	description: "Frontend Mentor Project",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				className={`${leagueSpartan.variable} ${roboto.variable} light h-[100%]`}
			>
				<Toaster position="top-right" />
				<Sidebar />
				<div className="h-full w-[95%] min-h-screen lg:w-3/4 xl:w-1/2 mx-auto pt-[40px] lg:pt-[60px] lg:pb-[60px]">
					<main>{children}</main>
				</div>
			</body>
		</html>
	);
}
