import bcrypt from "bcryptjs";

const plainPassword = "admin123";
const hashedPassword = bcrypt.hashSync(plainPassword, 10);

export const adminEmail = "admin@example.com";
export const adminHashedPassword = hashedPassword;
