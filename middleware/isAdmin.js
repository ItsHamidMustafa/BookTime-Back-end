const isAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(400).json({ error: 'You must be logged in' });
    }

    if(req.user.role === 1 ) {
        next();
    } else {
        return res.status(403).json({error: 'Access denied, admins only.'});
    }
};

module.exports = isAdmin;