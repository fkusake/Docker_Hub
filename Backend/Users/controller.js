import UserRepository from "./Repo.js";
import bcrypt from "bcrypt";
import Error from "../Errors/error.js";

export default class UserController {

    constructor() {
        this.userRepo = new UserRepository();
    }

    async signup(req, res, next) {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                throw new Error(400, "Name, email, and password are required");
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await this.userRepo.signup(name, email, hashedPassword);

            const userResponse = {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar || "",
                role: user.role || "user"
            };

            return res.status(201).json({
                success: true,
                message: "Account created successfully",
                user: userResponse
            });
        } catch (err) {
            console.error("Signup error:", err);
            next(err);
        }
    }

    async signin(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                throw new Error(400, "Email and password are required");
            }

            const user = await this.userRepo.findByEmail(email);
            if (!user) {
                throw new Error(400, "Invalid email or password");
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new Error(400, "Invalid email or password");
            }

            const userResponse = {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar || "",
                role: user.role || "user"
            };

            return res.status(200).json({
                success: true,
                message: "Signed in successfully",
                user: userResponse
            });
        } catch (err) {
            console.error("Signin error:", err);
            next(err);
        }
    }

}