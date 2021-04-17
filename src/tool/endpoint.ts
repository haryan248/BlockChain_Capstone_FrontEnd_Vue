const hostId = window.location.hostname.split(".")[0]
let server = "http://101.101.218.36:8000"
if (hostId == "localhost") {
	// local api 붙여서 local front 테스트할 경우
	server = "http://localhost"
} else {
	// dev api 붙여서 local front 테스트 할 경우
	server = "http://101.101.218.36:8000"
}
const endpoint = {
	GOOGLELOGIN: (`${server}` + "/api/members") as String,
	USERLIST: (`${server}` + "/open/login/adminStaffByGoogle") as String,
}

export default endpoint
