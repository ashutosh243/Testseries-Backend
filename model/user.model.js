const { NVarChar } = require('msnodesqlv8');
const {connectToDB,sql}=require('../Database/db');
const { MAX } = require('mssql');

const check_existing_user=async(email)=>{

    try{
        const pool=await connectToDB();
        const result = await pool.request()
        .input("fullname",sql.NVarChar(40),"")
        .input("phoneNumber",sql.NVarChar(40),"")
        .input("password", sql.NVarChar(MAX), "")
        .input("q", sql.NVarChar(20), "check_student")
        .input("email",sql.NVarChar(40),email)
        .input("userid",sql.Int,"").execute("studentInsert");
        return result.recordset;
    }catch(e){
       console.log('error in existing user'+e.message);
    }
}
const insert_into_student=async(fullname,email,phone,password)=>{

    try{
         const pool=await connectToDB();
         const result =await pool.request()
        .input("fullname",sql.NVarChar(40),fullname)
        .input("email",sql.NVarChar(40),email)
        .input("password",sql.NVarChar(MAX),password)
        .input("phoneNumber",sql.NVARCHAR(40),phone)
        .input("q", sql.NVarChar(20), "insert_student")
        .input("userid",sql.Int,"")
        .execute("studentInsert");
        return true;
    }
    catch(e)
    {
        console.log("error in insert user "+e);
    }
}
const get_all_user=async()=>{

    try{
        const pool=await connectToDB();
        const result =await pool.request()
        .input("q", sql.NVarChar(30), "user")
        .execute('getdata');
         return result.recordset;
    }
    catch(e)
    {
        console.log(e.message);
    }

}
const get_all_student =async(req,res)=>{

    try
    {
        const pool=await connectToDB();
        const result =await pool.request()
        .input("q", sql.NVarChar(30), "student")
        .execute('getdata');
        return result.recordset;
    }
    catch(e)
    {
       console.log(e.message);
    }
}
module.exports={check_existing_user,insert_into_student,get_all_user,get_all_student};