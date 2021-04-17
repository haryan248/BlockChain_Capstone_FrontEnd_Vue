module.exports = {
	devServer: {
		proxy: {
			"^/api": {
				target: "http://101.101.218.36:8000",
				changeOrigin: true,
				logLevel: "debug",
			},
		},
		host: "0.0.0.0",
		hot: true,
		disableHostCheck: true,
	},
}
