import * as bcrypt from 'bcrypt'

export const matchPassword =
    async (password: string, hashPassword: string): Promise<boolean> => {
        return await bcrypt.compare(password, hashPassword)
    }


export const hashPassword =
    async (password: string): Promise<string> => {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }