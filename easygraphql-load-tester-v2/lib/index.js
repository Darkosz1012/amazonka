"use strict";
var __spreadArrays =
    (this && this.__spreadArrays) ||
    function () {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
var child_process_1 = require("child_process");
var easygraphql_parser_1 = __importDefault(require("easygraphql-parser"));
var fs_1 = __importDefault(require("fs"));
var graphql_1 = require("graphql");
var lodash_flatten_1 = __importDefault(require("lodash.flatten"));
var path_1 = __importDefault(require("path"));
var utils_1 = require("./utils");
module.exports = /** @class */ (function () {
    function LoadTesting(schema, args) {
        if (args === void 0) {
            args = {};
        }
        var _a, _b, _c, _d;
        if (!schema) {
            throw new Error("The schema is required");
        }
        this.schema = easygraphql_parser_1.default(schema);
        this.arguments = args;
        this.queryField =
            ((_b =
                (_a = this.schema.schemaDefinition) === null || _a === void 0
                    ? void 0
                    : _a.query) === null || _b === void 0
                ? void 0
                : _b.field) || "Query";
        this.mutationField =
            ((_d =
                (_c = this.schema.schemaDefinition) === null || _c === void 0
                    ? void 0
                    : _c.mutation) === null || _d === void 0
                ? void 0
                : _d.field) || "Mutation";
    }
    LoadTesting.prototype.artillery = function (options) {
        if (options === void 0) {
            options = {};
        }
        var _a, _b, _c, _d, _e, _f;
        var queries = this.createQueries({
            queries:
                (_a = options) === null || _a === void 0
                    ? void 0
                    : _a.customQueries,
            selectedQueries:
                (_b = options) === null || _b === void 0
                    ? void 0
                    : _b.selectedQueries,
            withMutations:
                (_c = options) === null || _c === void 0
                    ? void 0
                    : _c.withMutations,
            onlyCustomQueries:
                (_d = options) === null || _d === void 0
                    ? void 0
                    : _d.onlyCustomQueries,
        });
        if ((_e = options) === null || _e === void 0 ? void 0 : _e.queryFile) {
            var queryFileName = "easygraphql-load-tester-queries.json";
            var filePath = (
                (_f = options) === null || _f === void 0
                    ? void 0
                    : _f.queryFilePath
            )
                ? path_1.default.join(options.queryFilePath, queryFileName)
                : path_1.default.join(path_1.default.resolve(), queryFileName);
            fs_1.default.writeFileSync(filePath, JSON.stringify(queries));
        }
        /* istanbul ignore next */
        return function (context, events, done) {
            context.vars["cases"] = queries;
            return done();
        };
    };
    LoadTesting.prototype.k6 = function (fileName, options) {
        if (options === void 0) {
            options = {};
        }
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (!fileName) {
            throw new Error("The k6 file name is missing");
        }
        var queryFileName = "easygraphql-load-tester-queries.json";
        var queries = this.createQueries({
            queries:
                (_a = options) === null || _a === void 0
                    ? void 0
                    : _a.customQueries,
            selectedQueries:
                (_b = options) === null || _b === void 0
                    ? void 0
                    : _b.selectedQueries,
            withMutations:
                (_c = options) === null || _c === void 0
                    ? void 0
                    : _c.withMutations,
            onlyCustomQueries:
                (_d = options) === null || _d === void 0
                    ? void 0
                    : _d.onlyCustomQueries,
        });
        var selectedVus =
            ((_e = options) === null || _e === void 0 ? void 0 : _e.vus) || "";
        var selectedDuration =
            ((_f = options) === null || _f === void 0 ? void 0 : _f.duration) ||
            "";
        var iterations =
            ((_h =
                (_g = options) === null || _g === void 0
                    ? void 0
                    : _g.iterations) === null || _h === void 0
                ? void 0
                : _h.toString()) || "";
        fs_1.default.writeFileSync(queryFileName, JSON.stringify(queries));
        var outArgs = options.out ? options.out : [];

        var argsArr = __spreadArrays(outArgs, [fileName]);
        argsArr.unshift("run", "--out");
        var k6Process = child_process_1.spawn("k6", argsArr, {
            stdio: "inherit",
            env: {
                K6_VUS: selectedVus.toString(),
                K6_DURATION: selectedDuration,
                K6_ITERATIONS: iterations,
            },
        });

        k6Process.on("exit", function () {
            var _a;
            if (
                !((_a = options) === null || _a === void 0
                    ? void 0
                    : _a.queryFile)
            ) {
                fs_1.default.unlinkSync(queryFileName);
            }
        });
    };
    LoadTesting.prototype.createQueries = function (_a) {
        var _this = this;
        var _b = _a === void 0 ? {} : _a,
            queries = _b.queries,
            selectedQueries = _b.selectedQueries,
            withMutations = _b.withMutations,
            onlyCustomQueries = _b.onlyCustomQueries;
        var loadTestQueries = [];
        if (
            queries &&
            selectedQueries &&
            !(Array.isArray(queries) && Array.isArray(selectedQueries))
        ) {
            throw new Error(
                "Custom queries and selected queries should be an array"
            );
        }
        if (queries) {
            loadTestQueries = queries.map(function (query) {
                var _a, _b, _c, _d;
                var parsedQuery = graphql_1.parse(query);
                var operationNode = graphql_1.getOperationAST(
                    parsedQuery,
                    null
                );
                var name =
                    ((_b =
                        (_a = operationNode) === null || _a === void 0
                            ? void 0
                            : _a.name) === null || _b === void 0
                        ? void 0
                        : _b.value) ||
                    ((_c = operationNode) === null || _c === void 0
                        ? void 0
                        : _c.selectionSet.selections[0]
                    ).name.value;
                if (Array.isArray(_this.arguments[name])) {
                    return _this.arguments[name].map(function (val) {
                        var _a;
                        return {
                            name: name,
                            operation:
                                (_a = operationNode) === null || _a === void 0
                                    ? void 0
                                    : _a.operation,
                            query: query,
                            variables: val || {},
                        };
                    });
                }
                return {
                    name: name,
                    operation:
                        (_d = operationNode) === null || _d === void 0
                            ? void 0
                            : _d.operation,
                    query: query,
                    variables: _this.arguments[name] || {},
                };
            });
            loadTestQueries = lodash_flatten_1.default(loadTestQueries);
        }
        if (onlyCustomQueries && queries) {
            if (selectedQueries) {
                loadTestQueries = loadTestQueries.filter(function (query) {
                    for (var i = 0; i < selectedQueries.length; i++) {
                        if (query.name && query.name === selectedQueries[i])
                            return true;
                    }
                });
            }
        } else {
            var schemaDefinitions = [
                {
                    definition: this.queryField,
                    isMutation: false,
                },
            ];
            if (withMutations) {
                schemaDefinitions.push({
                    definition: this.mutationField,
                    isMutation: true,
                });
            }
            schemaDefinitions.forEach(function (schemaDefinition) {
                _this.schema[schemaDefinition.definition].fields.forEach(
                    function (query) {
                        var _a;
                        if (
                            !(
                                ((_a = selectedQueries) === null ||
                                _a === void 0
                                    ? void 0
                                    : _a.length) &&
                                selectedQueries.indexOf(query.name) < 0
                            )
                        ) {
                            loadTestQueries.push(
                                _this.createOperation(
                                    query,
                                    schemaDefinition.isMutation
                                )
                            );
                        }
                    }
                );
            });
            loadTestQueries = lodash_flatten_1.default(loadTestQueries);
        }
        return lodash_flatten_1.default(loadTestQueries);
    };
    LoadTesting.prototype.createOperation = function (query, isMutation) {
        var _this = this;
        var queryHeader = query.name;
        var name = query.name;
        var operationName = query.name.toUpperCase();
        if (query.arguments.length) {
            var createdArgs = utils_1.createQueryArguments(
                query.arguments,
                this.arguments[query.name],
                query.name
            );
            if (createdArgs.variables.length && createdArgs.args.length) {
                queryHeader = name + "(" + createdArgs.args.join(", ") + ")";
                name =
                    name +
                    " with arguments: { " +
                    createdArgs.args.join(", ") +
                    " }";
                operationName =
                    operationName +
                    "(" +
                    createdArgs.variables.join(", ") +
                    ")";
            }
        }
        // Check if the operation only request scalar type.
        if (
            ["ID", "String", "Int", "Float", "Boolean"].indexOf(query.type) >= 0
        ) {
            return utils_1.createQuery({
                fields: [],
                queryHeader: queryHeader,
                isMutation: isMutation,
                name: name,
                operationName: operationName,
                variables: this.arguments[query.name],
            });
        }
        // Select the nested type from the object of types.
        var nestedType = this.schema[query.type];
        if (nestedType.type === "UnionTypeDefinition") {
            var unionQueries_1 = [];
            nestedType.types.forEach(function (type) {
                var newNestedType = _this.schema[type];
                unionQueries_1.push(
                    utils_1.createUnionQuery(newNestedType, _this.schema, type)
                );
            });
            return utils_1.createQuery({
                fields: unionQueries_1,
                queryHeader: queryHeader,
                isMutation: isMutation,
                name: name,
                operationName: operationName,
                variables: this.arguments[query.name],
            });
        } else {
            var fields_1 = [];
            return nestedType.fields.map(function (field) {
                var createdField = utils_1.getField(field, _this.schema);
                if (createdField) {
                    fields_1.push(createdField);
                }
                console.log(fields_1);
                return utils_1.createQuery({
                    fields: fields_1,
                    queryHeader: queryHeader,
                    isMutation: isMutation,
                    name: name,
                    operationName: operationName,
                    variables: _this.arguments[query.name],
                });
            });
        }
    };
    return LoadTesting;
})();
//# sourceMappingURL=index.js.map
