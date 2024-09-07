export interface OrderModel {
    order_date: string;
    product_ids: string[];
    product_quantities: number[];
    user_email: string;
    status: string;
    total: number;
    ship_address: string;
    id: string;
}