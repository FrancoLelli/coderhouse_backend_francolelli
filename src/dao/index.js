import ProductManagerF from "./file-managers/primer-entrega_francolelli.js";
import CartManagerF from "./file-managers/carritoManager.js";
import ProductManagerD from "./db-manager/products_manager.js";
import CartManagerD from "./db-manager/cars_manager.js";
import TicketClassDB from "./db-manager/tickets.js";
import TicketManagerF from "./file-managers/tickets.js";

const config = {
 persistenceType: "db",
};

let CartManager, ProductManager, TicketManager;

if (config.persistenceType === "db") {
 CartManager = CartManagerD;
 ProductManager = ProductManagerD;
 TicketManager = TicketClassDB;
} else if (config.persistenceType === "file") {
 CartManager = CartManagerF;
 ProductManager = ProductManagerF;
 TicketManager = TicketManagerF;
} else {
 console.log("Error");
}

export { CartManager, ProductManager };
