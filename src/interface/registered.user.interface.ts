export interface IRegister {
    name:string[];
    email:string;
    phone:string;
    ticketType:string,
    totalTickets:number,
    totalPrice:number,
    ticketCode:string,
    registerAt:Date,
    confirm:boolean
}