import bcrypt from 'bcrypt';

const SALT_WORK_FACTOR = 10;

export const encrypt = async (password: string) => {
    return await bcrypt.hash(password, SALT_WORK_FACTOR);
}