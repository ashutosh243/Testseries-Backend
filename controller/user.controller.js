const { check_existing_user, insert_into_student } = require('../model/user.model');

const register = async (req, res) => {

    const { fullname, email, phoneNo, password } = req.body;
    if (!fullname || !email || !phoneNo || !password) return res.status(400).json({ msg: "provide all details" });

    try {
        //model to check user already exist or not 
        const existingUser = await check_existing_user(email);

        if(existingUser && existingUser.length > 0){
            return res.status(409).json({ message: "User already exists" });
        }
        
        //if not present then you have insert  into the database
        const insert_result=await insert_into_student(fullname,email,phoneNo,password);
        if(insert_result)
        {
            return res.status(200).json({msg:"inserted successfully"});
        }
        else
        {
           return res.json.status(400).json({msg:"something went wrong"});
        }
      //here jwt authentication and password hashing and objec creation 



        // then insert into the database 


        //return msg to api
    } catch (e) {
        return res.json({ msg: e });
    }
}
module.exports = { register };