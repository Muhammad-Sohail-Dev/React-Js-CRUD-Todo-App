import  { useState,useRef } from 'react';
import './todoapp.css';

const TodoList2 = () => {
const ref = useRef(null)
const [todo , setTodo] = useState([]);
const [input , setInput] = useState('');
const [editId , setEditId] = useState(null);
const [deleteConfirmationId, setDeleteConfirmationId] = useState(null);
const [deleteColor , setDeleteColor] = useState({
  color : 'red',
  fontweight : 'bold',
  textdecoration : 'underline'
});
const handleChange = (e) => {
  setInput(e.target.value);
}
const handleSubmit = (e) => {
  e.preventDefault()
  if(input.trim() !== '' && editId !== null){
    const updateuser = todo.map((user) => {
      return user.id === editId ? {...user , input} : user
    });
    setTodo(updateuser)
    setEditId(null)
    setInput('')
  }else if(input.trim() === ''){
    alert('input feild is empty')
  }
  else{
    const addUser = {id : todo.length + 1 , input}
    setTodo([...todo , addUser]);
    setInput('');
  }
}

const deleteUser = (id) => {
  if(deleteConfirmationId === id){
    const deleteuser = todo.filter((user) => user.id !== id);
    setTodo(deleteuser);
    setInput('')
    setEditId(null)
    setDeleteConfirmationId(null)
  }else{
    setDeleteConfirmationId(id)
    setDeleteColor(deleteColor)
  }
 
}

const editUser = (user) => {
  setInput(user.input);
  setEditId(user.id)
  setDeleteConfirmationId(null)
  ref.current.focus();
}
  return (
    <>
    <div className="todo_container">
      <div className="todo_heading">
        <h1>React Js CRUD Todo List App</h1>
      </div>
      <div className="todo_search">
     <form>
     <input type="text" placeholder='Add User...' value={input} onChange={handleChange} ref={ref}/>
      <button onClick={handleSubmit}>{editId !== null ? 'UpdateUser' : 'AddUser'}</button>
     </form>
      </div>
      <div className="todo_results">
      <div className="users">
        <h2>users</h2>
        <p>actions</p>
      </div>
      {todo.map((user) => {
        return(
          <div className="user" key={user.id}>
            <ul>
            {deleteConfirmationId === user.id ? (
              <>
                <li style={{color: deleteColor.color , fontWeight : deleteColor.fontweight, textDecoration : deleteColor.textdecoration}}>{user.input}</li>
               <div className="todo_buttons">
               <button onClick={() => deleteUser(user.id)}>are you Sure?</button>
                <button onClick={() => setDeleteConfirmationId(null)}>No</button>
               </div>
              </>
            ) : (
              <>
              <li>{user.input}</li>
              <div className="todo_buttons">
              <button onClick={() => deleteUser(user.id)}>DeleteUser</button>
              <button onClick={() => editUser(user)}>EditUser</button>
                  </div>
                  </>             
            )
             }
            </ul>
          </div>
        )
      })}
      </div>
    </div>
    </>
  )
}

export default TodoList2