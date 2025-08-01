// controllers/SignupController.js
const User = require('../models/user');

class SignupController {
  async signup(req, res) {
    const { email, password } = req.body;

    try {
      const existing = await User.findByUsername(email);
      if (existing) return res.status(400).json({ message: 'User already exists' });

      await User.create({ email, password });
      res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
      console.error('Signup error:', err.message);
      res.status(500).json({ message: 'Server error during sign up' });
    }
  }
}

module.exports = SignupController;
