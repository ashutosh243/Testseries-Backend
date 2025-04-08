const { check_existing_user, insert_into_student,get_all_student,get_all_user} = require('../model/user.model');
const bcrypt = require('bcrypt');
const { all } = require('../routes/user.routes');

const register = async (req, res) => {

    const { fullname, email, phoneNo, password } = req.body;
    if (!fullname || !email || !phoneNo || !password) return res.status(400).json({ msg: "provide all details" });

    try{
        const existingUser = await check_existing_user(email);
        if (existingUser && existingUser.length > 0) {
            return res.status(409).json({ message: "user already exist" });
        }
        const hash_password = await bcrypt.hash(password, 10);
        const insert_result = await insert_into_student(fullname, email, phoneNo, hash_password);
        /*
         JWT Authentication remaing here -----
        */
        if (insert_result) {
            return res.status(200).json({ msg: "inserted successfully" });
        }
        else {
            return res.status(400).json({ msg: "something went wrong" });
        }

    }
    catch (e) {
        return res.json({ msg:e.message });
    }
}
const login = async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ msg: "provide necessary details" });
  
    try {
        const user = await check_existing_user(email);
        if (user?.length == 0) {
            return res.status(404).json({ msg: "Invalid email & password" });
        }
        const isvalid_user = await bcrypt.compare(password, user[0].userpassword);
        if (!isvalid_user) {
            return res.status(200).json({msg:"Invalid email & password"});
        }
        return res.status(200).json(user);
        /*
         Jwt creation and cookies setup in the browser
        */

    } catch (e) {
        return res.status(400).json({ msg: e.message });
    }
}
const alluser=async(req,res)=>{
    
    try{
        console.log('all user');
        const result =await get_all_user();
        return res.status(200).json({result});
    }
    catch(e)
    {
        return res.status(400).json({msg:e.message});
    }
}
const allstudent=async(req,res)=>{

    try{
        
         const result =await get_all_student();
         return res.status(200).json(result);
    }
    catch(e)
    {
         return res.status(400).json({msg:e.message});
    }
}
module.exports = { register, login,alluser,allstudent};