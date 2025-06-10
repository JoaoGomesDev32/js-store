import bcrypt from "bcryptjs";
import { loginService } from "../services/auth.service.js";

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await loginService(email);

    if (!user) {
      return res.status(401).send({ message: "User or password not found" });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ message: "User or password not found" });
    }

    res.send({ user });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export { login };
