"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const underscore_1 = require("underscore");
exports.replaceParameters = (data, parameters) => {
    return underscore_1.template(data)(parameters);
};
//# sourceMappingURL=underscore.js.map