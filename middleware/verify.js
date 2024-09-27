const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
    const {token} = req.cookies;
    if (!token) {
        return res.json({error: "You are not authenticated"});
    }
    
    jwt.verify(token, process.env.SECRET, (err, info) => {
        if (err) {
            return res.json({error: err.message});
        }
        req.user = info;
        next();
    })
};

module.exports = {verify};