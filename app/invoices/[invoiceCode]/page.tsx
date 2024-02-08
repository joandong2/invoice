import React from 'react'

const Page = ({ params }: { params: { invoiceCode: string } }) => {
	// const res = useShopStore
	// 	.getState()
	// 	.products.filter((res) => res.slug === params.slug);

    return <div>{params.invoiceCode}</div>;
};

export default Page
