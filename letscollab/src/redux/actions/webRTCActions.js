import { store } from "../store";

export const setLocalStream = (stream) => {
    dispatchEvent({type : 'setLocalStream' , payload : stream});
}

