import {BASE_URL} from "../../constants/baseUrl";

export const cartRequest = (clothe:string|undefined) => `${BASE_URL}/api/cart/${clothe}`;
