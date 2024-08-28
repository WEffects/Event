export interface IRegister {
    name: string[];
    email: string;
    phone: string;
    transactionId: string;
    attendence: string;
    checkInTime: Date;
    ticketType: string;
    totalTickets: number;
    totalPrice: number;
    ticketCode: string;
    registerAt: Date;
    confirm: boolean
}