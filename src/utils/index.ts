import { genSalt, hash, compare } from "bcryptjs";

const hashPassword = async (password: string): Promise<string> => {
    const salt = await genSalt(10);
    return await hash(password, salt);
}

const comparePassword = async (password: string, enteredPassword: string): Promise<boolean> => {
    return await compare(enteredPassword, password)
}

export {
    hashPassword,
    comparePassword
}