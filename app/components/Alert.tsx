import React from 'react'

const Alert = () => {

    console.log('alert', useInvoiceStore.getState());

    return alertState == true ? (
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
					<button className="btn btn-sm mr-3">Cancel</button>
					<button className="btn btn-sm btn-primary">Accept</button>
				</div>
			</div>
		) : null;
}

export default Alert

