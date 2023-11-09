import axios from "axios";

export const updateTodo = async (formData, todoId) => {
    try{
        const auth_token = sessionStorage.getItem("auth_token");
        const response = await axios.put("https://todolist-mern-x95t.onrender.com/api/todo/update/"+todoId, formData, {
            headers: {
                "Authorization": `Bearer ${auth_token}`,
                "Content-Type": "multipart/form-data",
            }
        });
        return response.data;
    }
    catch(error){
        console.error(error);
    }
}