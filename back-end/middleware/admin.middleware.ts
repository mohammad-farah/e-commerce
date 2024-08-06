import { Context, Next } from "koa";
import { raiseWarning } from "../utils/response.beautifier";

export const adminAuthValidator = async (ctx: Context, next: Next) => {
  try {
    
    // this value passed from previous middleware user.validator 
    const role = ctx.state.user.role as string;
    
    if ( role !== 'admin' ) {
      
      ctx.status = 403; 
      ctx.body = raiseWarning("You are not authorized to make this change, it neeeds administration privileges");
    
    } else {
        await next(); 
    }
  
   } catch (error) {

    ctx.status = 500; 
    ctx.body = raiseWarning("An error occurred while processing your request");
    console.error("Admin authorization error:", error);

  }
};
