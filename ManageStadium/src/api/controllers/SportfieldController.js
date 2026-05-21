import Sportfield from "../models/Sportfield.js";
import {
    getSportFieldsService,
    getSportFieldByIdService,
    updateSportFieldService,
    deleteSportFieldService,
    getSportFieldBySF_IdService,
    getUniqueKeywordsService,
    createSportFieldService
} from "../services/SportfieldService.js";


/**
 * Lấy danh sách sportfield
 */
export const getSportFields = async (req, res) => {
    try {
        const filter = {};
        if (req.query.isActive !== undefined) {
            filter.isActive = req.query.isActive === 'true';
        }
        const data = await getSportFieldsService(filter);
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/**
 * Lấy danh sách keywords
 */
export const getUniqueKeywords = async (req, res) => {
    try {
        const data = await getUniqueKeywordsService();
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

/**
 * Tạo sportfield mới
 */
export const createSportField = async (req, res) => {
    try {
        const data = await createSportFieldService(req.body);
        res.status(201).json({ message: "Tạo thành công", data });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


export const getSportFieldBySF_Id = async (req, res) => {
    try {
        const sportfield = await getSportFieldBySF_IdService(req.params.id);

        if (!sportfield) {
            return res.status(404).json({ message: "Không tìm thấy sân" });
        }

        return res.status(200).json(sportfield);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};