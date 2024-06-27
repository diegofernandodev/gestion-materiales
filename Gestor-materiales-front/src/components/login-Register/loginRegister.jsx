import { useState } from "react";
import api from "../../services/api";
// import Cookies from 'js-cookie';
import "./loginRegister.css";

const LoginRegister = () => {
  const [correoLogin, setCorreoLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [correoRegister, setCorreoRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [nombreRegister, setNombreRegister] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("/login", {
        correo: correoLogin,
        password: passwordLogin,
      });

    //   const token = response.data.token;
    //   Cookies.set("access_token", token, { expires: 1 }); // Almacenar el token en las cookies
      alert("Inicio de sesión correcto");
      console.log(response.data);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert(
        "Error al iniciar sesión: " + error.response?.data || error.message
      );
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("/register", {
        nombre: nombreRegister,
        correo: correoRegister,
        password: passwordRegister,
      });
      alert("Registro exitoso");
      console.log(response.data);
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      alert(
        "Error al registrar usuario: " + error.response?.data || error.message
      );
    }
  };

  const switchContent = () => {
    const content = document.getElementById("content");
    const registerBtn = document.getElementById("register");
    const loginBtn = document.getElementById("login");

    registerBtn.addEventListener("click", () => {
      content.classList.add("active");
    });

    loginBtn.addEventListener("click", () => {
      content.classList.remove("active");
    });
  };

  return (
    <div
      className="content justify-content-center align-items-center d-flex shadow-lg"
      id="content"
    >
      <div className="col-md-6 d-flex justify-content-center">
        <form onSubmit={handleRegister}>
          <div className="header-text mb-4">
            <h1>Registrarse</h1>
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              placeholder="Nombre"
              className="form-control form-control-lg bg-light fs-6"
              value={nombreRegister}
              onChange={(e) => setNombreRegister(e.target.value)}
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="email"
              placeholder="Correo"
              className="form-control form-control-lg bg-light fs-6"
              value={correoRegister}
              onChange={(e) => setCorreoRegister(e.target.value)}
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="password"
              placeholder="Password"
              className="form-control form-control-lg bg-light fs-6"
              value={passwordRegister}
              onChange={(e) => setPasswordRegister(e.target.value)}
            />
          </div>
          <div className="input-group mb-3 justify-content-center">
            <button
              type="submit"
              className="btn border-white text-white w-50 fs-6"
            >
              Register
            </button>
          </div>
        </form>
      </div>

      <div className="col-md-6 right-box">
        <form onSubmit={handleLogin}>
          <div className="header-text mb-4">
            <h1>Iniciar sesión</h1>
          </div>
          <div className="input-group mb-3">
            <input
              type="email"
              placeholder="Correo"
              className="form-control form-control-lg bg-light fs-6"
              value={correoLogin}
              onChange={(e) => setCorreoLogin(e.target.value)}
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="password"
              placeholder="Password"
              className="form-control form-control-lg bg-light fs-6"
              value={passwordLogin}
              onChange={(e) => setPasswordLogin(e.target.value)}
            />
          </div>
          <div className="input-group mb-5 d-flex justify-content-between">
            <div className="form-check">
              <input type="checkbox" className="form-check-input" />
              <label
                htmlFor="formcheck"
                className="form-check-label text-secondary"
              >
                <small>Recordar</small>
              </label>
            </div>
            <div className="forgot">
              <small>
                <a href="#">¿Has olvidado tu contraseña?</a>
              </small>
            </div>
          </div>
          <div className="input-group mb-3 justify-content-center">
            <button
              type="submit"
              className="btn border-white text-white w-50 fs-6"
            >
              Login
            </button>
          </div>
        </form>
      </div>

      <div className="switch-content">
        <div className="switch">
          <div className="switch-panel switch-left">
            <h1>Hola</h1>
            <p>Felices nuevamente</p>
            <button
              className="hidden btn border-white text-white w-50 fs-6"
              id="login"
              onClick={switchContent}
            >
              Login
            </button>
          </div>
        </div>
      </div>

      <div className="switch-content">
        <div className="switch">
          <div className="switch-panel switch-right">
            <h1>Bienvenido</h1>
            <p>Bienvenidos a la plataforma</p>
            <button
              className="hidden btn border-white text-white w-50 fs-6"
              id="register"
              onClick={switchContent}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
