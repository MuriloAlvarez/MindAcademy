const jwt = require("jsonwebtoken");
const db = require("../db");
const bcrypt = require('bcrypt');

exports.AutenticarUsuario = async (req, res, next) => {
  try {
    const conn = await db.connect();
    const { username, password } = req.body;

    const sql = 'SELECT * FROM usuarios WHERE username = ?';
    const [rows] = await conn.query(sql, [username]);

    if (rows.length > 0) {
      const user = rows[0];

      const match = await bcrypt.compare(password, user.password);

      if (match) {
        const token = jwt.sign({ id: user.id }, 'secret-super-secreto', {
          expiresIn: 100000,
        });

        return res.json({ autenticado: true, token: token });
      } else {
        return res.status(401).json({ message: "Login inválido!" });
      }
    } else {
      return res.status(401).json({ message: "Login inválido!" });
    }
  } catch (error) {
    console.error('Erro ao autenticar o usuário:', error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};