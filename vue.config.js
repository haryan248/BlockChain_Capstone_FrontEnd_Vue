const fs = require("fs")
module.exports = {
	devServer: {
		compress: true,
		proxy: {
			"^/api": {
				target: "https://apiupass.com/api",
				changeOrigin: true,
				logLevel: "debug",
			},
		},
		// https: true,
		// https: {
		// 	key: fs.readFileSync("./key/example.com+5-key.pem"),
		// 	cert: fs.readFileSync("./key/example.com+5.pem"),
		// },
		// public: "https://localhost:8080/",
		disableHostCheck: true,
		// allowedHosts: ["http://localhost:8080"],
		allowedHosts: ["https://www.kyonggiupass.com"],
	},
}
