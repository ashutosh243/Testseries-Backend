const sql=require('mssql/msnodesqlv8');

const config={
    server:process.env.server,
    database:process.env.database,
    user:process.env.user,
    password:process.env.password,
    options: {
        encrypt: false, 
        enableArithAbort: true,
        trustServerCertificate: true,
    },
    driver: "msnodesqlv8"
}
let pool;
const connectToDB = async () => {
    try{
      if (!pool) {

        pool = await sql.connect(config);
        console.log("Connected to SQL Server");
      }
      return pool;
    } catch (err) {
      console.error(" Database connection failed:", err);
      throw err;
    }
  };
module.exports={connectToDB,sql}