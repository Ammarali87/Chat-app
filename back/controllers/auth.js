import jwt from "jsonwebtoken";
import User from "../models/User.js"; // عدّل حسب مسار ملف المستخدم
//  add .js to file 


//  req.headers.authorization &&
    //   req.headers.authorization.startsWith("Bearer")
    // let token ;  token not Const 
    //   token = req.headers.authorization.split(" ")[1];

    //  const decoded = jwt.verify  read with protect 
    //  const decoded = jwt.decode  just read no  حماية 
export const protectRoute = async (req, res, next) => {
  try {
    let token;

    // تحقق من وجود التوكن في الهيدر
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      // تحقق من صحة التوكن
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // decode like userData need to 
      // جلب المستخدم من قاعدة البيانات بدون كلمة المرور
      req.user = await User.findById(decoded.userId).select("-password");
 //  also can be const user = above  and make req.user = user;
      // الاستمرار في الروت
      next();  
      
    } else {
      res.status(401).json({ message: "Not authorized, no token" });
    }  
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};
