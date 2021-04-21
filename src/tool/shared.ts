const shared = {
	checkGoogleLogin(gAuth) {
		setTimeout(() => {
			console.log(gAuth.instance.currentUser.get().isSignedIn())
			if (gAuth.instance.currentUser.get().isSignedIn() === false) localStorage.removeItem("key")
		}, 2000)
	},
}

export default shared
