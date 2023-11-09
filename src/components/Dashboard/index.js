import React, { useState, useEffect } from "react";
import ButtonComponent from "../common/Button";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import "./styles.css";
import TodoCard from "../common/Card";
import { getAllTodos } from "../../functions/getAllTodos";
import Loader from "../common/Loader";
import EditTodo from "../Todo/EditTodo";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CreateTodo from "../Todo/CreateTodo";
import {updateTodoStatus} from "../../functions/updateTodoStatus";

export default function Dashboard() {
    let [todos, setTodos] = useState([]);
    let [pendingTodos, setPendingTodos] = useState([]);
    let [inProgressTodos, setInProgressTodos] = useState([]);
    let [completedTodos, setCompletedTodos] = useState([]);
    let [isLoading, setIsLoading] = useState(true);
    let [selectedTodo, setSelectedTodo] = useState(null);
    let [isCreateBtnClicked, setIsCreateBtnClicked] = useState(false);
    let [isDeleteIconClicked, setIsDeleteIconClicked] = useState(false);

    useEffect(() => {
        getData();
    }, [pendingTodos, inProgressTodos, completedTodos, isDeleteIconClicked, todos]);
    async function getData() {
        const userId = sessionStorage.getItem("user_id");
        const todosData = await getAllTodos(userId);
        if(todosData){
            setTodos(todosData);
            setPendingTodos(todosData.filter((todo) => todo.status === "PENDING"));
            setInProgressTodos(todosData.filter((todo) => todo.status === "IN_PROGRESS"));
            setCompletedTodos(todosData.filter((todo) => todo.status === "COMPLETED"));
            setIsLoading(false);
        }
    }

    const onDrop = async (todoId, newStatus) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo._id === todoId
                    ? { ...todo, status: newStatus }
                    : todo
            )
        );

        await updateTodoStatus(todoId, newStatus);
    };
    const handleDrop = (e, status) => {
        e.preventDefault();
        const todoId = e.dataTransfer.getData("todoId");
        console.log(todoId);
        console.log(status);
        onDrop(todoId, status);
      };
    return (
        <div className="dashboard">
            <div className={selectedTodo || isCreateBtnClicked ? "blurred-background" : "dashboard-background"}>
                <div className="dashboard-title">
                    <h1>TODO LIST</h1>
                    <div onClick={() => setIsCreateBtnClicked(true)}>
                        <ButtonComponent text={"Add Todo"} bgColor={"black"} icon={<AddRoundedIcon />} isOutline={false} />
                    </div>
                </div>
                <div className="dashboard-content">
                    {isLoading ? (
                        <Loader />
                    ): (
                        <div className="category" onDrop={onDrop}>
                            <div className="pending"  onDrop={(e) => handleDrop(e, "PENDING")} onDragOver={(e) => e.preventDefault()}>
                                <h2 className="pending-title">PENDING</h2>
                                {pendingTodos.map((todo) => (
                                    <div 
                                    key={todo._id} 
                                    draggable
                                    onDragOver={(e) => e.preventDefault()} onDragStart={(e) => e.dataTransfer.setData("todoId", todo._id)} 
                                >
                                        <TodoCard todo={todo} setSelectedTodo={setSelectedTodo} setIsDeleteIconClicked={setIsDeleteIconClicked} />
                                    </div>
                                ))}
                            </div>
                            <div className="in-progress" onDrop={(e) => handleDrop(e, "IN_PROGRESS")} onDragOver={(e) => e.preventDefault()}>
                                <h2 className="in-progress-title">IN PROGRESS</h2>
                                {inProgressTodos.map((todo) => (
                                    <div 
                                    key={todo._id} 
                                    draggable
                                    onDragOver={(e) => e.preventDefault()} onDragStart={(e) => e.dataTransfer.setData("todoId", todo._id)}  
                                >
                                        <TodoCard todo={todo} setSelectedTodo={setSelectedTodo} setIsDeleteIconClicked={setIsDeleteIconClicked} />
                                    </div>
                                ))}
                            </div>
                            <div className="completed" onDrop={(e) => handleDrop(e, "COMPLETED")} onDragOver={(e) => e.preventDefault()}>
                                <h2 className="completed-title">COMPLETED</h2>
                                {completedTodos.map((todo) => (
                                    <div 
                                        key={todo._id} 
                                        draggable
                                        onDragOver={(e) => e.preventDefault()} onDragStart={(e) => e.dataTransfer.setData("todoId", todo._id)}  
                                    >
                                        <TodoCard todo={todo} setSelectedTodo={setSelectedTodo} setIsDeleteIconClicked={setIsDeleteIconClicked} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {selectedTodo && (
                <div className="edit-page">
                    <div className="edit-page-content">
                        <EditTodo todo={selectedTodo} />
                        <CancelOutlinedIcon className="cancel-icon" onClick={() => {
                            setSelectedTodo(null);
                        }}  
                        />
                    </div>
                </div>
            )}

            {isCreateBtnClicked && (
                <div className="edit-page">
                    <div className="edit-page-content">
                        <CreateTodo />
                        <CancelOutlinedIcon className="cancel-icon" onClick={() => {
                            setIsCreateBtnClicked(false);
                        }}  
                        />
                    </div>
                </div>
            )}
        </div>
    )
}