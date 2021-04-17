const hostId = window.location.hostname.split(".")[0]
let server = "https://vod-bapi.tutoring.co.kr"
if (hostId == "localhost") {
	// local api 붙여서 local front 테스트할 경우
	server = "http://localhost"
} else {
	// dev api 붙여서 local front 테스트 할 경우
	server = "https://vod-bapi.tutoring.co.kr"
}
const endpoint = {
	GOOGLELOGIN: (`${server}` + "/open/login/adminStaffByGoogle") as String,
	USERLIST: (`${server}` + "/open/login/adminStaffByGoogle") as String,
}

export default endpoint
