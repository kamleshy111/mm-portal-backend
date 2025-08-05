export const parsesIntoJson = (req, res, next) => {
  const methodHasBody = ['POST', 'PUT', 'PATCH'].includes(req.method);

  if (methodHasBody && req.body && Buffer.isBuffer(req.body)) {
    try {
      req.body = JSON.parse(req.body.toString());
    } catch (e) {
      return res.status(400).json({ message: "Invalid JSON format" });
    }
  }

  next();
};
