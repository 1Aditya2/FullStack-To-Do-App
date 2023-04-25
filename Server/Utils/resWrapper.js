const success=(statusCode,result)=>{
    return {
        status:'ok',
        statusCode,
        result
    }
}

const error=(statusCode,message)=>{
    return {
        status:'ok',
        statusCode,
        message
    }
}

module.exports={
    success,
    error
}