import cookie from 'js-cookie'

export const setCookie = (key,value) => {
    if(window !== 'undefiend'){
        cookie.set(key,value,{
            expires:1
        })
    }
}


export const removeCookie = (key) => {
    if(window !== 'undefiend'){
        cookie.remove(key,{
            expires:1
        })
    }
}

export const getCookie = (key) => {
    if(window !== 'undefiend'){
        return cookie.get(key)
    }
}

export const setLocalStorage = (key,value) => {
    if(window !== 'undefiend'){
        localStorage.setItem(key,JSON.stringify(value))
    }
}


export const removeLocalStorage = (key) => {
    if(window !== 'undefiend'){
        localStorage.removeItem(key)
    }
}

export const authenticate = (response, next) => {
    setCookie('token',response.data.token)
    setLocalStorage('user',response.data.user)
    next()
}

export const signout = () => {
    removeCookie('token')
    removeLocalStorage('user')
    window.location.replace("/");
}

export const isAuth = () =>{
    if(window !== 'undefiend'){
        const cookieCheck = getCookie('token')
        if (cookieCheck){
            if(localStorage.getItem('user')){
                return JSON.parse(localStorage.getItem('user'))
            }else{
                return false
            }
        }
    }
}
export const updateUser = (response ,next) => {
    if(window !== 'undefiend'){
    let auth =  JSON.parse(localStorage.getItem('user'))
    auth = response.data
    localStorage.setLocalStorage('user',JSON.stringify(auth))
    }
    next()
}
