import User from "../models/User.js";

export const generateUserId = async () => {
    const count = await User.countDocuments();
    const next = count + 1;
    return "U" + String(next).padStart(3, "0");
};

export const createUserService = async (data) => {
    const id_user = await generateUserId();
    const exist = await User.findOne({ phone_number: data.phone_number });

    if (exist) {
        throw new Error("Số điện thoại đã tồn tại");
    }

    const newUser = new User({
        id_user,
        phone_number: data.phone_number,
        password: data.password,
        name: "Nguyễn văn A",
        date_of_birth: null,
        gender: "nam",
        avatar: "/images/User_cicrle_light.png",
    });

    return await newUser.save();
};


export const getUsersService = async () => {
    try {
        const users = await User.find().select("-password");
        return users;
    } catch {
        throw new Error("Lỗi khi lấy danh sách user");
    }
};

export const loginUserService = async (phone, password) => {
    const user = await User.findOne({ phone_number: phone });

    if (!user) return null;

    // nếu chưa hash thì so sánh trực tiếp (không khuyến khích)
    if (user.password !== password) return null;

    user.password = undefined;
    return user;
};

export const updateInfoUserService = async (user) => {
    if (!user || !user.id_user) return null;

    // check trùng số điện thoại (trừ chính nó)
    if (user.phone_number) {
        const exist = await User.findOne({
            phone_number: user.phone_number,
            id_user: { $ne: user.id_user } // khác user hiện tại
        });

        if (exist) {
            throw new Error("Số điện thoại đã tồn tại");
        }
    }
    
    const { id_user, name, phone_number, date_of_birth, gender, avatar } = user;

    const updatedUser = await User.findOneAndUpdate(
        { id_user },
        {
            name,
            phone_number,
            date_of_birth,
            gender,
            avatar
        },
        { returnDocument: "after" }
    );
    return updatedUser;
};