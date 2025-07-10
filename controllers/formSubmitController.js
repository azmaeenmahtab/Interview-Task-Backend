const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt")
const db = require("../config/db")

dotenv.config();

const FormSubmit = async (req, res) => {

    const {
        centerName,
        streetAddress,
        city,
        state,
        postalCode,
        centerPhone,
        centerEmail,
        website,
        establishedYear,
        subdomain,
        contactName,
        contactPosition,
        contactPhone,
        contactEmail,
        username,
        password
    } = req.body;

    if (
        !centerName || !streetAddress || !city || !state || !postalCode || !centerPhone ||
        !centerEmail || !subdomain || !contactName || !contactPosition || !contactPhone ||
        !contactEmail || !username || !password
    ) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const userId = req.user.user_id;



    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const result = await db.query(`
    INSERT INTO coaching_centers (
      center_name, street_address, city, state, postal_code,
      center_phone, center_email, website, established_year, subdomain,
      contact_name, contact_position, contact_phone, contact_email,
      username, password, member_id
    ) VALUES ($1, $2, $3, $4, $5,
              $6, $7, $8, $9, $10,
              $11, $12, $13, $14,
              $15, $16, $17)
    RETURNING center_id, center_name, subdomain, created_at;
  `, [
            centerName, streetAddress, city, state, postalCode,
            centerPhone, centerEmail, website, establishedYear, subdomain,
            contactName, contactPosition, contactPhone, contactEmail,
            username, hashedPassword, userId
        ]);

        if (result.rows.length == 0) {
            return res.status(400).json({
                success: false,
                message: "Something went wrong inserting in DB"
            })
        }

        res.status(201).json({
            success: true,
            message: "Coaching center registered successfully",
            data: result.rows[0]
        });

    } catch (error) {
        console.error("DB insert error:", error); // ← Log full error in terminal
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message || "Unknown error"
        });
    }



}

module.exports = {
    FormSubmit
}