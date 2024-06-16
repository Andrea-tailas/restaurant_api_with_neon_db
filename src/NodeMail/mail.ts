import nodemailer from 'nodemailer';
import "dotenv/config";
export function SendMail(email:string,subject:string,text:any){
    const transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASSWORD
        }
    })
    const mailOptions={
        from:process.env.EMAIL,
        to:email,
        subject:subject,
        html:text
    }
    transporter.sendMail(mailOptions,(err,info)=>{
        if(err){
            console.log(`Error: ${err}`);
        }
        else{
            console.log(`Email sent: ${info.response}`);
        }
    })
}