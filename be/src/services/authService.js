import { checkEmail } from "../utils/checkEmail.js"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import { generateToken } from "../utils/generateToken.js"
import { BadrequestException, NotFoundException } from "../helpers/exception.helper.js"
const prisma = new PrismaClient()
export const authService = {
    register: async function (data) {

        const { firstName, lastName, email, password, gender } = data
        if (!firstName || !lastName || !email || !password || !gender) {
            throw new BadrequestException("Vui lòng điền đầy đủ thông tin")
        }
        checkEmail(email)
        const existingEmail = await prisma.user.findUnique({ where: { email } })
        if (existingEmail) {
            throw new BadrequestException("Email đã tồn tại. Vui lòng đăng nhập")
        }

        const hashpassword = await bcrypt.hash(password, 10)
        const newUser = await prisma.user.create(
            {
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    fullName: `${firstName} ${lastName}`,
                    email: email,
                    password: hashpassword,
                    gender: gender,
                },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    fullName: true,
                    email: true,
                    gender: true,
                    phone: true,
                    address: true,
                    avatar: true,
                    dateOfBirth: true,
                    role: true,
                    create_At: true
                }
            }
        );
        return {
            newUser: newUser
        }
    },
    login: async function name({ email, password }) {

        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) {
            throw new NotFoundException("Không tìm thấy người dùng với email này")
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            throw new BadrequestException("Mật khẩu không đúng")
        }

        const token = generateToken(user.id, user.role, user)

        return {
            user: token
        }
    },

    getUserById: async function (userId) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                fullName: true,
                email: true,
                gender: true,
                phone: true,
                address: true,
                avatar: true,
                dateOfBirth: true,
                role: true,
                create_At: true
            }
        });
        if (!user) {
            throw new NotFoundException("Không tìm thấy người dùng")
        }
        return {
            user: user
        }
    }
}