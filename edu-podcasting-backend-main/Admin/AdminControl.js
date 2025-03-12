const jwt = require("jsonwebtoken");
const adiminLogin=(req,res)=>{
    try {
        const { email, password } = req.body;
        if (password === 'Admin@1' && email === 'admin@gmail.com') {
        const token = jwt.sign(
            { email: email, password: password },
            "secret_key",
            { expiresIn: 86400 }
        );
        return res
            .status(200)
            .json({ message: "Login successful", token, id: 'admin' });
        } else {
        return res.status(401).json({ message: "Password is incorrect" });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}
module.exports={adiminLogin}