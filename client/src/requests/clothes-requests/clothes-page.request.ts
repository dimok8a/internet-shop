import {BASE_URL} from "../../constants/baseUrl";

export const clothesPageRequest = (clotheType:string) => `${BASE_URL}/api/clothes${clotheType}`
