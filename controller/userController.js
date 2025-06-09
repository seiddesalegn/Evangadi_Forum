const db = require("../db/dbConfig.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function register(req, res) {
  const { username, firstname, lastname, email, password } = req.body;
  if (!username || !firstname || !lastname || !email || !password) {
    return res
      .status(400)
      .json({ msg: "please provide all required information!" });
  }

  try {
    const [user] = await db.query(
      "select username,userid from users where username = ? or email = ? ",
      [username, email]
    );
    if (user.length > 0) {
      return res.status(400).json({ msg: "user already registered" });
    }
    if (password.length < 8) {
      res.status(400).json({ msg: "password must be at least 8 characters" });
    }

    // password encryption

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await db.query(
      "INSERT INTO users(username,firstname,lastname, email,password ) VALUES(?,?,?,?,?)",
      [username, firstname, lastname, email, hashedPassword]
    );
    return res.status(201).json({ msg: "user created successfully" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ msg: "something went wrong, try again later" });
  }
}

// login
async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Please provide all required fields!" });
  }

  try {
    const [user] = await db.query(
      "SELECT username, userid, password FROM users WHERE email = ?",
      [email]
    );

    if (user.length === 0) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user[0].password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const username = user[0].username;
    const userid = user[0].userid;

    const token = jwt.sign({ username, userid }, "secrete", {
      expiresIn: "1d",
    });

    return res.status(200).json({ msg: "user login successfully", token });

    //Success response
    // return res.status(200).json({
    //   msg: "Login successful",
    //   user: {
    //     userid: user[0].userid,
    //     username: user[0].username,
    //     email,
    //   },
    // });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ msg: "Something went wrong, try again later" });
  }
}
async function checkUser(req, res) {
  res.send("Check user");
}

module.exports = { register, login, checkUser };
