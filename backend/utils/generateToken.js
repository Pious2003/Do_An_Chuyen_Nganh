import jwt from "jsonwebtoken";

const generateToken = (id, res) => {
  const token = jwt.sign({ id }, process.env.Jwt_secret, {
    expiresIn: "15d",
  });

  res.cookie("token", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 ngày
    httpOnly: true, // Ngăn chặn truy cập từ JavaScript (bảo mật hơn)
    sameSite: "strict", // Chỉ gửi cookie trong cùng một trang web
  });
};

export default generateToken;
