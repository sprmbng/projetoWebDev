'use strict';
const jwt = require('jsonwebtoken');

exports.generateToken = async (data) => {
    return jwt.sign(data, global.SALT_KEY, {
        expiresIn: '12h'
    });
}

exports.decodeToken = async (token) => {
    const data = await jwt.verify(token, global.SALT_KEY);
    return data;
}

exports.authorize = function(req, res, next) {
    let token = req.body.token || req.query.token ||
        req.headers['x-access-token'] || req.params.token;

    if (!token) {
        res.status(401).json({
            message: 'Restrict access'
        });
    } else {
        jwt.verify(token, global.SALT_KEY, function(error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Invalid Token'
                });
            } else {
                next();
            }
        });
    }
};

exports.isAdmin = function(req, res, next) {
    let token = req.body.token || req.query.token ||
        req.headers['x-access-token'] || req.params.token;

    if (!token) {
        res.status(401).json({
            message: 'Invalid Token'
        });
    } else {
        jwt.verify(token, global.SALT_KEY, function(error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Invalid Token'
                });
            } else {
                if (decoded.roles.includes('admin')) {
                    next();
                } else {
                    res.status(403).json({
                        message: 'Admin only!'
                    });
                }
            }
        });
    }
};
