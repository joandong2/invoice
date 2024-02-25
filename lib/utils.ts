'use client'

import { useInvoiceStore } from "./store/store"

export const themeState = () => {
    const theme = useInvoiceStore(state => state.theme)
    return theme;
}