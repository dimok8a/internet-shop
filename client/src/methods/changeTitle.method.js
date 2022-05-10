import {EUrl} from "../enums";
export const changeTitle = (pathName) => {
    for (let key in EUrl) {
        if (EUrl[key].url === pathName){
            document.title = EUrl[key].text;
        }
    }
}