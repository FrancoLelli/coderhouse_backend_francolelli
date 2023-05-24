import { ticketsModel } from "../models/ticket_models.js";

export default class TicketClassDB {
  async addCarrito(ticket) {
    return await ticketsModel.create(ticket);
  }
}