export interface IRegister {
    name: string[];
    email: string;
    phone: string;
    attendence: string;
    checkInTime: Date;
    ticketType: string;
    referralCode: string;
    totalTickets: number;
    totalPrice: number;
    ticketCode: string;
    ticketImageUrl: string;
    serialNumber: string;
    registerAt: Date;
    confirm: boolean;
    entered: boolean;
}