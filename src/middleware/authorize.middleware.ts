import { NextFunction } from "express-serve-static-core";
import { JWT_SECRET } from "../utils/constants";
import { jwtPayload } from "../utils/jwtPayload";
import jsonwebtoken from "jsonwebtoken";
import { RequestWithUser } from "../utils/requestWithUser";
import { Response } from "express";


const authorize=async(
    req:RequestWithUser,
    res:Response,
    next:NextFunction
)=>{
    try{
        console.log("helo");
        const token=getTokenFromRequestHeader(req);
        const payload=jsonwebtoken.verify(token,JWT_SECRET);

        req.name=(payload as jwtPayload).name;
        req.email=(payload as jwtPayload).email;
        req.role=(payload as jwtPayload).role;
        return next();
    }
    catch(error){
        return next(error);
    }
}

const getTokenFromRequestHeader=(req:RequestWithUser)=>{
    const bearerToken=req.header("Authorization");
    console.log("helo2",bearerToken);

    const token=bearerToken?bearerToken.replace("Bearer ",""):"";
    console.log("helo3",token)
    return token;
}

export default authorize;