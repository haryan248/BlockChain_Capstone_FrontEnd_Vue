module.exports = {
	devServer: {
		compress: true,
		// proxy: {
		// 	"^/api": {
		// 		target: "http://101.101.218.36:8000",
		// 		changeOrigin: true,
		// 		logLevel: "debug",
		// 	},
		// },
		disableHostCheck: true,
		allowedHosts: ["http://www.kyonggiupass.com:8080/"],
	},
}
