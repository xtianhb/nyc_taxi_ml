import axios from 'axios';

const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? `http://localhost:8000/`;

export const getPrediction = async (data: any) =>
  await axios.post(`${backendUrl}predict`, data);
