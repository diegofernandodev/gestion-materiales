import jwt from "jsonwebtoken"

export const tokenSign = async (user) => {
    const { _id, nombre, correo, rol_id } = user;
    const payload = { userId: _id, correo, nombre, rol_id };
    const secret = process.env.JWT_SECRET;
    const options = { expiresIn: "1h" };
    const token = jwt.sign(payload, secret, options);
    return token;
  };

export const verifyToken = async (token) => {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new Error("Token inválido o caducado");
    }
  };

