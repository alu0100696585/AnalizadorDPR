var assert = chai.assert;

suite('Analizador sintactico ', function() {
    test('Program', function() {
      var r = "while a <= 4 do a = a - 1 - 1.";
      var resultado;
      resultado = main(r);
      assert.equal(resultado, "");
    });
    
    test('Block', function() {
      var r = "const m =  7 , y = 0 ; n = 85.";
      var resultado;
      resultado = main(r);
      assert.equal(resultado, "");
    });
    
    test('Statement', function() {
      var r = "begin A = 900; K = 299 end.";
      var resultado;
      resultado = main(r);
      assert.equal(resultado, "r" );
    });
    
    test('Condition', function() {
      var r = "if A == 7 then L = (4 / 5).";
      var resultado;
      resultado = main(r);
      assert.equal(resultado, "r" );
    });
    
    test('Expresion', function() {
      var r = "A = ( 50 -20 ) / 2.";
      var resultado;
      resultado = main(r);
      assert.equal(resultado, "r" );
    });
    
    test('Term', function() {
      var r = "A = 35 + 4 - 8.";
      var resultado;
      resultado = main(r);
      assert.equal(resultado, "r" );
    });
    
    test('Factor', function() {
      var r = "A = 35 * 6.";
      var resultado;
      resultado = main(r);
      assert.equal(resultado, "[\n  {\n    \"type\": \"=\",\n    \"left\": {\n      \"type\": \"ID\",\n      \"value\": \"A\"\n    },\n    \"right\": {\n      \"type\": \"NUM\",\n      \"value\": 35\n    }\n  }\n]" );
    });
    
    test('Error', function() {
      var r = "var k = .";
      var resultado;
      resultado = main(r);
      assert.equal(resultado, "r" );
    });
});