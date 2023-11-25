import { Request, Response } from 'express';
import { userServices } from './user.service';
import userValidationSchema from './user.zod.validation';

// 1. Create a new user

const createUser = async (req: Request, res: Response) => {
  try {
    const validateUser = userValidationSchema.parse(req.body);

    const newUser = await userServices.createUserService(validateUser);

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
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err || 'User not created',
      error: {
        code: 404,
        description: 'User not created',
      },
    });
  }
};

// 2. Retrieve a list of all users

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const data = await userServices.getAllUsersService();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Users not fetched',
      error: {
        code: 404,
        description: 'Users not fetched',
      },
    });
  }
};

// 3. Retrieve a specific user by ID

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await userServices.getSingleUserService(userId);

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
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

// 4. Update user information

const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const updatedData = req.body;

    const updatedUser = await userServices.updateUserService(
      userId,
      updatedData,
    );

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
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

// 5. Delete a user

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const result = await userServices.deleteUserService(userId);

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
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

// 6. Add New Product in Order

const addNewOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const orderData = req.body;

    const user = await userServices.addNewOrderService(userId);

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
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

// 7. Retrieve all orders for a specific user

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await userServices.getAllOrdersService(userId);

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
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};
// 7. Calculate Total Price of Orders for a Specific User

const getOrdersTotalPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await userServices.getAllOrdersService(userId);

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

    const totalPrice = user.orders?.reduce((acc, cur) => {
      const price = cur.price * cur.quantity;
      return acc + price;
    }, 0);

    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      totalPrice,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

export const userControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  addNewOrder,
  getAllOrders,
  getOrdersTotalPrice,
};
