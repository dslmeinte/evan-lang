import {Repository} from "./repository";


const fib = require("../../../fixtures/programs/fib.json");
const externalObjects = require("../../../fixtures/programs/external-objects.json");
const htmlTest = require("../../../fixtures/programs/html-test.json");
const simple = require("../../../fixtures/programs/simple.json");
const simpleFunc = require("../../../fixtures/programs/simple-func.json");
const metaModel = require("../../../semantics");


/**
 * An example repository containing all resources in `test/programs/`
 * as well as the sTypes' description in `src/meta/meta-model.json`.
 */
export const exampleRepository = new Repository();

exampleRepository.addResource("fib", fib);
exampleRepository.addResource("external-objects", externalObjects);
exampleRepository.addResource("html-test", htmlTest);
exampleRepository.addResource("simple", simple);
exampleRepository.addResource("simple-func", simpleFunc);
exampleRepository.addResource("meta-model", metaModel);

