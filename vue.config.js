module.exports = {
	devServer: {
		compress: true,
		proxy: {
			"^/api": {
				target: "https://apiupass.com",
				changeOrigin: true,
				logLevel: "debug",
			},
		},
		disableHostCheck: true,
		allowedHosts: ["https://www.kyonggiupass.com"],
	},
}
