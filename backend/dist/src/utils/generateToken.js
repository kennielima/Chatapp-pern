import jwt from 'jsonwebtoken';
const generateTokenSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "15d"
    });
    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, //millisecs
        httpOnly: true, // prevent xss cross-site scripting
        sameSite: "strict", //prevent csrf attack cross-site request forgery
        secure: process.env.NODE_ENV !== "development" //HTTPS
    });
    return token;
};
export default generateTokenSetCookie;
