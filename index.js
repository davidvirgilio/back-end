const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')
const Task = require('./models/task');
const User = require('./models/user');

const app = express();

const db = 'agatha';
const uri = "mongodb+srv://dvirgilioc:OTfpVC6QFzWe00Hd@clusteragatha.l9iwgko.mongodb.net/agatha?retryWrites=true&w=majority"; 

app.use(cors());
app.use(express.json());
app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({extended:true}));




const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
  console.log(`Server is running on http://localhost:${PORT}`);
  mongoose.connect(uri).then(
        ()=>{ console.log('Successfully connected to ' + db)},
        error => { console.log(error) }
    )
});


app.get('/tasks', async(req, res) => {
    try{
        const tasks = await Task.find({});
        res.json(tasks);
    }catch(error){
        console.error(error);
        res.status(500).json({error: "Internal Server Error"})
    }
});

app.post('/tasks', async (req, res) => {
    try {
      const newTask = new Task(req.body);
      await newTask.save();
      res.status(201).json(newTask);
    } catch(error){
        res.status(500).json({error: error.message})
    }
});

app.delete('/tasks/:taskId', async (req, res) => {
    try {
      const taskId = req.params.taskId;
      const deletedTask = await Task.findByIdAndDelete(taskId);
      
      if (!deletedTask) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      res.json(deletedTask);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  app.put('/tasks/:taskId', async (req, res) => {
    try {
      const taskId = req.params.taskId;
      const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, { new: true });
      
      if (!updatedTask) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      res.json(updatedTask);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  app.post('/tasks/:taskId/completed', async (req, res) => {
    try {
      const taskId = req.params.taskId;
      const newValue = req.body.completed;
      
      const updatedTask = await Task.findByIdAndUpdate(taskId,
        { completed: newValue}, { new: true });
        
        if (!updatedTask) {
          return res.status(404).json({ error: 'Task not found' });
        }
        
        res.json(updatedTask);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
    
    
    // User authentication

    app.get('/users', async(req, res) => {
      try{
          const users = await User.find({});
          res.json(users);
      }catch(error){
          res.status(500).json({error: error.message })
      }
  });

  app.get('/users/:userEmail', async(req,res)=>{
      try{
        const userEmail = req.params.userEmail;
        const user = await User.findOne({email : userEmail}).exec()
        res.json(user);
      }catch(error){
        res.status(500).json({error: error.message})
      }
  });
    
    app.get('/users/:userId', async (req, res) => {
      try {
        const newUser = new User(req.body);
        
        await newUser.save();
        
        res.status(201).json(newTask);
      } catch(error){
          res.status(500).json({error: error.message})
      }

    });
    