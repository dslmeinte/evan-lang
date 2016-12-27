import {Repository} from "./repository";


const resourceFib = require("../../test/programs/fib.json");
const externalObjects = require("../../test/programs/external-objects.json");
const resourceSimple = require("../../test/programs/simple.json");
const resourceSimpleFunc = require("../../test/programs/simple-func.json");
const metaModel = require("../../src/meta/meta-model.json");


export const exampleRepository = new Repository();

exampleRepository.addResource("fib", resourceFib);
exampleRepository.addResource("external-objects", externalObjects);
exampleRepository.addResource("simple", resourceSimple);
exampleRepository.addResource("simple-func", resourceSimpleFunc);
exampleRepository.addResource("meta-model", metaModel);

