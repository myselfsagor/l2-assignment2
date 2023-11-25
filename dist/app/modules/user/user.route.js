"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.post('/', user_controller_1.userControllers.createUser);
router.get('/', user_controller_1.userControllers.getAllUsers);
router.get('/:userId', user_controller_1.userControllers.getSingleUser);
router.put('/:userId', user_controller_1.userControllers.updateUser);
router.delete('/:userId', user_controller_1.userControllers.deleteUser);
router.put('/:userId/orders', user_controller_1.userControllers.addNewOrder);
router.get('/:userId/orders', user_controller_1.userControllers.getAllOrders);
router.get('/:userId/orders/total-price', user_controller_1.userControllers.getOrdersTotalPrice);
exports.userRoutes = router;
