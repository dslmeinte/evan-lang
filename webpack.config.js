module.exports = {
    entry: "./ide/index.tsx",
    output: {
        path: "ide/web",
        filename: "bundle.js"
    },
	resolve: {
		extensions: ["", ".js", ".ts", ".tsx"]
	},
	module: {
		loaders: [
			{ test: /\.tsx?$/, loaders: ["ts-loader"] },
			{ test: /\.css$/, loader: "style!css" }
		]
	}
};
