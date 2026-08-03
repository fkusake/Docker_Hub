import User from './model.js';
import Error from '../Errors/error.js';

export default class UserRepository {
  async signup(name, email, hashedPassword) {
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error(400, 'Email is already registered');
      }

      const newUser = new User({
        name,
        email,
        password: hashedPassword
      });

      await newUser.save();
      return newUser;
    } catch (err) {
      if (err.statusCode) throw err;
      console.error('Signup Repo Error:', err);
      throw new Error(500, 'Database error during signup');
    }
  }

  async findByEmail(email) {
    try {
      return await User.findOne({ email });
    } catch (err) {
      console.error('Find User Repo Error:', err);
      throw new Error(500, 'Database error while searching for user');
    }
  }
}