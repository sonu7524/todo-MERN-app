import React, { useState } from "react";
import "./styles.css";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import axios from "axios";

export default function TodoCard({todo, setSelectedTodo, setIsDeleteIconClicked}) {
    let[isHovered, setIsHovered] = useState(false);
    const handleDelete = () => {
        const auth_token = sessionStorage.getItem("auth_token");
        const response = axios.delete("https://todolist-mern-x95t.onrender.com/api/todo/delete/"+todo._id, {
            headers: {
                "Authorization": `Bearer ${auth_token}`
            }
        });

        if(response.data) {
            setIsDeleteIconClicked(true);
        }
    }
    return (
        <div className="todo-card" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div className="card-content">
                <div className="card-details">
                    <p className="card-title">{todo.title}</p>
                    <p className="card-description">{todo.description}</p>
                </div>
                {todo.status === "PENDING" ? <PendingIcon sx={{color: "red"}} /> : todo.status === "IN_PROGRESS" ? <AutorenewIcon sx={{color: "orange"}} /> : <CheckCircleIcon sx={{color: "green"}} />}
            </div>
            
            <div className="card-footer">
                <div className="card-file">
                    <FileUploadOutlinedIcon />
                    <p>{todo.files.length}</p>
                </div>
                <div className="card-modification">
                    <div onClick={() => setSelectedTodo(todo)}>
                        <EditNoteOutlinedIcon />
                    </div>
                    <div onClick={handleDelete}>
                        <DeleteRoundedIcon />
                    </div>
                </div>
            </div>
        </div>
    )
}