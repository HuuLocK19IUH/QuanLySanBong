import { getServicesService } from "../services/ServiceService.js";
/**
 * Controller: Lấy danh sách service
 */
export const getServicesController = async (req, res) => {
    try {
        const services = await getServicesService();

        return res.status(200).json(services);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Lỗi server"
        });
    }
};
