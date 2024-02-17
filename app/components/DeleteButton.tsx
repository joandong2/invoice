import { createInvoice } from '@/lib/_actions';
import { FormDataSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';

const DeleteButton = () => {

    const [itemsList, setItemsList] = useState<any>([]);
		const [status, setStatus] = useState<string>("");

		const {
			register,
			handleSubmit,
			watch,
			setValue,
			reset,
			control,
			formState: { errors },
		} = useForm<FormValues>({
			resolver: zodResolver(FormDataSchema),
		});

    const processForm: SubmitHandler<FormValues> = async (data) => {
			const result = await createInvoice(data);
			console.log("result", result);
			reset();
		};

  return (
		<>
			<form
				onSubmit={handleSubmit(processForm)}
				className="flex flex-1 flex-col gap-4"
			>
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