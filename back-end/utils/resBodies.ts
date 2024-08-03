export const creatingFailureBody = (  messeage : string ) => {
    return { status : 'failed', message : messeage }
}


export const creatingSuccessBody = ( message: string , data : any ) => {
    return { status : 'success' , message : message, data : data }
}
