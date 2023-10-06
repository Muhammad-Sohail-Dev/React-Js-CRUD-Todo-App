// Importing necessary hooks and styles
import { useState, useRef } from "react";
import "./todoapp.css";

const TodoApp = () => {
  // Creating references and initializing state variables
  const ref = useRef(null);
  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [deleteConfirmationId, setDeleteConfirmationId] = useState(null);

  // Setting initial styles for delete confirmation
  const [deleteColor, setDeleteColor] = useState({
    color: "red",
    fontWeight: "bold",
    textDecoration: "underline",
  });


  // Handling changes in the input field
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== "" && editId !== null) {
      // Updating user information
      const updateuser = todo.map((user) => {
        return user.id === editId ? { ...user, input } : user;
      });
      setTodo(updateuser);
      setEditId(null);
      setInput("");
    } else if (input.trim() === "") {
      alert("Input field is empty");
    } else {
      // Adding a new user
      const addUser = { id: todo.length + 1, input };
      setTodo([...todo, addUser]);
      setInput("");
    }
  };

  // Deleting a user or confirming deletion
  const deleteUser = (id) => {
    if (deleteConfirmationId === id) {
      // Deleting a user
      const deleteuser = todo.filter((user) => user.id !== id);
      setTodo(deleteuser);
      setInput("");
      setEditId(null);
      setDeleteConfirmationId(null);
    } else {
      // Confirming deletion
      setDeleteConfirmationId(id);
      setDeleteColor(deleteColor);
    }
  };

  // Editing a user's information
  const editUser = (user) => {
    setInput(user.input);
    setEditId(user.id);
    setDeleteConfirmationId(null);
    ref.current.focus();
  };

  return (
    <>
      <div className="todo_container">
        <div className="todo_heading">
          <h1>React Js CRUD Todo App</h1>
        </div>
        <div className="todo_search">
          <form>
            {/* Input field for adding or updating user */}
            <input
              type="text"
              placeholder="Add User..."
              value={input}
              onChange={handleChange}
              ref={ref}
            />
            <button onClick={handleSubmit}>
              {editId !== null ? "Update User" : "Add User"}
            </button>
          </form>
        </div>
        <div className="todo_results">
          <div className="users">
            <h2>Users</h2>
            <p>Actions</p>
          </div>
          {/* Mapping over the list of users */}
          {todo.map((user) => {
            return (
              <div className="user" key={user.id}>
                <ul>
                  {deleteConfirmationId === user.id ? (
                    <>
                      {/* User name with delete confirmation */}
                      <li
                        style={{
                          color: deleteColor.color,
                          fontWeight: deleteColor.fontWeight,
                          textDecoration: deleteColor.textDecoration,
                        }}
                      >
                        {user.input}
                      </li>
                      <div className="todo_buttons">
                        {/* Confirming delete or cancel */}
                        <button onClick={() => deleteUser(user.id)}>
                          Are you Sure?
                        </button>
                        <button onClick={() => setDeleteConfirmationId(null)}>
                          No
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* User name with delete and edit buttons */}
                      <li>{user.input}</li>
                      <div className="todo_buttons">
                        <button onClick={() => deleteUser(user.id)}>
                          Delete User
                        </button>
                        <button onClick={() => editUser(user)}>
                          Edit User
                        </button>
                      </div>
                    </>
                  )}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TodoApp;
