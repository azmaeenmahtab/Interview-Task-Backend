const dotenv = require("dotenv");
const db = require("../config/db");
const bcrypt = require("bcrypt");

dotenv.config();

const SignUp = async (req, res) => {

    const { name, email, phone, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const result = await db.query("INSERT INTO users (name, email, phone, password) VALUES ($1, $2, $3, $4) RETURNING *", [name, email, phone, hashedPass]);

    if (result.rows.length == 0) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong"
        })
    }

    return res.status(200).json({
        success: true,
        message: "User successfully created",
        user: result.rows[0]
    })

}

module.exports = {
    SignUp
}