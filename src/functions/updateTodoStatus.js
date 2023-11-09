import axios from "axios";

export const updateTodoStatus = async (todoId, newStatus) => {
    try{
        const auth_token = sessionStorage.getItem("auth_token");
        const response = await axios.patch("https://todolist-mern-x95t.onrender.com/api/todo/update/"+todoId, {status: newStatus}, {
            headers: {
                "Authorization": `Bearer ${auth_token}`
            }
        });

        if(response.data.message) {
            console.log(response.data.message);
        }
        else {
            console.log(response.data.error);
        }
    }
    catch(error){
        console.error(error);
    }
}