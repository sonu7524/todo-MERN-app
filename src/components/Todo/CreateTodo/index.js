import React, { useState } from "react";
import "./styles.css";
import ButtonComponent from "../../common/Button";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import FileCopyRoundedIcon from '@mui/icons-material/FileCopyRounded';
import { createTodo } from "../../../functions/createTodo";

export default function CreateTodo() {
    let[title,setTitle] = useState("");
    let[description,setDescription] = useState("");
    let[dueDate,setDueDate] = useState("");
    let[priority,setPriority] = useState("LOW");
    let[status,setStatus] = useState("PENDING");
    let[selectedFiles,setSelectedFiles] = useState([]);
    let[message,setMessage] = useState("");
    let[messageColor,setMessageColor] = useState("");
        
    const handleFileChange = (e) => {
          const files = Array.from(e.target.files);
          setSelectedFiles(files);
    };

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

        console.log(formData);

        const response = await createTodo(formData);
        if(response) {
            setMessage("Todo created successfully");
            setMessageColor("green");
        }
        else {
            setMessage("Unable to create todo");
            setMessageColor("red");
        }
    }

    return (
        <div className="create-todo">
            <div className="create-todo-form">
                <form className="form-todo">
                    <h1>New To-do Task</h1>
                    <p style={{color: messageColor}} className="message">{message}</p>
                    <input className="todo-title" onChange={(e)=>setTitle(e.target.value)} type="text" placeholder="Title" required />
                    <input className="todo-description" onChange={(e)=>setDescription(e.target.value)} type="text" placeholder="Description" required />
                    <input
                        className="todo-due-date"
                        onChange={(e) => setDueDate(e.target.value)}
                        type="date"
                        placeholder="Due Date"
                        required
                        value={dueDate ? new Date(dueDate).toISOString().split('T')[0] : ''}
                    />
                    <select className="todo-priority" onChange={(e)=>setPriority(e.target.value)} type="select" placeholder="Priority" >
                        <option value="" disabled selected>Select Priority</option>
                        <option value="LOW">Low</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HIGH">High</option>
                    </select>
                    <select className="todo-status" onChange={(e)=>setStatus(e.target.value)} type="select" placeholder="Status" >
                        <option value="" disabled selected>Select Status</option>
                        <option value="PENDING">Pending</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="COMPLETED">Completed</option>
                    </select>
                    <label class="custum-file-upload" for="file">
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
                    <div onClick={handleNewTodo} className="create-btn"><ButtonComponent  text="Create" bgColor={"black"} icon={<AddRoundedIcon />} isOutline={false} /></div>
                </form>
            </div>
        </div>
    )
}