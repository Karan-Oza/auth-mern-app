const jwt = require("jsonwebtoken");
const ensureAuthentication = (req, res, next) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    return res.status(401).send("Access denied. No authentication provided.");
  }

  try {
    const decoded = jwt.verify(auth, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("error", error);
    return res.status(400).send("Invalid token");
  }
};

module.exports = ensureAuthentication;
