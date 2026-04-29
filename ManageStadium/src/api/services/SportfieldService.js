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
 * Lấy sportfield theo id
 */
export const getSportFieldByIdService = async (id) => {
    const sportfield = await SportField.findById(id);

    if (!sportfield) {
        throw new Error("Không tìm thấy sân");
    }

    return sportfield;
};

/**
 * Update sportfield
 */
export const updateSportFieldService = async (id, data) => {
    const updated = await SportField.findByIdAndUpdate(id, data, {
        new: true
    });

    if (!updated) {
        throw new Error("Không tìm thấy sân để cập nhật");
    }

    return updated;
};

/**
 * Xóa sportfield
 */
export const deleteSportFieldService = async (id) => {
    const deleted = await SportField.findByIdAndDelete(id);

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