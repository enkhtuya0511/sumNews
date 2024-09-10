import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).json({
      status: "error",
      message: "Hereglegc token oruulah shaardlagatai",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.PRIVATEKEY);
    req.user = decoded;
  } catch (err) {
    console.log("errorV", err);
    return res.status(401).json({
      status: "error",
      message: "Hereglegc token buruu eswel token oruulah shaardlagatai",
    });
  }
  return next();
};
