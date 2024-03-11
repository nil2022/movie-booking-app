import { User } from "../models/user.model.js";

export const signup = async (req, res) => {
    const { fullName, email, password, userId } = req.body;

   try {
     const user = await User.create({
         fullName,
         email,
         password,
         userId
     })

     const createdUser = await User.findOne({ userId }).select(' -_id -password -__v ')
 
     console.log('User created successfully', createdUser)

     setTimeout(() => {
        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: createdUser
        })
     }, 1000);
     
   } catch (error) {
        console.log('Error while creating user:', error)
        return res.status(500).json({
            success: false,
            message: 'Error while creating user',
            error
        })
   }
}