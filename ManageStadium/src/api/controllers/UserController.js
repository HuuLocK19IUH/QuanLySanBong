import { createUserService, getUsersService, loginUserService, updateInfoUserService } from "../services/UserService.js";

export const createUser = async (req, res) => {
    try {
        const user = await createUserService(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await getUsersService();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const loginUser = async (req, res) => {
    const { phone_number, password } = req.body;

    const user = await loginUserService(phone_number, password);

    if (!user) {
        return res.status(401).json({ message: "Sai thông tin đăng nhập" });
    }

    res.json(user);
};

export const updateUser = async (req, res) => {
    try {
        const user = req.body;

        const updatedUser = await updateInfoUserService(user);

        if (!updatedUser) {
            return res.status(400).json({ message: "Không cập nhật được user" });
        }

        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
