'use client'

import { createInvoice, deleteInvoice } from '@/lib/_actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { Invoice } from '@prisma/client';
import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import Alert from './Alert';
import { useAppContext } from '../context';

interface InvoiceCode {
	invoiceCode: string
}

const DeleteButton = ({invoice} : {invoice : Invoice}) => {
	const { hello } = useAppContext();

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		reset,
		control,
		formState: { errors },
	} = useForm<InvoiceCode>({
		defaultValues: {
			invoiceCode: invoice.invoiceCode,
		}
	});

    const processForm: SubmitHandler<InvoiceCode> = async (data) => {
			const result = await deleteInvoice(data.invoiceCode);
			//console.log(result);
			if (result.status === 'success') {
				console.log(hello);
			}
			//console.log(data);
			//reset();
		};

  	return (
		<>
			<form
				onSubmit={handleSubmit(processForm)}
				className="flex flex-1 flex-col gap-4"
			>
				<input
					type="hidden"
					className="input input-bordered w-full"
					{...register("invoiceCode")} />
				<button
					className="btn text-[16px] text-white font-bold bg-[#ec5757] rounded-[25px] py-4 px-8 border-none"
					//onClick={() => setAlertState(true)}
				>
					Delete
				</button>
			</form>
		</>
	);
}

export default DeleteButton