import React, { useState,useEffect } from 'react'
import './App.css'

const App = () => {

   const[task,setTask]=useState("");
  const[tasks,setTasks]=useState([]);
  const[editIndex,setEditIndex]=useState(null);
  const[filter,setFilter]=useState("all");
  const[loading,setLoading]=useState(true);


  useEffect(()=>{
    const fetchTasks=async()=>{
     try{ const response=await fetch("http://localhost:5000/tasks");
       if (!response.ok) {
        throw new Error("Failed to load tasks");
      }
      
      const data= await response.json();
      setTasks(data);
    }catch (error) {
      console.error("Fetch error:", error);
      alert(error.message);

    } finally {
      setLoading(false);
    }
  };
    fetchTasks();
  },[]);


  
  const addTask=async()=>{
      if (task.trim() === "") return;
try{
    if(editIndex!=null){
      const taskToEdit=tasks[editIndex];
      const response=await fetch(
        `http://localhost:5000/tasks/${taskToEdit._id}`,
        {
          method:"PATCH",
          headers:{
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
        title: task,
        completed: taskToEdit.completed
      })
        }
      );

      if(!response.ok){
        throw new error("Failed to update task");
      }

      const updatedTask = await response.json();

  setTasks(
    tasks.map((taskItem) =>
      taskItem._id === taskToEdit._id ? updatedTask : taskItem
    )
  );

      setEditIndex(null);
      setTask("");
      return;
    }


    const response = await fetch("http://localhost:5000/tasks", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    title: task,
    completed: false
  })
});
if (!response.ok) {
      throw new Error("Failed to add task");
    }

const savedTask = await response.json();

setTasks([...tasks, savedTask]);
setTask("");
  } catch(error){
    console.error("Error:",error);
    alert(error.message);
  }
};

  const deleteTask=async(id)=>{
    try{
    const response= await fetch(`http://localhost:5000/tasks/${id}`,{
      method:"DELETE"
     });

     if(!response.ok){
      throw new Error("Failed to delete task");
     }
     setTasks(tasks.filter((task)=> task._id !== id));
  }catch(error){
    console.error("Delete error:",error);
    alert(error.message);
  }
};

  const toggleTask=async(id,completed)=>{
   try{const response=await fetch(`http://localhost:5000/tasks/${id}`,{
      method:"PATCH",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        completed: !completed
      })
    });

     if (!response.ok) {
      throw new Error("Failed to update task");
    }
   const updatedTask=await response.json();

   setTasks(
    tasks.map((task)=>
    task._id===id? updatedTask:task)
   );
  
  }catch (error) {
    console.error("Update error:", error);
    alert(error.message);
  }
};
  
  const editTask=(index)=>{
    setEditIndex(index);
    setTask(tasks[index].title);
  };
 

  const filteredtasks=tasks.filter((task)=>{
    if(filter==="active"){
      return !task.completed;
    }
    if(filter==="completed"){
      return task.completed;
    }
    return true;
  })
  return (
    <div className='app'>
      <h1>Task Manager</h1>
      <div className='task-input'>
      <input type="text" 
      placeholder="Enter a task"
       value={task}
      onChange={(e) => setTask(e.target.value)}/>
      <button onClick={addTask}> 
        { editIndex !== null? "Update Task":"Add Task"}
      </button>
      </div>
     <div className="filters">
  <button
    className={filter === "all" ? "active-filter" : ""}
    onClick={() => setFilter("all")}
  >
    All
  </button>

  <button
    className={filter === "active" ? "active-filter" : ""}
    onClick={() => setFilter("active")}
  >
    Active
  </button>

  <button
    className={filter === "completed" ? "active-filter" : ""}
    onClick={() => setFilter("completed")}
  >
    Completed
  </button>
  <p className="task-count">
    {tasks.length}{tasks.length===1 ? "task":"tasks"}.{" "}
    {tasks.filter((task)=> task.completed).length}completed
  </p>
</div>
      <div>
       {loading ? (
  <p className="message">Loading tasks...</p>
) : filteredtasks.length === 0 ? (
  <p className="message">No tasks found.</p>
) : (
         filteredtasks.map((task,index)=>(
        <div className="task" key={task._id}>
          <span className={task.completed ? "completed":""}>
            {task.title}</span>
         <button onClick={() => deleteTask(task._id)}>Delete</button>
         <button onClick={() => toggleTask(task._id,task.completed)}>
          {task.completed ? "Undo":"Complete"}</button>
          <button onClick={() => editTask(index)}>Edit</button>
          </div>
         ))
        )}
     
    </div>
    </div>
  )
}

export default App
