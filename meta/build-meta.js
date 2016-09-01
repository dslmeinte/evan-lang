const camelCase = require("camelcase");
const fs = require("fs");
const lodash = require("lodash");


const encodingOpts = { encoding: "utf8" };

const metaModel = JSON.parse(fs.readFileSync(__dirname + "/meta-model.json", encodingOpts));

// TODO  check meta model

writeLines(generateSemanticsTypes(metaModel), "shared/semantics-types_gen.ts");
writeLines(generatePolymorphicDispatcher(metaModel), "ide/editor/polymorphic-dispatcher_gen.tsx");
mapMap(metaModel, function (typeName) {
	writeLines(generateTypeWidgetSkeleton(typeName), "ide/editor/type-widgets/" + fileName(typeName) + ".tsx_gen");
});


function generateSemanticsTypes(metaModel) {

	function generateTsProperty(propertyName, description) {
		// skip everything which has an "$sType" such as comments:
		if (!!description.$sType) {
			return [];
		}

		const tsType = !! description.ownType
			? interfaceTypeName(description.type)
			: description.type;
		const tsCompoundType = !! description.stringMap
			? "{ [name: string]: " + tsType + " }"
			: tsType;
		return [ "\t" + propertyName + (description.optional ? "?" : "") + ": " + tsCompoundType + ";" ];
	}

	function generateTsInterface(typeName, propertiesMap) {
		return [
			"export interface " + interfaceTypeName(typeName) + " extends ISemanticsTyped {"
		].concat(mapMap(propertiesMap, generateTsProperty))
		.concat([
			"}",
			""
		]);
	}

	return [
		"import {ISemanticsTyped} from \"./base-semantics-types\";",
		"",
		""
	].concat(mapMap(metaModel, generateTsInterface))
	.concat([""]);

}


function generatePolymorphicDispatcher(metaModel) {
	return [
		"import * as React from \"react\";",
		""
	].concat(mapMap(metaModel, function (typeName) {
		return "import {" + classTypeName(typeName) + "} from \"./type-widgets/" + fileName(typeName) + "\";";
	})
	).concat([
		"",
		"",
		"export function polyDispatch(sType: string, json: any, key?: string) {",
		"\tswitch (sType) {"
	]).concat(mapMap(metaModel, function (typeName) {
		return "\t\tcase \"" + typeName + "\": return <" + classTypeName(typeName) + " " + attributeName(typeName) + "={json} key={key} />;";
	})).concat([
		"\t\tdefault: return null;",
		"\t}",
		"}"
	]);
}


function generateTypeWidgetSkeleton(typeName) {
	return [
		"import {observer} from \"mobx-react\";",
		"import * as React from \"react\";",
		"",
		"import {dispatch} from \"../dispatcher\";",
		"import {editorState} from \"../state\";",
		"import {IFunctionApplication} from \"../../../shared/semantics-types_gen\";",
		"",
		"",
		"@observer",
		"export class " + classTypeName(typeName) + "<T> extends React.Component<{ " + attributeName(typeName) + ": " + interfaceTypeName(typeName) + "; }, {}> {",
		"",
		"\trender() {",
		"\t\tconst {" + attributeName(typeName) + "} = this.props;",
		"\t}",
		"",
		"}"
	];
}


function classTypeName(typeName) {
	return toFirstUpper(camelCase(typeName));
}


function interfaceTypeName(typeName) {
	return "I" + classTypeName(typeName);
}


function attributeName(typeName) {
	return camelCase(typeName);
}


function fileName(typeName) {
	return typeName.replace(" ", "-");
}


function writeLines(lines, path) {
	fs.writeFileSync(path, lodash.flatten(lines).join("\n"), encodingOpts);
}


function toFirstUpper(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}


function mapMap(map, func) {
	return Object.keys(map).map(function (key) { return func(key, map[key]); });
}

