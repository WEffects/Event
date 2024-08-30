export interface IRegister {
    name: string[];
    email: string;
    phone: string;
    attendence: string;
    checkInTime: Date;
    ticketType: string;
    totalTickets: number;
    totalPrice: number;
    ticketCode: string;
    ticketImageUrl: string;
    serialNumber: string;
    registerAt: Date;
    confirm: boolean
}