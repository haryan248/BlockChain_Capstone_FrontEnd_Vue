module.exports = {
	devServer: {
		compress: true,
		proxy: {
			"^/members": {
				target: "https://101.101.218.36:8000",
				changeOrigin: true,
				logLevel: "debug",
			},
		},
		disableHostCheck: true,
		allowedHosts: ["http://localhost:8080"],
		allowedHosts: ["https://www.kyonggiupass.com"],
	},
}
