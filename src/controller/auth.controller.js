import { loginService, registerService } from "../service/auth.service.js";

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const token = await loginService(email, password);
    return res
      .status(200)
      .json({ message: "Login successfully", token: token });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const register = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password, "email and password");
  
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const token = await registerService(email, password);
    return res
      .status(201)
      .json({ message: "Register successfully", token: token });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export { register, login };
