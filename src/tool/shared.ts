const shared = {
	checkGoogleLogin(gAuth) {
		setTimeout(() => {
			// console.log(gAuth.instance.currentUser.get().isSignedIn())
			if (gAuth.instance.currentUser.get().isSignedIn() === false) localStorage.removeItem("key")
		}, 2000)
	},
	checkDarkMode() {
		if (JSON.parse(localStorage.getItem("DarkMode")) == true) {
			return true
		} else return false
	},
	checkAdminMode() {
		if (JSON.parse(localStorage.getItem("AdminMode")) == true) {
			return true
		} else return false
	},
}

export default shared
