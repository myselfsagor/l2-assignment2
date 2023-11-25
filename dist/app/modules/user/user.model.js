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
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
// create user schema
const userSchema = new mongoose_1.Schema({
    userId: { type: Number, required: [true, 'user id is required'] },
    username: {
        type: String,
        required: [true, 'username is required'],
        unique: true,
    },
    password: { type: String, required: [true, 'password is required'] },
    fullName: {
        firstName: {
            type: String,
            required: [true, 'first name is required'],
            maxlength: [20, 'first name max length 20'],
        },
        lastName: {
            type: String,
            required: [true, 'last name is required'],
            maxlength: [20, 'last name max length 20'],
        },
    },
    age: { type: Number, required: [true, 'age is required'] },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
    },
    isActive: { type: Boolean, required: true, default: true },
    hobbies: [String],
    address: {
        street: { type: String, required: [true, 'street is required'] },
        city: { type: String, required: [true, 'city is required'] },
        country: { type: String, required: [true, 'country is required'] },
    },
    orders: [
        {
            productName: {
                type: String,
                required: [true, 'product name is required'],
            },
            price: { type: Number, required: [true, 'price is required'] },
            quantity: { type: Number, required: [true, 'quantity is required'] },
        },
    ],
});
// hashing password field
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
// create user model
const UserModel = (0, mongoose_1.model)('User', userSchema);
exports.default = UserModel;
