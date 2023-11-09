import axios from "axios";
export const getAllTodos = async (userId) => {
    const auth_token = sessionStorage.getItem("auth_token");
    try{
        const response = await axios.get("https://todolist-mern-x95t.onrender.com/api/todo/read/" + userId+"/all", {
            headers: {
                "Authorization": `Bearer ${auth_token}` // Add the auth_token
            }
        });
        return response.data;
    }
    catch(error){
        console.error(error);
    }
}