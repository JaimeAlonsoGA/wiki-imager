import dotenv from "dotenv";

dotenv.config();

export const config = {
  wikipedia: {
    es: process.env.WIKIPEDIA_API_ES,
    en: process.env.WIKIPEDIA_API_EN,
  },
};
