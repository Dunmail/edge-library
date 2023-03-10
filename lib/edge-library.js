const edge = require('edge-js');

function EdgeLibrary(options) {
    const self = this;

    function addMethod(assemblyFile, typeName, method) {
        const methodName = method.name || method;
        const returnType = method.return || 'object';

        const edgeFunc = edge.func({
            assemblyFile: assemblyFile,
            typeName: typeName,
            methodName: methodName
        });

        self[methodName.toLowerCase()] = function () {
            const args = Array.prototype.slice.call(arguments);
            let input;
            switch (args.length) {
                case 0:
                    input = null;
                    break;
                case 1:
                    input = args[0];
                    break;
                default:
                    input = args;
            }

            return new Promise(function(resolve, reject) {
                edgeFunc(input, function (err, data) {
                    if (err) {
                        reject(err);
                        return;
                    }

                    const result = returnType === 'json'
                        ? JSON.parse(data)
                        : data;

                    resolve(result);
                });
            });
        };
    }

    function add(options) {
        options.type.method.forEach(function (method) {
            addMethod(options.assemblyFile, options.type.name, method);
        });
    }

    add(options);
}

exports.EdgeLibrary = EdgeLibrary;