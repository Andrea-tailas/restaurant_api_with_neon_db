import cron from "node-cron"

// cron.schedule('* * * * * *',()=>{
//     console.log("Hello");
// })
import { SendMail } from "./mail";

SendMail()