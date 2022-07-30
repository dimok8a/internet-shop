import {useCallback} from "react";
import "./Message.css"

export const useMessage = () => {

    function createMessage(text) {
        const message = document.createElement('div')
        message.classList.add('message');
        message.innerText = text
        document.body.appendChild(message)
    }
    function deleteMessage() {
        document.body.removeChild(document.querySelector('.message'))
    }

    return useCallback((text)=>{
        if (text) {
            createMessage(text)
            setTimeout(() => {
                deleteMessage();
            }, 5000)
        }
    }, [])
}
