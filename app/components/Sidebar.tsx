"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useInvoiceStore } from "@/lib/store/store";

const Sidebar = () => {
	const theme = useInvoiceStore((state) => state.theme)
	const setTheme = useInvoiceStore((state) => state.setTheme);

	const handleOnclick = () => {
		setTheme(theme == 'light' ? 'dark' : 'light')
	};

	 useEffect(() => {
		if (theme === 'dark') {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [theme]);

	return (
		<div className="w-full h-[100%] lg:w-[100px] sidebar text-center z-50">
			<div className="lg:h-[100%] flex lg:flex-col justify-between align-middle text-center">
				<span className="items-center flex justify-center px-4 py-6 bg-[#9277ff] rounded-tr-[15px]">
					<Link href={`/`}>
						<Image
							src="/assets/logo.svg"
							width="40"
							height="40"
							alt="Image Best Gear"
							className=""
						/>
					</Link>
				</span>
				<span className="flex lg:flex-col gap-3 justify-center items-center">
					<span className="p-4 cursor-pointer" onClick={handleOnclick}>
						<Image
							src={`${
								theme === "light"
									? "/assets/icon-moon.svg"
									: "/assets/icon-sun.svg"
							}`}
							width="20"
							height="20"
							alt="Image Best Gear"
							className="rounded"
						/>
					</span>
					<span className="lg:block hidden w-full h-[1px] bg-[#494e6e]"></span>
					<span className="lg:hidden block w-[1px] h-full bg-[#494e6e]"></span>
					<span className="p-4">
						<Image
							src="/assets/image-avatar.jpg"
							width="40"
							height="40"
							alt="Image Best Gear"
							className="rounded-[50%]"
						/>
					</span>
				</span>
			</div>
		</div>
	);
};

export default Sidebar;
