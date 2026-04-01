const saltRound = 10;
const bcrypt = require('bcrypt');

export const hashPassword = async (plainPassword: string) => {
    try {
        return await bcrypt.hash(plainPassword, saltRound);
    } catch (error) {
        console.log(error);
    }
}

export const comparePassword = async (plainPassword: string, hash: string) => {
    try {
        return await bcrypt.compare(plainPassword, hash);
    } catch (error) {
        console.log(error);
    }
}