require ("dotenv").config();
const express= require ("express");
const  mongoose  = require("mongoose");

const Task=require("./models/Task");
const cors=require("cors");
const app=express();
app.use(cors());

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDB connected")
})
.catch((err)=>{
    console.log("mongoDB connection error:",err)
});

app.get("/",(req,res)=>{
    res.send("task Manager backend running");
});

app.get("/tasks",async(req,res)=>{
    try{
        const tasks=await Task.find();

        res.json(tasks);
    } catch(error){
        res.status(500).json({message:error.message});
    }
});

app.post("/tasks",async(req,res)=>{
   try{
    const newTask= new Task({
        title:req.body.title,
        completed:req.body.completed,
    });
    const savedTask = await newTask.save();

    res.json(savedTask);
   } catch(error){
    res.status(500).json({message:error.message});
   }
});


app.delete("/tasks/:id",async(req,res)=>{
    try{
                console.log("Deleting ID:", req.params.id);

        const deletedTask= await Task.findByIdAndDelete(req.params.id);
        res.json(deletedTask);
    } catch(error){
        res.status(500).json({message:error.message});
    }
})

app.patch("/tasks/:id",async(req,res)=>{
    try{
        const updatedTask=await Task.findByIdAndUpdate(
            req.params.id,
            {
                title:req.body.title,
                completed:req.body.completed
            },
            {new:true}
        );
        res.json(updatedTask);
    } catch(error){
        res.status(500).json({message:error.message});
    }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server started on port ${PORT}`);
});