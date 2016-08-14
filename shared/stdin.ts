import {logError} from "./util";

export function withStdin(action: (json: any) => void) {
	process.stdin.setEncoding("utf8");

	let inputJson = "";
	process.stdin.on("readable", () => {
		let chunk = process.stdin.read();
		if (chunk !== null) {
			inputJson += chunk;
		}
	});

	process.stdin.on("end", () => {
		try {
			let json = JSON.parse(inputJson);
			action(json);
		} catch (e) {
			logError(e);
		}
	});
}

