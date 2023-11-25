import { TUser } from './user.interface';
import UserModel from './user.model';

// create user service

const createUserService = async (user: TUser) => {
  const result = await UserModel.create(user);
  return result;
};

// get all user service

const getAllUsersService = async () => {
  const users = await UserModel.find(
    {},
    { username: 1, fullName: 1, age: 1, email: 1, address: 1 },
  );
  return users;
};

// get single user service

const getSingleUserService = async (userId: string) => {
  const user = await UserModel.findById(userId);
  return user;
};

// update user service

const updateUserService = async (userId: string, updatedData: TUser) => {
  const result = await UserModel.findByIdAndUpdate(userId, updatedData, {
    new: true,
  });
  return result;
};

// delete user service
const deleteUserService = async (userId: string) => {
  const result = await UserModel.findByIdAndDelete(userId);
  return result;
};

// add new order  service
const addNewOrderService = async (userId: string) => {
  const result = await UserModel.findById(userId);
  return result;
};

// get single user service

const getAllOrdersService = async (userId: string) => {
  const user = await UserModel.findById(userId);
  return user;
};

// Calculate Total Price of Orders for a Specific User

const getOrdersTotalPriceService = async (userId: string) => {
  const user = await UserModel.findById(userId);
  return user;
};

// export all user services
export const userServices = {
  createUserService,
  getAllUsersService,
  getSingleUserService,
  updateUserService,
  deleteUserService,
  addNewOrderService,
  getAllOrdersService,
  getOrdersTotalPriceService,
};
