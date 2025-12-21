# 🏨 B5ooking - Hệ thống Đặt phòng Khách sạn

Đồ án xây dựng website đặt phòng khách sạn trực tuyến, cho phép người dùng tìm kiếm, đặt phòng và quản trị viên quản lý khách sạn, phòng ốc.

## 🚀 Công nghệ sử dụng

- **Frontend:** Next.js 14, TypeScript, Ant Design, TailwindCSS.
- **Backend:** Node.js, Express.js.
- **Database:** MySQL, Prisma ORM.
- **Lưu trữ ảnh:** Cloudinary.

## 🛠 Hướng dẫn Cài đặt & Chạy dự án

Để chạy dự án này trên máy cục bộ, vui lòng làm theo các bước sau:

### 1. Clone dự án
```bash
git clone [https://github.com/qvu04/B5ooking.git](https://github.com/qvu04/B5ooking.git)
cd B5ooking
# CÀI ĐẶT BACKEND
# Di chuyển vào thư mục backend (ví dụ tên là 'be' hoặc 'backend')
cd be 

# Cài đặt thư viện
npm install

# Cấu hình biến môi trường
# Tạo file .env dựa trên file .env.example và điền thông tin Database/Cloudinary của bạn.

# Đồng bộ Database (Prisma)
npx prisma generate
npx prisma db push

# Chạy server
npm start
# CÀI ĐẶT FRONTEND
# Di chuyển vào thư mục frontend (ví dụ tên là 'fe' hoặc 'frontend')
cd fe

# Cài đặt thư viện
npm install

# Chạy dự án
npm run dev