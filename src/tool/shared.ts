// 공통 함수
const shared = {
	// 로그인 유효성 검사 함수
	checkGoogleLogin(gAuth) {
		setTimeout(() => {
			if (gAuth.instance.currentUser.get().isSignedIn() === false) localStorage.removeItem("key")
		}, 2000)
	},
	// 다크모드 체크 함수
	checkDarkMode() {
		if (JSON.parse(localStorage.getItem("DarkMode")) == true) {
			return true
		} else return false
	},
	// 관리자 모드 체크 함수
	checkAdminMode() {
		if (JSON.parse(localStorage.getItem("AdminMode")) == true) {
			return true
		} else return false
	},
}

export default shared
