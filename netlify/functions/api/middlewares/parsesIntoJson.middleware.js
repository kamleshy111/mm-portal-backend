export const parsesIntoJson = (req, res, next) => {
  if (Buffer.isBuffer(req.body)) {
    try {
      req.body = JSON.parse(req.body.toString());
    } catch (e) {
      return res.status(400).json({ message: "Invalid JSON" });
    }
  }
  next();
};