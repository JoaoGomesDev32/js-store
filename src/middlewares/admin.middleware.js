import userService from "../services/user.service.js";

const adminMiddleware = async (req, res, next) => {
  const user = await userService.findByIdService(req.userId);
  if (!user || !user.isAdmin) {
    return res.status(403).send({ message: "Acesso permitido apenas para administradores" });
  }
  next();
};

export default adminMiddleware; 