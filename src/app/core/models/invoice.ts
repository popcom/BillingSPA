export interface Invoice {
    id: string | null;
    customerId: string;
    customerName: string | null;
    amount: string;
    deadLine: Date;
}
