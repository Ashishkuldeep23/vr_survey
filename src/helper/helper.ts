


export const gettingTokenInCookieAndLocalHost = () => {

    let token: string | boolean = false;

    // let checkInCookie = document.cookie
    // let cookieInArr = checkInCookie.split("=")
    // let checkTokenPresent = cookieInArr.indexOf("token")

    // console.log({
    //     checkInCookie,
    // })

    // console.log(document.cookie)

    // if (checkTokenPresent !== -1) {
    //     token = true;
    // }


    let checkTokenInLoaclHost = localStorage.getItem("surveyToken")

    // console.log(checkTokenInLoaclHost)

    if (checkTokenInLoaclHost) {
        token = checkTokenInLoaclHost
    }

    return token
}
