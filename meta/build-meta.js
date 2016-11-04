const camelCase = require("camelcase");
const fs = require("fs");
const lodash = require("lodash");


const encodingOpts = { encoding: "utf8" };

const metaModel = JSON.parse(fs.readFileSync(__dirname + "/meta-model.json", encodingOpts));

// TODO  check meta model, e.g. using JSON Schema?

writeLines(generateSemanticsTypes(metaModel), "core/semantics-types_gen.ts");
writeLines(generatePolymorphicDispatcher(metaModel), "ide/editor/polymorphic-dispatcher_gen.tsx");
mapMap(metaModel, function (typeName) {
	writeLines(generateTypeWidgetSkeleton(typeName), "ide/editor/type-widgets/" + fileName(typeName) + ".tsx_gen");
});


function generateSemanticsTypes(metaModel) {

	function generateTsProperty(propertyName, description) {
		const tsType = !! description.ownType
			? interfaceTypeName(description.type)
			: description.type;
		const tsCompoundType = !! description.stringMap
			? "{ [name: string]: " + tsType + " }"
			: tsType;
		return [ "\t" + propertyName + (description.optional ? "?" : "") + ": " + tsCompoundType + ";" ];
	}

	function generateTsInterface(typeName, metaTypeDescription) {
		return [
			"export interface " + interfaceTypeName(typeName) + " extends ISemanticsTyped {",
			"\t$sType: \"" + typeName + "\";"
		].concat(mapMap(metaTypeDescription.properties, generateTsProperty))	
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
		"",
		"import {IAccessor} from \"./utils/accessor\";",
		""
	].concat(mapMap(metaModel, function (typeName) {
		return "import {" + classTypeName(typeName) + "} from \"./type-widgets/" + fileName(typeName) + "\";";
	})
	).concat([
		"",
		"",
		"export function polyDispatch(sType: string, accessor: IAccessor<any>, key?: string) {",
		"\tswitch (sType) {"
	]).concat(mapMap(metaModel, function (typeName) {
		return "\t\tcase \"" + typeName + "\": return <" + classTypeName(typeName) + " accessor={accessor} key={key} />;";
	})).concat([
		"\t\tdefault: return null;",
		"\t}",
		"}",
		""
	]);
}


function generateTypeWidgetSkeleton(typeName) {
	return [
		"import {observer} from \"mobx-react\";",
		"import * as React from \"react\";",
		"",
		"import {BaseEditWidget} from \"../base-edit-widget\";",
		"import {dispatch} from \"../dispatcher\";",
		"import {" + interfaceTypeName(typeName) + "} from \"../../../core/semantics-types_gen\";",
		"",
		"",
		"@observer",
		"export class " + classTypeName(typeName) + " extends BaseEditWidget<" + interfaceTypeName(typeName) + "> {",
		"",
		"\trenderContents(" + attributeName(typeName) + ": " + interfaceTypeName(typeName) + ") {",
		"\t\treturn (",
		"\t\t\t// TODO  render code here!",
		"\t\t);",
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
	return typeName.replace(/[ ]/g, "-");
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

