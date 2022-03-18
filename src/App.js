import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';




const URL = 'http://localhost/phprepo/';


function App() {
  const [item,setItem] = useState('');
  const [count,setCount] = useState('');
  const [tasks,setTasks] = useState([]);

useEffect(() => {
  axios.get(URL)
  .then((response) => {
    //console.log(response.data);
    setTasks(response.data);
  }).catch(error =>{
    alert(error.response ? error.response.data.error : error);
});
}, [])

function save(e){
  e.preventDefault();
  const json = JSON.stringify({description:item, amount:count});
  axios.post(URL + 'add.php',json, {
    headers: {
      'Content-Type' : 'application/json'
    }
  })
  .then((response)=>{
    setTasks(tasks => [...tasks,response.data]);
    setItem('');
    setCount('');
  }).catch(error=>{
    alert(error.response ? error.response.data.error : error);
  })
}

function remove(id){
  const json = JSON.stringify({id:id});
  axios.post(URL + 'delete.php',json, {
    headers: {
      'Content-Type' : 'application/json'
    }
  })
  .then((response)=>{
    const newListWithoutRemoved = tasks.filter((item) => item.id !== id);
    setTasks(newListWithoutRemoved);
  }).catch(error=>{
    alert(error.response ? error.response.data.error : error);
  })
}

  return (
    <div>
      <h2>Shoppinglist</h2>
      <form onSubmit={save}>
      <label>New Item</label>
      <input value={item} placeholder='Add a new item' onChange={e => setItem(e.target.value)}/>
      <input value={count} placeholder='Add amount' onChange={e => setCount(e.target.value)}/>
      <button>Add</button>
    </form>
      <ol>
        {tasks?.map(task =>(
          <li key={task.id}>{task.description} {task.amount}&nbsp;
          <a href="#" className="delete" onClick={() => remove(task.id)}>
            Delete
          </a>
          </li>
          
        ))}
      </ol>
    </div>
  );
}

export default App;
