export interface DetailsOrder{
   details:Details[];
   orderId:number;
}

export interface Details{
    idProduct:number;
    productName: string;
    quantity:number;
}