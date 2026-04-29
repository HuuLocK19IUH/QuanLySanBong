import { getServicesService } from "../services/ServiceService.js";

export const getServices = async (req, res) => {
  try {
    const services = await getServicesService();
    return res.status(200).json(services);
  } catch (error) {
    console.error("Error getServices:", error);
    return res.status(500).json({ message: "Lỗi khi lấy dịch vụ" });
  }
};
