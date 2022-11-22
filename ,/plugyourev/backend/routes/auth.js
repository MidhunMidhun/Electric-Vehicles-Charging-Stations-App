const router = require("express").Router();
const Users = require("../models/Users");
const CryptoJS= require("crypto-js");



//LOGIN
router.post("/login", async (req, res) => {
  try{
    const user = await Users.findOne({ username: req.body.username });
    !user && res.status(401).json("Wrong password or username!");

    const bytes=CryptoJS.AES.decrypt(user.password,'admin');
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    originalPassword !== req.body.password &&
      res.status(401).json("Wrong password or username!");
    
    //   const accessToken = jwt.sign(
    //     { id: user._id, isAdmin: user.isAdmin },
    //     process.env.SECRET_KEY,
    //     { expiresIn: "5d" }
    //   );

    const { password, ...info } = user._doc;

    res.status(200).json({ ...info, accessToken });

  }catch(err){
    res.status(500).json(err);
  }

});

module.exports = router;

