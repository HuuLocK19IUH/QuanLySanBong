import Service from "../models/Service.js";


/**
 * Lấy danh sách service
 */
export const getServicesService = async () => {
    try {
        const services = await Service.find();
        return services;
    } catch {
        throw new Error("Lỗi khi lấy danh sách dịch vụ");
    }
};