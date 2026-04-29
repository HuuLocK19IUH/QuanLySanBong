import Service from "../models/Service.js";

export const getServicesService = async () => {
  return await Service.find();
};