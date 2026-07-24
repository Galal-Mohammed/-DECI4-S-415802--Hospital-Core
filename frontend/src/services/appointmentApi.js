import axios from "axios";

const appointmentApi = axios.create({
  baseURL: "http://localhost:5001/api",
});

export default appointmentApi;