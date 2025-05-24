import jwt from "jsonwebtoken";

const tokenVerification = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(403).send("Unauthorized");
  const token = header.split(" ")[1];

  if (!token) return res.status(403).send("Unauthorized");

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send("Unauthorized");
    }
    req.userId = decoded.userId;
    next();
  });
};

export default tokenVerification;
