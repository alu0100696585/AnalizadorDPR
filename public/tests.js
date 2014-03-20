var assert = chai.assert;

suite('Analizador sintactico ', function() {
    test('Factor', function() {
      var result, source;
      source = "a = 8 + 3 * 9";
      try {
	result = JSON.stringify(parse(source), null, 2);
      } catch (_error) {
	result = _error;
	result = "<div class=\"error\">" + result + "</div>";
      }
      assert.deepEqual(result, "" );
    });
});