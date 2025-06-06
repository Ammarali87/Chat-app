import User from "../models/User";

//   كل فنكشن تريترن حاجة لازم
const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  return token;
};
//  add async also await to find
// add hashPassword
export const signup = async (req, res, next) => {
  const { fullName, email, password, profilePic, bio } = req.body;
  try {
    //  all day check input you get
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: " Please fill all fileds" });
    }
    //  optional can create var to findOne named user
    // if(!User.findOne({email}))
    const user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ message: "User already exists with this email" });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hashPassword(password, salt);

    const newUser = await User.create({
      fullName,
      email,
      hashPassword,
      profilePic,
      bio,
    }); // error  add password directly in create must add hashed
    // تذكر ._id
    const token = generateToken(newUser._id);
    //   غلط    (newUser.id)

    res
      .status(201)
      .json({
        message: "User created successfully",
        user: newUser,
        token: token,
      });
  } catch (error) {
    console.error("Error in signup", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


    //    in login
//   findOne need to {} findOne({})
// check email by findOne
//  check password by bcrypt.compare
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userData = await User.findOne({ email });
    if (!userData) return res.status(400).json({ message: "error" });
   
    const isCorrectPassword = await bcrypt.compare(password, userData.password);
    if (!isCorrectPassword) return res.status(400).json({ message: "error" });

    const token = generateToken(userData._id);

    res
      .status(201)
      .json({
        message: "User created successfully",
        user: newUser,
        token: token,
      });
  } catch (error) {
    console.error("error", error);
  }
};
