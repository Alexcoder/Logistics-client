

const auth = (auth={Loading:false, error:false, welcome:"",prompt:"", authData:null}, action)=>{
    switch (action.type){
    case "START_LOADING":
    return {
        ...auth,
        Loading: true
    }
    case "END_LOADING":
    return {
        ...auth,
        Loading: false
    }
    case "SIGNIN":
    return {
        ...auth,
        authData: action.payload
    }
    case "REGISTER":
    return {
        ...auth,
        authData: action.payload
    }
    case "WELCOME":
    return {
        ...auth,
        welcome: action.payload
    }
    case "LOGGED_IN_PROMPT":
    return {
        ...auth,
        prompt: action.payload
    }
    case "ERROR":
    return {
        ...auth,
        error: action.payload
    }

    default:
        return auth;
}
}

export default auth;