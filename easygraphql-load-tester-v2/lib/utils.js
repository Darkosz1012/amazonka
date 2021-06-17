"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MAX_DEEP_LEVEL = 4;
exports.getField = function (field, schema, deepLevel) {
    if (deepLevel === void 0) {
        deepLevel = 0;
    }
    deepLevel++;
    if (deepLevel > MAX_DEEP_LEVEL) return;
    if (!schema[field.type]) {
        return field.name;
    }
    var nestedType = schema[field.type];
    if (nestedType.values.length > 0) {
        return field.name;
    }
    var fields = [];
    nestedType.fields.forEach(function (field) {
        if (schema[field.type]) {
            var nestedField = exports.getField(field, schema, deepLevel);
            if (nestedField) {
                fields.push(nestedField);
            }
        } else {
            fields.push(field.name);
        }
    });
    var selectedFields = "";
    if (fields.length > 0) {
        selectedFields = "{ " + fields.join(" ") + " }";
    }
    return field.name + " " + selectedFields;
};
exports.createQueryArguments = function (args, userArgs, queryName) {
    var queryVariables = [];
    var queryArgs = [];
    var validateArg = function (userArg, arg) {
        if (typeof userArg === "undefined" && arg.noNull) {
            throw new Error(
                "Error in " +
                    queryName +
                    " - All required query arguments must be defined - missing " +
                    arg.name
            );
        }
    };
    args.forEach(function (arg) {
        if (Array.isArray(userArgs)) {
            userArgs.forEach(function (userArg) {
                validateArg(userArg[arg.name], arg);
            });
        } else {
            if (!userArgs) {
                throw new Error(
                    "Error in " + queryName + " - No query arguments defined"
                );
            }
            validateArg(userArgs[arg.name], arg);
        }
        var variableDefinition = arg.isArray
            ? "$" +
              arg.name +
              ": [" +
              arg.type +
              (arg.noNullArrayValues ? "!" : "") +
              "]" +
              (arg.noNull ? "!" : "")
            : "$" + arg.name + ": " + arg.type + (arg.noNull ? "!" : "");
        queryVariables.push(variableDefinition);
        queryArgs.push(arg.name + ": $" + arg.name);
    });
    return {
        variables: queryVariables,
        args: queryArgs,
    };
};
exports.createUnionQuery = function (nestedType, schema, queryType) {
    var fields = [];
    nestedType.fields.forEach(function (field) {
        var createdField = exports.getField(field, schema, 2);
        if (createdField) {
            fields.push(createdField);
        }
    });
    var unionQuery =
        "\n    ... on " +
        queryType +
        " {\n      " +
        fields.join(" ") +
        "\n    }\n  ";
    return unionQuery;
};
exports.createQuery = function (_a) {
    var fields = _a.fields,
        queryHeader = _a.queryHeader,
        isMutation = _a.isMutation,
        name = _a.name,
        operationName = _a.operationName,
        variables = _a.variables;
    var selectedFields = "";
    if (fields.length > 0) {
        var queryFields = fields.join(" ");
        selectedFields = "{\n      " + queryFields + "\n    }";
    }
    var newQuery;
    if (!isMutation) {
        newQuery =
            "\n    query " +
            operationName +
            " {\n        " +
            queryHeader +
            " " +
            selectedFields +
            "\n      }\n    ";
    } else {
        newQuery =
            "\n    mutation " +
            operationName +
            " {\n        " +
            queryHeader +
            " " +
            selectedFields +
            "\n      }\n    ";
    }
    if (Array.isArray(variables)) {
        return variables.map(function (val) {
            return {
                name: name,
                query: newQuery,
                operation: isMutation ? "Mutation" : "Query",
                variables: val || {},
            };
        });
    }
    return {
        name: name,
        query: newQuery,
        operation: isMutation ? "Mutation" : "Query",
        variables: variables || {},
    };
};
//# sourceMappingURL=utils.js.map
