const isProduction = import.meta.env.PROD;

export const BASE_URL = isProduction ? "https://l9-learning-api-vulebaolong.vercel.app/api/v1" : "http://localhost:3001/api/v1";
