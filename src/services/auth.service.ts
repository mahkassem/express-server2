import UsersEntity, { User } from "../entities/users.entity";
import env from "../utils/helpers/env.helper";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const _usersEntity = new UsersEntity();

class AuthService {
    async register(user: User): Promise<User> {
        user.password = bcrypt.hashSync(
            user.password + env("BCRYPT_SECRET"),
            parseInt(env("BCRYPT_SALT"))
        );

        const createdUser = await _usersEntity.create(user);
        // delete password from response
        delete createdUser.password;

        return createdUser;
    }

    async login(user: User): Promise<User> {
        const { username, password } = user;

        // check if user exists
        const userExists = await _usersEntity.getByUsername(username);
        if (!userExists)
            throw new Error("User does not exist. Please register first.");

        // compare passwords
        const passwordIsValid = bcrypt.compareSync(
            password + env("BCRYPT_SECRET"),
            userExists.password as string
        )
        if (!passwordIsValid)
            throw new Error("Invalid password. Please try again.");

        // generate token
        const token = this.generateToken(userExists);

        // remove password from response
        delete userExists.password;

        return { ...userExists, token };
    }

    generateToken(user: User): string {
        return jwt.sign({ sub: user.username }, env("JWT_SECRET"), {
            expiresIn: 60,
        });
    }

}

export default AuthService;