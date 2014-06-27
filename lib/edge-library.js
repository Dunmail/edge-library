var edge = require('edge');
var $q = require('q');

function EdgeLibrary(options) {
    var self = this;

    function addMethod(assemblyFile, typeName, method) {
        var methodName = method.name || method;
        var returnType = method.return || 'object';

        var edgeFunc = edge.func({
            assemblyFile: assemblyFile,
            typeName: typeName,
            methodName: methodName
        });

        self[methodName.toLowerCase()] = function () {
            var args = Array.prototype.slice.call(arguments);
            var input;
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
            var deferred = $q.defer();
            edgeFunc(input, function (err, data) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    var result = returnType === 'json' ? JSON.parse(data) : data;
                    deferred.resolve(result);
                }
            });
            return deferred.promise;
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