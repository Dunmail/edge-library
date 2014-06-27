var EdgeLibrary = require('../lib/edge-library').EdgeLibrary;
var assert = require('assert');

var test_library_definition = {
    assemblyFile: require('path').join(__dirname, './cs/bin/Release/com.blackpear.edge.test.dll'),
    type: {
        name: 'com.blackpear.edge.test.Lib',
        method: [
            'HasError',
            'GetString',
            'ReflectString',
            {
                name: 'GetJsonString',
                return: 'json'
            },
            'Add'
        ]
    }
};

describe('edge-library', function () {

    var lib = new EdgeLibrary(test_library_definition);

    function fail() {}

    it('should expose library functions', function () {
        assert(lib.haserror);
        assert(lib.getstring);
        assert(lib.reflectstring);
        assert(lib.getjsonstring);
        assert(lib.add);
    });

    it('should reject promise when .NET Exception', function (done) {
        lib.haserror().then(
            fail,
            function (err) {
                assert(err);
                done();
            }
        );
    });

    it('should return value from function', function (done) {
        lib.getstring().then(
            function(value){
                assert(value === '.NET Unary Func result');
                done();
            },
            fail
        );
    });

    it('should pass input to function', function (done) {
        lib.reflectstring('edge.js rocks!').then(
            function(value){
                assert(value === 'edge.js rocks!');
                done();
            },
            fail
        );
    });

    it('should parse json when function.return is json', function (done) {
        lib.getjsonstring().then(
            function(value){
                assert(value.foo === 'bar');
                done();
            },
            fail
        );
    });

    it('should transform arguments into an array object when there is more than 1 argument', function (done) {
        lib.add(1, 2).then(
            function(value){
                assert(value === 3);
                done();
            },
            fail
        );
    });
});
