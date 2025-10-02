import { checkEmail } from "../utils/checkEmail.js"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import { generateToken } from "../utils/generateToken.js"
import { BadrequestException, NotFoundException } from "../helpers/exception.helper.js"
import { verifyGoogleToken } from "../utils/googleAuth.js"
import { OAuth2Client } from "google-auth-library"
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
                    credentials: {
                        create: {
                            provider: 'local',
                            password: hashpassword
                        }
                    },
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

        const user = await prisma.user.findUnique({ where: { email }, include: { credentials: true } })
        if (!user) {
            throw new NotFoundException("Không tìm thấy người dùng với email này")
        }
        const localCredential = user.credentials.find(cred => cred.provider === 'local')
        const isMatch = await bcrypt.compare(password, localCredential.password)
        if (!isMatch) {
            throw new BadrequestException("Mật khẩu không đúng")
        }

        const token = generateToken(user.id, user.role, user)

        return {
            user: token
        }
    },
    loginGoogle: async function (data) {
        const { code, redirect_uri } = data;
        if (!code) {
            throw new BadrequestException("Authorization code không được để trống");
        }
        
        const client = new OAuth2Client(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri
        );
        console.log("=== Nhận code từ FE ===", code);
        console.log("=== redirect_uri từ FE ===", redirect_uri);

        const { tokens } = await client.getToken(code);

        console.log("=== Google Tokens ===", tokens);


        console.log("=== Google Tokens ===");
        console.log(tokens);

        if (!tokens.id_token) {
            throw new BadrequestException("Không lấy được id_token từ Google");
        }

        const googleUser = await verifyGoogleToken(tokens.id_token);

        console.log("=== Google User Payload ===");
        console.log(googleUser);

        if (!googleUser?.email) {
            throw new BadrequestException("Không lấy được email từ Google");
        }

        if (!googleUser.email_verified) {
            throw new BadrequestException("Email chưa được xác minh bởi Google");
        }

        let user = await prisma.user.findUnique({
            where: { email: googleUser.email },
            include: { credentials: true },
        });

        if (!user) {
            console.log("⚡ User chưa tồn tại → tạo mới trong DB");

            user = await prisma.user.create({
                data: {
                    firstName: googleUser.given_name || googleUser.name || "Unknown",
                    lastName: googleUser.family_name || "",
                    fullName:
                        googleUser.name ||
                        `${googleUser.given_name || ""} ${googleUser.family_name || ""}`,
                    email: googleUser.email,
                    avatar: googleUser.picture || null,
                    credentials: {
                        create: {
                            provider: "google",
                            providerId: googleUser.sub,
                        },
                    },
                },
                include: { credentials: true },
            });
        } else {
            console.log("⚡ User đã tồn tại trong DB");
            const hasGoogle = user.credentials.find(
                (cred) => cred.provider === "google"
            );
            if (!hasGoogle) {
                console.log("⚡ Thêm credential Google cho user cũ");
                await prisma.credential.create({
                    data: {
                        userId: user.id,
                        provider: "google",
                        providerId: googleUser.sub,
                    },
                });
            }
        }

        const token = generateToken(user.id, user.role, user);

        console.log("=== Final User Return ===");
        console.log(token);

        return { user: token };
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