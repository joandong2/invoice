"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useInvoiceStore } from "../utilities/store";

const Sidebar = () => {
	const currTheme = useInvoiceStore((state) => state.theme);

	const handleOnclick = () => {
		useInvoiceStore.setState({
			theme: useInvoiceStore.getState().theme === "dark" ? "light" : "dark",
		});
	};

	return (
		<div className="w-full lg:w-[100px] sidebar text-center z-50">
			<div className="lg:h-screen flex lg:flex-col justify-between align-middle text-center">
				<span className="items-center flex justify-center px-4 py-6 bg-[#9277ff] rounded-tr-[15px]">
					<Image
						src="/assets/logo.svg"
						width="40"
						height="40"
						alt="Image Best Gear"
						className=""
					/>
				</span>
				<span className="flex lg:flex-col gap-3 justify-center items-center">
					<span className="p-4 cursor-pointer" onClick={handleOnclick}>
						<Image
							src={`${
								currTheme === "light"
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
