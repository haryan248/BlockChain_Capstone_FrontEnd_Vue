import axios from "axios";
import * as querystring from "querystring";

const hostId = window.location.hostname.split(".")[0];
console.log(hostId)
let server = "https://vod-bapi.tutoring.co.kr";
let appServer = "https://dev-api.tutoring.co.kr";
if (hostId == "ke-app" || hostId == "dev-app" || hostId == "joyte-app") {
    server = "https://vod-bapi.tutoring.co.kr";
    appServer = "https://dev-api.tutoring.co.kr";
} else if (hostId == "st-app" || hostId == "hot-app" || hostId == "remon-app") {
    server = "https://st-bapi.tutoring.co.kr";
    appServer = "https://st-api.tutoring.co.kr";
} else if (hostId == "app") {
    server = "https://bapi.tutoring.co.kr";
    appServer = "https://api.tutoring.co.kr";
} else {
    if (hostId == "localhost") { // local api 붙여서 local front 테스트할 경우
        server = "http://localhost";
    } else { // dev api 붙여서 local front 테스트 할 경우
        server = "https://vod-bapi.tutoring.co.kr";
    }
    appServer = "https://dev-api.tutoring.co.kr";
}


const setCommonParams = (params) => {
    params.key = localStorage.getItem('key')
}

const api = {
    get: async function (endpoint, params) {
        setCommonParams(params)
        const response = await axios.get(`${server}${endpoint}`, { params });

        return response.data;
    },

    post: async function (endpoint, params) {
        setCommonParams(params)
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        };
        const response = await axios.post(`${server}${endpoint}`, querystring.stringify(params), { headers });

        return response.data;
    },

    appPost: async function (endpoint, params) {
        setCommonParams(params)
        const headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
        };
        const response = await axios.post(`${appServer}${endpoint}`, querystring.stringify(params), { headers });

        return response.data;
    },

    put: async function (endpoint, params) {
        setCommonParams(params)
        const response = await axios.put(`${server}${endpoint}`, params);

        return response.data;
    },

    delete: async function (endpoint, params) {
        setCommonParams(params)
        const response = await axios.delete(`${server}${endpoint}`, { data: params });

        return response.data;
    }

}


export default api;