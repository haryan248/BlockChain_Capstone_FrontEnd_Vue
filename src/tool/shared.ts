// 공통 함수
const shared = {
	// 로그인 유효성 검사 함수
	checkGoogleLogin(gAuth) {
		// 프로필 클릭 시 변경사항 있는지 체크 함수
		if (JSON.parse(sessionStorage.getItem("checkGoogleProfile")) === true) {
			setTimeout(() => {
				let GoogleUser = gAuth.instance.currentUser.get()
				const profile = GoogleUser.getBasicProfile()
				const email = profile.getEmail()
				let newMembers = {
					name: "",
					email: "",
					studentId: "",
					major: "",
					userImage: "",
				}
				let oldMembers = JSON.parse(localStorage.getItem("members"))
				newMembers.name = profile.getName()
				newMembers.email = email
				newMembers.studentId = oldMembers.studentId
				newMembers.major = oldMembers.major
				newMembers.userImage = profile.getImageUrl()

				let upadateMembers = JSON.stringify(newMembers)
				JSON.stringify(localStorage.setItem("members", upadateMembers))
				sessionStorage.removeItem("checkGoogleProfile")
			}, 2000)
		}
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
