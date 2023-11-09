import axios from "axios";
export const getUser = async () => {
    try{
        const userId = sessionStorage.getItem("user_id");
        const response = await axios.get("https://todolist-mern-x95t.onrender.com/api/auth/user/" + userId);
        return response.data;
    }
    catch(error){
        console.error(error);
    }
}