export type Product = {
    UPC: string,
    name: string,
    availability: { 
        stock: number 
    },
    price: {
        currency: string,
        current: { 
            value: number 
        }
    },
    variants: any[]
}