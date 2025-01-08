import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];
  const token = authHeader && authHeader.split(" ")[1].replace(/"/g, "");
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "UnAuthorized User!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.CLIENT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    }
    res.status(401).json({ message: "Unauthorized - Invalid access token" });
  }
};

export const roleMiddleware = (requiredRoles) => (req, res, next) => {
  if (!req.user || !requiredRoles.includes(req.user.role)) {
    return res.status(403).json({ message: "Forbidden: Access denied" });
  }
  next();
};
