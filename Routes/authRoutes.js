const express = require('express')
const bcrypt = require('bcryptjs')
const User = require('../Models/users');
const router = express.Router();


router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    try {
        const userExist =await User.findOne({ email });
        console.log(userExist);
        if (userExist) return res.status(404).json({ msg: 'User Already exist' })

        const hashedPass = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPass });
        await newUser.save();

        res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }

})

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("Login req.body:", req.body);

  try {
    const user = await User.findOne({ email }); 

    if (!user) {
      return res.status(404).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password); 
    
 

    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }
    res.status(200).json({ msg: "Login successful", user });
  
  } catch (error) {
    console.error("Login error:", error); // ✅ Helpful debug
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;