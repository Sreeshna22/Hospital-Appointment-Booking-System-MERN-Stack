import jwt from "jsonwebtoken";

function authentication(req, res, next) {
  try {
    const token = req.cookies.logToken; // ✅ read cookie properly
    if (!token) return res.status(401).json({ msg: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.name = decoded.userName;
    req.role = decoded.role;
    req.userId = decoded.userId;

    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
}
export default authentication;