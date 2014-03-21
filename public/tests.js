var assert = chai.assert;

suite('Analizador sintactico ', function() {
    test('Factor', function() {
      var r = "A = 35.";
      var resultado;
      resultado = main(r);
      assert.deepEqual(resultado, "[\n  {\n    "type": "=",\n    "left": {\n      "type": "ID",\n      "value": "A"\n    },\n    "right": {\n      "type": "NUM",\n      "value": 35\n    }\n  }\n]" );
    });
    
    test('Factor', function() {
      var r = "A = 35.";
      var resultado;
      resultado = main(r);
      assert.deepEqual(resultado, "[\n  {\n    "type": "=",\n    "left": {\n      "type": "ID",\n      "value": "A"\n    },\n    "right": {\n      "type": "NUM",\n      "value": 35\n    }\n  }\n]" );
    });
    
    test('Factor', function() {
      var r = "A = 35.";
      var resultado;
      resultado = main(r);
      assert.deepEqual(resultado, "[\n  {\n    "type": "=",\n    "left": {\n      "type": "ID",\n      "value": "A"\n    },\n    "right": {\n      "type": "NUM",\n      "value": 35\n    }\n  }\n]" );
    });
    
    test('Factor', function() {
      var r = "A = 35.";
      var resultado;
      resultado = main(r);
      assert.deepEqual(resultado, "[\n  {\n    "type": "=",\n    "left": {\n      "type": "ID",\n      "value": "A"\n    },\n    "right": {\n      "type": "NUM",\n      "value": 35\n    }\n  }\n]" );
    });
});