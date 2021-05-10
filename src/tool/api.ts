import axios from "axios"
import * as querystring from "querystring"

const setCommonParams = (params) => {
	params.key = localStorage.getItem("key")
}

const api = {
	get: async function(endpoint, params) {
		setCommonParams(params)
		const response = await axios.get(`${endpoint}`, { params })

		return response.data
	},

	post: async function(endpoint, params) {
		setCommonParams(params)
		const headers = {
			"Content-Type": "application/x-www-form-urlencoded",
		}
		const response = await axios.post(`${endpoint}`, querystring.stringify(params), { headers })

		return response.data
	},
}

export default api
