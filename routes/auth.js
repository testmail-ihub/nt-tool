const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    res.status(200).json({ success: true });
});

module.exports = router;