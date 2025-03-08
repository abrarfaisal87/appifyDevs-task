import { useOutletContext } from "react-router-dom"

export const useChatSessions = ()=>{
    return useOutletContext();
}