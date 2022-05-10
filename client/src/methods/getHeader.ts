

export const getHeader = (userId:string, token:string) => ({Authorization: `Bearer ${userId} ${token}`})
