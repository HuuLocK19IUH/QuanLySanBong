import mongoose from "mongoose";
import SportField from "../models/Sportfield.js";


/**
 * Lấy danh sách sportfield
 */
export const getSportFieldsService = async () => {
    try {
        const sportfields = await SportField.find();
        return sportfields;
    } catch {
        throw new Error("Lỗi khi lấy danh sách sân");
    }
};

/**
 * Lấy danh sách keywords
 */
export const getUniqueKeywordsService = async () => {
    try {
        const keywords = await SportField.distinct("keywords");
        const types = await SportField.distinct("sportfield_type");
        const allKeywords = [...new Set([...keywords, ...types])].filter(k => k);
        return allKeywords;
    } catch {
        throw new Error("Lỗi khi lấy danh sách keywords");
    }
};

/**
 * Lấy sportfield theo id
 */
export const getSportFieldByIdService = async (id) => {
    let sportfield = null;
    const isObjectId = mongoose.Types.ObjectId.isValid(id);

    if (isObjectId) {
        sportfield = await SportField.findById(id);
    }

    if (!sportfield) {
        sportfield = await SportField.findOne(
            isObjectId ? { $or: [{ _id: id }, { sportfield_id: id }] } : { sportfield_id: id }
        );
    }

    if (!sportfield) {
        throw new Error("Không tìm thấy sân");
    }

    return sportfield;
};

/**
 * Update sportfield
 */
export const updateSportFieldService = async (id, data) => {
    let updated = null;
    const isObjectId = mongoose.Types.ObjectId.isValid(id);

    if (isObjectId) {
        try {
            updated = await SportField.findByIdAndUpdate(id, data, {
                new: true
            });
        } catch (error) {
            // ignore cast error from invalid ObjectId
        }
    }

    if (!updated) {
        updated = await SportField.findOneAndUpdate(
            isObjectId ? { $or: [{ sportfield_id: id }, { _id: id }] } : { sportfield_id: id },
            data,
            { new: true }
        );
    }

    if (!updated) {
        throw new Error("Không tìm thấy sân để cập nhật");
    }

    return updated;
};

/**
 * Xóa sportfield
 */
export const deleteSportFieldService = async (id) => {
    let deleted = null;
    const isObjectId = mongoose.Types.ObjectId.isValid(id);

    if (isObjectId) {
        try {
            deleted = await SportField.findByIdAndDelete(id);
        } catch (error) {
            // ignore cast error from invalid ObjectId
        }
    }

    if (!deleted) {
        deleted = await SportField.findOneAndDelete(
            isObjectId ? { $or: [{ sportfield_id: id }, { _id: id }] } : { sportfield_id: id }
        );
    }

    if (!deleted) {
        throw new Error("Không tìm thấy sân để xóa");
    }

    return deleted;
};


export const getSportFieldBySF_IdService = async (id) => {
    const sportfield = await SportField.findOne({
        sportfield_id: id
    });

    return sportfield;
};