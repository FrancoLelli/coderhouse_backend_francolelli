import { ticketsModel } from "../models/ticket_models.js";

class TicketManagerF {
 constructor() {}

 async createTicket(ticketData) {
  try {
   const ticketToPush = await ticketModel.create(ticketData);
   console.log("ticket creado");
   return ticketToPush;
  } catch (error) {
   return error;
  }
 }
}

export default TicketManagerF;
