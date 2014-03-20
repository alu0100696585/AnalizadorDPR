var assert = chai.assert;

suite('Analizador sintactico ', function() {
    test('Factor', function() {
      var r = "A = 35."
      prueba(r);
      assert.deepEqual(r, "" );
    });
});