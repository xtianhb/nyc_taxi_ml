import axios from 'axios';

export const getPrediction = async (data: any) =>
  await axios.post(`http://localhost:8000/predict`, data);
