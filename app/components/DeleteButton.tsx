'use client'

import { createInvoice, deleteInvoice } from '@/lib/_actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { Invoice } from '@prisma/client';
import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import Alert from './Alert';
import { useInvoiceStore } from '@/lib/store/store';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { useRouter } from "next/navigation";
;

interface InvoiceCode {
	invoiceCode: string
}

const DeleteButton = ({invoice} : {invoice : Invoice}) => {

	const alert = useInvoiceStore((state) => state.alert);
	const toggleAlert = useInvoiceStore((state) => state.toggleAlert);
	const [formSubmit, formSubmitState] = useState<boolean>(false);
	const router = useRouter();

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		reset,
		trigger,
		control,
		formState: { errors },
	} = useForm<InvoiceCode>({
		defaultValues: {
			invoiceCode: invoice.invoiceCode,
		}
	});

    const processForm: SubmitHandler<InvoiceCode> = async (data) => {
			if(formSubmit) {
				const result = await deleteInvoice(data.invoiceCode);
				if (result.status === "success") {
					console.log(result);
					router.push("/");
				}
			}
		};

	console.log('alert in button 1', alert)

  	return (
			<>
				<form
					onSubmit={handleSubmit(processForm)}
					className="flex flex-1 flex-col gap-4"
				>
					<input
						type="hidden"
						className="input input-bordered w-full"
						{...register("invoiceCode")}
					/>
					<button
						className="btn text-[16px] text-white font-bold bg-[#ec5757] rounded-[25px] py-4 px-8 border-none"
						onClick={() => {
							toggleAlert(true);
						}}
					>
						Delete
					</button>

					{alert == true ? (
						<div
							role="alert"
							className="alert absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/4 w-[450px]"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								className="stroke-info shrink-0 w-6 h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								></path>
							</svg>
							<span>Are you sure?</span>
							<div>
								<button
									className="btn btn-sm mr-3"
									onClick={() => toggleAlert(false)}
								>
									Cancel
								</button>
								<button
									className="btn btn-sm btn-primary"
									onClick={() => {
										formSubmitState(true);
									}}
								>
									Accept
								</button>
							</div>
						</div>
					) : null}
				</form>
			</>
		);
}

export default DeleteButton