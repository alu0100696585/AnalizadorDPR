var assert = chai.assert;

suite('Analizador sintactico ', function() {
    test('Factor', function() {
      var r = "A = 35.";
      var resultado;
      resultado = main(r);
      assert.equal(resultado, "" );
    });
});