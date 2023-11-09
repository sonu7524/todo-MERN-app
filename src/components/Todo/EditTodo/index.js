import React, { useState } from "react";
import "./styles.css";
import ButtonComponent from "../../common/Button";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import FileCopyRoundedIcon from '@mui/icons-material/FileCopyRounded';
import { updateTodo } from "../../../functions/updateTodo";
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';


export default function EditTodo({todo}) { 
    let[title,setTitle] = useState(todo.title);
    let[description,setDescription] = useState(todo.description);
    let[dueDate,setDueDate] = useState(todo.dueDate);
    let[priority,setPriority] = useState(todo.priority);
    let[status,setStatus] = useState(todo.status);
    let[selectedFiles,setSelectedFiles] = useState(todo.files);
    let[message,setMessage] = useState("");
    let[messageColor,setMessageColor] = useState("");

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files);
    }

    const handleNewTodo = async () => {
        const userId = sessionStorage.getItem("user_id");
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("dueDate", dueDate);
        formData.append("priority", priority);
        formData.append("status", status);
        formData.append("userId", userId);
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append("files", selectedFiles[i]);
        }
        const response = await updateTodo(formData, todo._id);

        if(response.todo) {
            setMessage("Todo edited successfully");
            setMessageColor("green");
        }
        else {
            setMessage(response.error);
            setMessageColor("red");
        }
    }
    return (
        <div className="edit-todo-form">
                <form className="form-todo">
                    <h1>Edit To-do Task</h1>
                    <p style={{color: messageColor}} className="message">{message}</p>
                    <input className="todo-title" value={title} onChange={(e)=>setTitle(e.target.value)} type="text" placeholder="Title" required />
                    <input className="todo-description" value={description} onChange={(e)=>setDescription(e.target.value)} type="text" placeholder="Description" required />
                    <input
                        className="todo-due-date"
                        onChange={(e) => setDueDate(e.target.value)}
                        type="date"
                        placeholder="Due Date"
                        required
                        value={dueDate ? new Date(dueDate).toISOString().split('T')[0] : ''}
                    />
                    <select className="todo-priority" value={priority} onChange={(e)=>setPriority(e.target.value)} type="select" placeholder="Priority" >
                        <option value="" disabled selected>Select Priority</option>
                        <option value="LOW">Low</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HIGH">High</option>
                    </select>
                    <select value={status} className="todo-status" onChange={(e)=>setStatus(e.target.value)} type="select" placeholder="Status" >
                        <option value="" disabled selected>Select Status</option>
                        <option value="PENDING">Pending</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="COMPLETED">Completed</option>
                    </select>
                    <label class="custum-file-upload">
                        <div class="text">
                            <span>Click to Upload Files</span>
                        </div>
                        <input onChange={handleFileChange} multiple type="file" id="file"/>
                    </label>
                    <div className="selected-files">
                        {selectedFiles.map((file) => (
                            <div className="selected-file" key={file.name}>
                                <FileCopyRoundedIcon />
                                <p>{file.name}</p>
                            </div>
                        ))}
                    </div>
                    <div  onClick={handleNewTodo} className="create-btn"><ButtonComponent  text="Edit" bgColor={"black"} icon={<EditNoteOutlinedIcon />} isOutline={false} /></div>
                </form>
            </div>
    )
}
