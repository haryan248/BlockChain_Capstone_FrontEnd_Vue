module.exports = {
	devServer: {
		proxy: {
			"^/api": {
				target: "http://101.101.218.36:8000",
				changeOrigin: true,
				logLevel: "debug",
			},
		},
		disableHostCheck: true,
	},
}
