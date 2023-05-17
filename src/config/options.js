import dotenv from "dotenv";
dotenv.config();

export const options = {
  fileSystem: {
    usersFileName: "users.json",
    productsFileName: "products.json",
  },
  mongoDB: {
    url: process.env.MONGO_URL,
  },
  server: {
    port: process.env.PORT,
    secretSession: process.env.SECRET_SESSION,
  },
  gmail: {
    adminEmail: process.env.ADMIN_EMAIL,
    adminPass: process.env.ADMIN_PASS,
  },
  twilio: {
    twilioId: process.env.TWILIO_ID,
    twilioToken: process.env.TWILIO_TOKEN,
    twilioPhone: process.env.TWILIO_PHONE
  }
};
