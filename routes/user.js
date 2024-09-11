const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const { loginUser, signupUser, updateUser } = require('../controllers/userController');
const User = require('../models/User');


router.post('/login', loginUser);
router.post('/signup', signupUser);


router.patch('/update/:id', requireAuth, updateUser);
router.get('/me', requireAuth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');

        if (!user) {
            return res.status(404).json({ error: 'User not found!' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve user' });
    }
});

module.exports = router;