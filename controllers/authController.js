const bcrypt = require("bcrypt");
const db = require("../db/db");

/* REGISTER */

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

  db.query(sql, [name, email, hash], (err) => {
    if (err) {
      return res.json({ status: false, message: "User exists" });
    }

    res.json({ status: true, message: "Registered" });
  });
};

/* LOGIN with session */



exports.login = (req, res) => {


  if (!req.body) {
    return res.status(400).json({ message: "Request body missing" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and Password required" });
  }
 
  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], async (err, result) => {
    if (result.length === 0) {
      return res.json({ status: false, message: "User not found" });
    }

    const user = result[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.json({ status: false, message: "Wrong password" });
    }

    // SESSION
    req.session.user = {
      id: user.id,
      email: user.email
    };

    res.json({ status: true, message: "Login success" });
  });
};

/* LOGOUT */

exports.logout = (req, res) => {
  req.session.destroy();
  res.json({ status: true, message: "Logged out" });
};