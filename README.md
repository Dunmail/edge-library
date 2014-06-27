edge-library
============

Node module to simplify use of edge.js to wrap .NET libraries.

1. Allows a group of .NET methods to be instantiated as a block
2. Methods are lower-cased
3. Methods are wrapped in $q promises
4. Arguments are transformed to an array

## Installation

```
npm install edge-library --save
```
    
## Use


```javascript
var EdgeLibrary = require('../lib/edge-library').EdgeLibrary;

var test_library_definition = {
    assemblyFile: require('path').join(__dirname, './cs/bin/Release/com.blackpear.edge.test.dll'),
    type: {
        name: 'com.blackpear.edge.test.Lib',
        method: [
            'GetString',
            {
                name: 'GetJsonString',
                return: 'json'
            },
            'Add'
        ]
    }
};

var lib = new EdgeLibrary(test_library_definition);
```


Method calls use $q promises in place of node.js callbacks:

```javascript
lib.reflectstring('edge.js rocks!').then(
    function(value){
        console.log(value);
    },
    function(err){
        console.log('ERR:', err);
    }
        );
```  

Methods with more than one argument are transformed to an array: 

```javascript
lib.add(1, 2).then(
    function(value){
        console.log(value);
    },
    function(err){
        console.log('ERR:', err);
    }
);
```        
        
## Acknowledgements
        
Development supported by [Black Pear Software Ltd](http://www.blackpear.com)