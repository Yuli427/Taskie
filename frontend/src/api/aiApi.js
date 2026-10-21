import axios from "axios";

const BASE_URL = "https://stake-meeting-enemies-purple.trycloudflare.com/api/ai";

export const generateTodo = async (prompt) => {

    const token = localStorage.getItem("accessToken");

    const response = await axios.post(
        `${BASE_URL}/generate-todo`,
        {
            prompt: prompt
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};