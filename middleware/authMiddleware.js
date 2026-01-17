const jwt = require("jsonwebtoken");
const JWT_SECRET = "secret123";

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "No token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id; // ✅ FIXED
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};
