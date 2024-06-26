
const logoutController = {};

logoutController.logout = async (req, res) => {
    try {
       
        if (!req.cookies.access_token) {
            return res.status(401).send("No hay sesión activa para cerrar");
        }

        res.clearCookie("access_token");
        res.send("Logout exitoso");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al cerrar sesión");
    }
};

export default logoutController;
