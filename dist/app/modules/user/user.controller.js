"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControllers = void 0;
const user_service_1 = require("./user.service");
const user_zod_validation_1 = __importDefault(require("./user.zod.validation"));
// 1. Create a new user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validateUser = user_zod_validation_1.default.parse(req.body);
        const newUser = yield user_service_1.userServices.createUserService(validateUser);
        res.status(200).json({
            success: true,
            message: 'User created successfully!',
            data: {
                userId: newUser.userId,
                username: newUser.username,
                fullName: newUser.fullName,
                age: newUser.age,
                email: newUser.email,
                isActive: newUser.isActive,
                hobbies: newUser.hobbies,
                address: newUser.address,
            },
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err || 'User not created',
            error: {
                code: 404,
                description: 'User not created',
            },
        });
    }
});
// 2. Retrieve a list of all users
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield user_service_1.userServices.getAllUsersService();
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully!',
            data,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Users not fetched',
            error: {
                code: 404,
                description: 'Users not fetched',
            },
        });
    }
});
// 3. Retrieve a specific user by ID
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const user = yield user_service_1.userServices.getSingleUserService(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
        res.status(200).json({
            success: true,
            message: 'User fetched successfully!',
            data: {
                userId: user.userId,
                username: user.username,
                fullName: user.fullName,
                age: user.age,
                email: user.email,
                isActive: user.isActive,
                hobbies: user.hobbies,
                address: user.address,
            },
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
// 4. Update user information
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const updatedData = req.body;
        const updatedUser = yield user_service_1.userServices.updateUserService(userId, updatedData);
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
        res.status(200).json({
            success: true,
            message: 'User updated successfully!!',
            data: {
                userId: updatedUser.userId,
                username: updatedUser.username,
                fullName: updatedUser.fullName,
                age: updatedUser.age,
                email: updatedUser.email,
                isActive: updatedUser.isActive,
                hobbies: updatedUser.hobbies,
                address: updatedUser.address,
            },
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
// 5. Delete a user
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const result = yield user_service_1.userServices.deleteUserService(userId);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
        res.status(200).json({
            success: true,
            message: 'User deleted successfully!',
            data: null,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
// 6. Add New Product in Order
const addNewOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const orderData = req.body;
        const user = yield user_service_1.userServices.addNewOrderService(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
        if (!user.orders) {
            user.orders = [];
        }
        user.orders.push(orderData);
        yield user.save();
        res.status(200).json({
            success: true,
            message: 'Order created successfully!',
            data: null,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
// 7. Retrieve all orders for a specific user
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const user = yield user_service_1.userServices.getAllOrdersService(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
        res.status(200).json({
            success: true,
            message: 'Order fetched successfully!',
            data: user.orders,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
// 7. Calculate Total Price of Orders for a Specific User
const getOrdersTotalPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { userId } = req.params;
        const user = yield user_service_1.userServices.getAllOrdersService(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
        const totalPrice = (_a = user.orders) === null || _a === void 0 ? void 0 : _a.reduce((acc, cur) => {
            const price = cur.price * cur.quantity;
            return acc + price;
        }, 0);
        res.status(200).json({
            success: true,
            message: 'Total price calculated successfully!',
            totalPrice,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
exports.userControllers = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    addNewOrder,
    getAllOrders,
    getOrdersTotalPrice,
};
