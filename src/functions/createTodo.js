import axios from "axios";

export const createTodo = async (formData) => {
    try{
        const auth_token = sessionStorage.getItem("auth_token");
        const response = await axios.post("https://todolist-mern-x95t.onrender.com/api/todo/create", formData , {
            headers: {
                "Authorization": `Bearer ${auth_token}`,
                "Content-Type": "multipart/form-data",
            }
        });

        if(response.data.message) {
            console.log(response.data.message);
            return response.data.message;
        }
        else {
            console.log(response.data.error);
            return response.data.error;
        }
    }
    catch(error){
        console.error(error);
    }
}