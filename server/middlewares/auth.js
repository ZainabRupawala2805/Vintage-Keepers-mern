const jwt = require("jsonwebtoken");

// Middleware for Authentication
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Unauthorized: Token missing or invalid" });
  }

  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, 'AshishIngle29', (err, user) => {
      if (err) {
        return res.status(403).send({ message: "Invalid or expired token" });
      }
      req.user = user; // Store user info from token in request
      next();
    });
  } catch (error) {
    return res.status(403).send({ message: "Forbidden: Invalid token", error });
  }
};

// Middleware for Authorization
const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).send({ message: "Forbidden: Access denied" });
    }
    next();
  };
};

module.exports = {
  authenticate,
  authorize,
};
