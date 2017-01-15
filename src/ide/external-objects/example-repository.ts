import {Repository} from "./repository";


const fib = require("../../test/programs/fib.json");
const externalObjects = require("../../test/programs/external-objects.json");
const htmlTest = require("../../test/programs/html-test.json");
const simple = require("../../test/programs/simple.json");
const simpleFunc = require("../../test/programs/simple-func.json");
const metaModel = require("../../src/meta/meta-model.json");


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

