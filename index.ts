import express from "express";
import { Request, Response } from "express-serve-static-core";


const server= express();

const profile={name:"thomas",age:22};

server.get("/",(req: Request,res:Response)=> {
    console.log(profile.name);
    res.status(200).send("hello world");
});

server.get("/profile",(req:Request,res:Response)=>{
    res.status(200).send(profile);
    console.log(profile);
})

server.get

server.listen(3000,()=>{
    console.log("server listening to 3000");
});