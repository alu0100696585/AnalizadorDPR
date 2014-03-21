var assert = chai.assert;

suite('Analizador sintactico ', function() {
    test('Program', function() {
      var r = "while a <= 4 do a = a - 1 - 1.";
      var resultado;
      resultado = main(r);
      assert.equal(resultado, '[\n  {\n    "type": "WHILE",\n    "left": {\n      "type": "<=",\n      "left": {\n        "type": "ID",\n        "value": "a"\n      },\n      "right": {\n        "type": "NUM",\n        "value": 4\n      }\n    },\n    "right": {\n      "type": "=",\n      "left": {\n        "type": "ID",\n        "value": "a"\n      },\n      "right": {\n        "type": "-",\n        "left": {\n          "type": "-",\n          "left": {\n            "type": "ID",\n            "value": "a"\n          },\n          "right": {\n            "type": "NUM",\n            "value": 1\n          }\n        },\n        "right": {\n          "type": "NUM",\n          "value": 1\n        }\n      }\n    }\n  }\n]');
    });
     
    test('Block', function() {
      var r = "const m =  7 , y = 0 ; n = 85.";
      var resultado;
      resultado = main(r);
      assert.equal(resultado, '[\n  {\n    "type": "=",\n    "left": {\n      "type": "C.ID",\n      "value": "m"\n    },\n    "right": {\n      "type": "NUM",\n      "value": 7\n    }\n  },\n  {\n    "type": "=",\n    "left": {\n      "type": "C.ID",\n      "value": "y"\n    },\n    "right": {\n      "type": "NUM",\n      "value": 0\n    }\n  },\n  {\n    "type": "=",\n    "left": {\n      "type": "ID",\n      "value": "n"\n    },\n    "right": {\n      "type": "NUM",\n      "value": 85\n    }\n  }\n]');
    });
    
    test('Statement', function() {
      var r = "begin A = 900; K = 299 end.";
      var resultado;
      resultado = main(r);
      assert.equal(resultado, '[\n  [\n    {\n      "type": "=",\n      "left": {\n        "type": "ID",\n        "value": "A"\n      },\n      "right": {\n        "type": "NUM",\n        "value": 900\n      }\n    },\n    {\n      "type": "=",\n      "left": {\n        "type": "ID",\n        "value": "K"\n      },\n      "right": {\n        "type": "NUM",\n        "value": 299\n      }\n    }\n  ]\n]' );
    });
    
    test('Condition', function() {
      var r = "if A == 7 then L = (4 / 5).";
      var resultado;
      resultado = main(r);
      assert.equal(resultado, '[\n  {\n    "type": "IF",\n    "left": {\n      "type": "==",\n      "left": {\n        "type": "ID",\n        "value": "A"\n      },\n      "right": {\n        "type": "NUM",\n        "value": 7\n      }\n    },\n    "right": {\n      "type": "=",\n      "left": {\n        "type": "ID",\n        "value": "L"\n      },\n      "right": {\n        "type": "/",\n        "left": {\n          "type": "NUM",\n          "value": 4\n        },\n        "right": {\n          "type": "NUM",\n          "value": 5\n        }\n      }\n    }\n  }\n]' );
    });
    
    test('Expresion', function() {
      var r = "A = ( 50 -20 ) / 2.";
      var resultado;
      resultado = main(r);
      assert.equal(resultado, "[\n  {\n    \"type\": \"=\",\n    \"left\": {\n      \"type\": \"ID\",\n      \"value\": \"A\"\n    },\n    \"right\": {\n      \"type\": \"/\",\n      \"left\": {\n        \"type\": \"-\",\n        \"left\": {\n          \"type\": \"NUM\",\n          \"value\": 50\n        },\n        \"right\": {\n          \"type\": \"NUM\",\n          \"value\": 20\n        }\n      },\n      \"right\": {\n        \"type\": \"NUM\",\n        \"value\": 2\n      }\n    }\n  }\n]" );
    });
    
    test('Term', function() {
      var r = "A = 35 + 4 - 8.";
      var resultado;
      resultado = main(r);
      assert.equal(resultado, "[\n  {\n    \"type\": \"=\",\n    \"left\": {\n      \"type\": \"ID\",\n      \"value\": \"A\"\n    },\n    \"right\": {\n      \"type\": \"-\",\n      \"left\": {\n        \"type\": \"+\",\n        \"left\": {\n          \"type\": \"NUM\",\n          \"value\": 35\n        },\n        \"right\": {\n          \"type\": \"NUM\",\n          \"value\": 4\n        }\n      },\n      \"right\": {\n        \"type\": \"NUM\",\n        \"value\": 8\n      }\n    }\n  }\n]" );
    });
    
    test('Factor', function() {
      var r = "A = 35 * 6.";
      var resultado;
      resultado = main(r);
      assert.equal(resultado, '[\n  {\n    "type": "=",\n    "left": {\n      "type": "ID",\n      "value": "A"\n    },\n    "right": {\n      "type": "*",\n      "left": {\n        "type": "NUM",\n        "value": 35\n      },\n      "right": {\n        "type": "NUM",\n        "value": 6\n      }\n    }\n  }\n]' );
    });
    
    test('Error', function() {
      var r = "var k = .";
      var resultado;
      resultado = main(r);
      assert.equal(resultado, "<div class=\"error\">Syntax Error. Expected ; found \'=\' near \'= .\'</div>" );
    });
});