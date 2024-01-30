import { League_Spartan, Roboto } from "next/font/google";

export const roboto: any = Roboto({
	weight: ["400", "700"],
	subsets: ["latin"],
	display: "swap",
	variable: "--roboto-font",
});

export const leagueSpartan: any = League_Spartan({
	subsets: ["latin"],
	display: "swap",
	variable: "--leagueSpartan-font",
});
