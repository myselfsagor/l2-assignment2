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
exports.userServices = void 0;
const user_model_1 = __importDefault(require("./user.model"));
// create user service
const createUserService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.create(user);
    return result;
});
// get all user service
const getAllUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.default.find({}, { username: 1, fullName: 1, age: 1, email: 1, address: 1 });
    return users;
});
// get single user service
const getSingleUserService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(userId);
    return user;
});
// update user service
const updateUserService = (userId, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findByIdAndUpdate(userId, updatedData, {
        new: true,
    });
    return result;
});
// delete user service
const deleteUserService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findByIdAndDelete(userId);
    return result;
});
// add new order  service
const addNewOrderService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findById(userId);
    return result;
});
// get single user service
const getAllOrdersService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(userId);
    return user;
});
// Calculate Total Price of Orders for a Specific User
const getOrdersTotalPriceService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(userId);
    return user;
});
// export all user services
exports.userServices = {
    createUserService,
    getAllUsersService,
    getSingleUserService,
    updateUserService,
    deleteUserService,
    addNewOrderService,
    getAllOrdersService,
    getOrdersTotalPriceService,
};
