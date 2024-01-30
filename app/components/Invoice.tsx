import React from "react";
import Image from "next/image";
import { FaCircle, FaPlus } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import SidebarContent from "./SidebarContent";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

const Invoice = () => {
	return (
		<>
			<div className="h-screen w-[95%] lg:w-3/4 xl:w-1/2 mx-auto pt-[120px] lg:pt-[80px]">
				<div className="flex items-center justify-between align-middle mb-[60px]">
					<div>
						<span>
							<h1 className="font-bold">Invoices</h1>
							<p>There are total invoices</p>
						</span>
					</div>
					<div className="flex items-center gap-12">
						<span className="text-[15px] font-bold ">
							<span className="dropdown">
								<span tabIndex={0} role="button" className=" m-1">
									Filter by status
								</span>
								<ul
									tabIndex={0}
									className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
								>
									<li>
										<a>Draft</a>
									</li>
									<li>
										<a>Pending</a>
									</li>
								</ul>
							</span>
						</span>
						<span className="drawer z-0 w-auto">
							<Drawer>
								<DrawerTrigger asChild>
									<Button
										variant="outline"
										className="btn drawer-button text-[15px] text-white font-bold bg-[#7c5dfa] rounded-[25px] px-3 border-none"
									>
										<span className="bg-white rounded-[50%] p-2 mr-3">
											<FaPlus className=" text-[#7c5dfa] text-[13px]" />
										</span>
										New Invoice
									</Button>
								</DrawerTrigger>
								<DrawerContent>
									<SidebarContent />
								</DrawerContent>
							</Drawer>
							<span className="drawer-side">
								<label
									htmlFor="my-drawer"
									aria-label="close sidebar"
									className="drawer-overlay"
								></label>
								<ul className="menu  w-full md:w-1/2 min-h-full bg-base-200 text-base-content lg:pl-[10em] lg:pr-[60px] pt-[40px] pl-4 pr-4">
									{/* Sidebar content here */}
									<SidebarContent />
								</ul>
							</span>
						</span>
					</div>
				</div>
				<div>
					<span className="invoices">
						<span className="hidden md:flex w-full justify-evenly items-center gap-10">
							<span className="font-bold text-[22px]">
								<span className="text-[#888eb0]">#</span>RT3080
							</span>
							<span className="date text-[#888eb0]  font-medium">
								Due 19 Aug 2021
							</span>
							<span className="font-medium text-[#888eb0] mr-[40px]">
								Jensen Huang
							</span>
							<span className="font-bold text-[22px]">$1,800.90</span>
							<span className="py-3 px-8 text-[16px] font-bold rounded-md pending flex items-center justify-items-center gap-3 bg-opacity-[.06]">
								<FaCircle className="text-[9px]" /> <span>Pending</span>
							</span>
							<span>
								<IoIosArrowForward className="text-[22px] text-[#7c5dfa] font-bold" />
							</span>
						</span>
						{/* mobile view */}
						<span className="mobile md:hidden grid grid-cols-2 gap-4 w-full px-8 py-4">
							<span className="flex flex-col gap-6">
								<span className="font-bold text-[24px]">
									<span className="text-[#888eb0]">#</span>RT3080
								</span>
								<span className="date text-[#888eb0] mb-[-10px]  font-medium">
									Due 19 Aug 2021
								</span>
								<span className="font-bold text-[24px]">$1,800.90</span>
							</span>
							<span className="flex flex-col items-end justify-between">
								<span className="font-medium text-[#888eb0]">Jensen Huang</span>
								<span className="py-3 px-8 text-[16px] font-bold rounded-md pending flex items-center gap-3">
									<FaCircle className="text-[9px]" /> <span>Pending</span>
								</span>
							</span>
						</span>
					</span>
					<span className="invoices">
						<span className="hidden md:flex w-full justify-evenly items-center gap-10">
							<span className="font-bold text-[22px]">
								<span className="text-[#888eb0]">#</span>RT3080
							</span>
							<span className="date text-[#888eb0]  font-medium">
								Due 19 Aug 2021
							</span>
							<span className="font-medium text-[#888eb0] mr-[40px]">
								Jensen Huang
							</span>
							<span className="font-bold text-[22px]">$1,800.90</span>
							<span className="py-3 px-8 text-[16px] font-bold rounded-md draft flex items-center justify-items-center gap-3 bg-opacity-[.06]">
								<FaCircle className="text-[9px]" /> <span>Draft</span>
							</span>
							<span>
								<IoIosArrowForward className="text-[22px] text-[#7c5dfa] font-bold" />
							</span>
						</span>
						{/* mobile view */}
						<span className="mobile md:hidden grid grid-cols-2 gap-4 w-full px-8 py-4">
							<span className="flex flex-col gap-6">
								<span className="font-bold text-[24px]">
									<span className="text-[#888eb0]">#</span>RT3080
								</span>
								<span className="date text-[#888eb0] mb-[-10px]  font-medium">
									Due 19 Aug 2021
								</span>
								<span className="font-bold text-[24px]">$1,800.90</span>
							</span>
							<span className="flex flex-col items-end justify-between">
								<span className="font-medium text-[#888eb0]">Jensen Huang</span>
								<span className="py-3 px-8 text-[16px] font-bold rounded-md pending flex items-center gap-3">
									<FaCircle className="text-[9px]" /> <span>Draft</span>
								</span>
							</span>
						</span>
					</span>
					<span className="invoices">
						<span className="hidden md:flex w-full justify-evenly items-center gap-10">
							<span className="font-bold text-[22px]">
								<span className="text-[#888eb0]">#</span>RT3080
							</span>
							<span className="date text-[#888eb0]  font-medium">
								Due 19 Aug 2021
							</span>
							<span className="font-medium text-[#888eb0] mr-[40px]">
								Jensen Huang
							</span>
							<span className="font-bold text-[22px]">$1,800.90</span>
							<span className="py-3 px-8 text-[16px] font-bold rounded-md paid flex items-center justify-items-center gap-3 bg-opacity-[.06]">
								<FaCircle className="text-[9px]" /> <span>Paid</span>
							</span>
							<span>
								<IoIosArrowForward className="text-[22px] text-[#7c5dfa] font-bold" />
							</span>
						</span>
						{/* mobile view */}
						<span className="mobile md:hidden grid grid-cols-2 gap-4 w-full px-8 py-4">
							<span className="flex flex-col gap-6">
								<span className="font-bold text-[24px]">
									<span className="text-[#888eb0]">#</span>RT3080
								</span>
								<span className="date text-[#888eb0] mb-[-10px]  font-medium">
									Due 19 Aug 2021
								</span>
								<span className="font-bold text-[24px]">$1,800.90</span>
							</span>
							<span className="flex flex-col items-end justify-between">
								<span className="font-medium text-[#888eb0]">Jensen Huang</span>
								<span className="py-3 px-8 text-[16px] font-bold rounded-md pending flex items-center gap-3">
									<FaCircle className="text-[9px]" /> <span>Paid</span>
								</span>
							</span>
						</span>
					</span>
				</div>
			</div>
		</>
	);
};

export default Invoice;
