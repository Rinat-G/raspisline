import Axios from "axios";

const ajax = (url, payload, method = 'get', params = {}) => {
    return Axios({
        method: method,
        url: url,
        data: payload,
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        params
    })
}

export default ajax;