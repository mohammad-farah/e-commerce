interface WarningResponse {
    status : string,
    message : string
}

interface SuccessResponse {
    status : string,
    message : string,
    data : any[]
}

export const raiseWarning = (  messeage : string ) : WarningResponse => {
    return { status : 'failed', message : messeage }
}


export const raiseSuccess = ( message: string , data : any ) : SuccessResponse => {
    return { status : 'success' , message : message, data : data }
}
