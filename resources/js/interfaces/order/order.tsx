export interface Order {
    id: number;
    order_id: string;
    order_date: string;
    customer_mobile: number;
    email?: number;
    order_amount: number;
    status?: string;
}
