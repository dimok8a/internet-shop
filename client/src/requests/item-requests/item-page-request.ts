import {BASE_URL} from "../../constants/baseUrl";

export const itemPageRequest = (clothe:string|undefined) => `${BASE_URL}/api/clothes/getClothe/${clothe}`;
