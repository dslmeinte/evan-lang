module.exports = function(config) {
	const files = "src/test/browser/**/*.ts*";

	config.set({
		basePath: "",
		frameworks: [ "browserify", "tap" ],
		files: [ files ],
		preprocessors: {
			[files]: [ "browserify" ]
		},
		browserify: {
			transform: [
				[ "brfs" ],
				[ "babelify", { presets: [ "airbnb" ] } ]
			],
			plugin: [
				[ "tsify" ]
			],
			configure: function(bundle) {
				bundle.require(require("ud/noop"), { expose: "ud" });
				bundle.on("prebundle", function() {
					bundle.external("react/addons");
					bundle.external("react/lib/ReactContext");
					bundle.external("react/lib/ExecutionEnvironment");
				});
			}
		},
		reporters: ["tap-pretty"],
		tapReporter: {
			prettifier: "tap-diff",
			separator: true
		},
		port: 9876,
		colors: true,
		logLevel: config.LOG_DEBUG,
		autoWatch: process.env.WATCH === "true",
		browserConsoleLogOptions: {
			level: "error",
			format: "%b %T: %m",
			terminal: false
		},
		browsers: process.env.CI === "true"
			? [ "Chrome" ]
			: [ "jsdom" ],
		singleRun: !(process.env.WATCH === "true")
	});
}
