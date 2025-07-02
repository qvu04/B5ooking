export const createSlug = (title) => {
  return title
    .normalize('NFD')                    // phân tách dấu tiếng Việt
    .replace(/đ/g, 'd')                  // đ → d
    .replace(/Đ/g, 'd')                  // Đ → d
    .replace(/[\u0300-\u036f]/g, '')     // loại bỏ dấu (á → a)
    .toLowerCase()                       // chữ thường
    .replace(/[^a-z0-9\s-]/g, '')        // bỏ ký tự không hợp lệ
    .trim()                              // xóa khoảng trắng đầu/cuối
    .replace(/\s+/g, '-')                // khoảng trắng → -
    .replace(/-+/g, '-');                // bỏ dấu - trùng
};
