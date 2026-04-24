import {
    getSportFieldsService,
    getSportFieldByIdService,
    updateSportFieldService,
    deleteSportFieldService
} from "../services/SportfieldService.js";


/**
 * Lấy danh sách sportfield
 */
export const getSportFields = async (req, res) => {
    try {
        const data = await getSportFieldsService();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/**
 * Lấy sportfield theo id
 */
export const getSportFieldById = async (req, res) => {
    try {
        const data = await getSportFieldByIdService(req.params.id);
        res.json(data);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

/**
 * Cập nhật sportfield
 */
export const updateSportField = async (req, res) => {
    try {
        const data = await updateSportFieldService(req.params.id, req.body);
        res.json(data);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

/**
 * Xóa sportfield
 */
export const deleteSportField = async (req, res) => {
    try {
        const data = await deleteSportFieldService(req.params.id);
        res.json({ message: "Xóa thành công", data });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};