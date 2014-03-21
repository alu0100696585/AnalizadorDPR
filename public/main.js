
  main = function(r) {
    var result, source;
    source = r;
    try {
      result = JSON.stringify(parse(source), null, 2);
    } catch (_error) {
      result = _error;
      result = "<div class=\"error\">" + result + "</div>";
    }
    return result;
  };

  Object.constructor.prototype.error = function(message, t) {
    t = t || this;
    t.name = "SyntaxError";
    t.message = message;
    throw treturn;
  };

  RegExp.prototype.bexec = function(str) {
    var i, m;
    i = this.lastIndex;
    m = this.exec(str);
    if (m && m.index === i) {
      return m;
    }
    return null;
  };

  String.prototype.tokens = function() {
    var RESERVED_WORD, from, getTok, i, key, m, make, n, result, rw, tokens, value;
    from = void 0;
    i = 0;
    n = void 0;
    m = void 0;
    result = [];
    tokens = {
      WHITES: /\s+/g,
      ID: /[a-zA-Z_]\w*/g,
      NUM: /\b\d+(\.\d*)?([eE][+-]?\d+)?\b/g,
      STRING: /('(\\.|[^'])*'|"(\\.|[^"])*")/g,
      ONELINECOMMENT: /\/\/.*/g,
      MULTIPLELINECOMMENT: /\/[*](.|\n)*?[*]\//g,
      COMPARISONOPERATOR: /[<>=!]=|[<>]/g,
      ONECHAROPERATORS: /([*\/=()\.&|;:,{}[\]])/g,
      ADDMINUSOP: /[+-]/g,
      MULTDIVOP: /[*\/]/g
    };
    RESERVED_WORD = {
      p: "P",
      "if": "IF",
      then: "THEN",
      "while": "WHILE",
      "do": "DO",
      "call": "CALL",
      "begin": "BEGIN",
      "end": "END",
      "var": "VAR",
      "const": "CONST",
      "procedure": "PROCEDURE",
      "program": "PROGRAM",
      "odd": "ODD"
    };
    make = function(type, value) {
      return {
        type: type,
        value: value,
        from: from,
        to: i
      };
    };
    getTok = function() {
      var str;
      str = m[0];
      i += str.length;
      return str;
    };
    if (!this) {
      return;
    }
    while (i < this.length) {
      for (key in tokens) {
        value = tokens[key];
        value.lastIndex = i;
      }
      from = i;
      if (m = tokens.WHITES.bexec(this) || (m = tokens.ONELINECOMMENT.bexec(this)) || (m = tokens.MULTIPLELINECOMMENT.bexec(this))) {
        getTok();
      } else if (m = tokens.ID.bexec(this)) {
        rw = RESERVED_WORD[m[0]];
        if (rw) {
          result.push(make(rw, getTok()));
        } else {
          result.push(make("ID", getTok()));
        }
      } else if (m = tokens.NUM.bexec(this)) {
        n = +getTok();
        if (isFinite(n)) {
          result.push(make("NUM", n));
        } else {
          make("NUM", m[0]).error("Bad number");
        }
      } else if (m = tokens.STRING.bexec(this)) {
        result.push(make("STRING", getTok().replace(/^["']|["']$/g, "")));
      } else if (m = tokens.ADDMINUSOP.bexec(this)) {
        result.push(make("ADDMINUSOP", getTok()));
      } else if (m = tokens.MULTDIVOP.bexec(this)) {
        result.push(make("MULTDIVOP", getTok()));
      } else if (m = tokens.COMPARISONOPERATOR.bexec(this)) {
        result.push(make("COMPARISON", getTok()));
      } else if (m = tokens.ONECHAROPERATORS.bexec(this)) {
        result.push(make(m[0], getTok()));
      } else {
        throw "Syntax error near '" + (this.substr(i)) + "'";
      }
    }
    return result;
  };

  parse = function(input) {
    var block, condition, expression, factor, lookahead, match, program, statement, statements, term, tokens, tree;
    tokens = input.tokens();
    lookahead = tokens.shift();
    match = function(t) {
      if (lookahead.type === t) {
        lookahead = tokens.shift();
        if (typeof lookahead === "undefined") {
          lookahead = null;
        }
      } else {
        throw ("Syntax Error. Expected " + t + " found '") + lookahead.value + "' near '" + input.substr(lookahead.from) + "'";
      }
    };
    program = function() {
      var result;
      result = block();
      if (lookahead && lookahead.type === ".") {
        match(".");
      } else {
        throw "Syntax Error. Expected '.' at end" + lookahead.type + "aouihqirub";
      }
      return result;
    };
    block = function() {
      var constante, proceed, resultado, variable;
      resultado = [];
      if (lookahead && lookahead.type === "CONST") {
        match("CONST");
        constante = function() {
          var left, result, right;
          result = null;
          if (lookahead && lookahead.type === "ID") {
            left = {
              type: "C.ID",
              value: lookahead.value
            };
            match("ID");
            match("=");
            if (lookahead && lookahead.type === "NUM") {
              right = {
                type: "NUM",
                value: lookahead.value
              };
              match("NUM");
            } else {
              throw "Syntax Error. Expected NUM but found " + (lookahead ? lookahead.value : "end of input") + (" near '" + (input.substr(lookahead.from)) + "'");
            }
          } else {
            throw "Syntax Error. Expected ID but found " + (lookahead ? lookahead.value : "end of input") + (" near '" + (input.substr(lookahead.from)) + "'");
          }
          result = {
            type: "=",
            left: left,
            right: right
          };
          return result;
        };
        resultado.push(constante());
        while (lookahead && lookahead.type === ",") {
          match(",");
          resultado.push(constante());
        }
        match(";");
      }
      if (lookahead && lookahead.type === "VAR") {
        match("VAR");
        variable = function() {
          var result;
          result = null;
          if (lookahead && lookahead.type === "ID") {
            result = {
              type: "Var ID",
              value: lookahead.value
            };
            match("ID");
          } else {
            throw "Syntax Error. Expected ID but found " + (lookahead ? lookahead.value : "end of input") + (" near '" + (input.substr(lookahead.from)) + "'");
          }
          return result;
        };
        resultado.push(variable());
        while (lookahead && lookahead.type === ",") {
          match(",");
          resultado.push(variable());
        }
        match(";");
      }
      proceed = function() {
        var result, value;
        result = null;
        match("PROCEDURE");
        if (lookahead && lookahead.type === "ID") {
          value = lookahead.value;
          match("ID");
          match(";");
          result = {
            type: "Procedure",
            value: value,
            left: block()
          };
          match(";");
        } else {
          throw "Syntax Error. Expected ID but found " + (lookahead ? lookahead.value : "end of input") + (" near '" + (input.substr(lookahead.from)) + "'");
        }
        return result;
      };
      while (lookahead && lookahead.type === "PROCEDURE") {
        resultado.push(proceed());
      }
      resultado.push(statement());
      return resultado;
    };
    statements = function() {
      var result;
      result = [statement()];
      while (lookahead && lookahead.type === ";") {
        match(";");
        result.push(statement());
      }
      if (result.length === 1) {
        return result[0];
      } else {
        return result;
      }
    };
    statement = function() {
      var left, result, right;
      result = null;
      if (lookahead && lookahead.type === "ID") {
        left = {
          type: "ID",
          value: lookahead.value
        };
        match("ID");
        match("=");
        right = expression();
        result = {
          type: "=",
          left: left,
          right: right
        };
      } else if (lookahead && lookahead.type === "P") {
        match("P");
        right = expression();
        result = {
          type: "P",
          value: right
        };
      } else if (lookahead && lookahead.type === "IF") {
        match("IF");
        left = condition();
        match("THEN");
        right = statement();
        result = {
          type: "IF",
          left: left,
          right: right
        };
      } else if (lookahead && lookahead.type === "BEGIN") {
        match("BEGIN");
        result = [statement()];
        while (lookahead && lookahead.type === ";") {
          match(";");
          result.push(statement());
        }
        match("END");
      } else if (lookahead && lookahead.type === "CALL") {
        match("CALL");
        left = {
          type: "ID",
          value: lookahead.value
        };
        match("ID");
        result = {
          type: "CALL",
          left: left
        };
      } else if (lookahead && lookahead.type === "WHILE") {
        match("WHILE");
        left = condition();
        match("DO");
        right = statement();
        result = {
          type: "WHILE",
          left: left,
          right: right
        };
      } else {
        throw "Syntax Error. Expected identifier but found " + (lookahead ? lookahead.value : "end of input") + (" near '" + (input.substr(lookahead.from)) + "'");
      }
      return result;
    };
    condition = function() {
      var left, result, right, type;
      if (lookahead && lookahead.type === "ODD") {
        match("ODD");
        right = expression();
        result = {
          type: "ODD",
          right: left
        };
      } else {
        left = expression();
        type = lookahead.value;
        match("COMPARISON");
        right = expression();
        result = {
          type: type,
          left: left,
          right: right
        };
      }
      return result;
    };
    expression = function() {
      var result, right, type;
      result = term();
      while (lookahead && lookahead.type === "ADDMINUSOP") {
        type = lookahead.value;
        match("ADDMINUSOP");
        right = term();
        result = {
          type: type,
          left: result,
          right: right
        };
      }
      return result;
    };
    term = function() {
      var result, right, type;
      result = factor();
      while (lookahead && lookahead.type === "MULTDIVOP") {
        type = lookahead.value;
        match("MULTDIVOP");
        right = factor();
        result = {
          type: type,
          left: result,
          right: right
        };
      }
      return result;
    };
    factor = function() {
      var result;
      result = null;
      if (lookahead.type === "NUM") {
        result = {
          type: "NUM",
          value: lookahead.value
        };
        match("NUM");
      } else if (lookahead.type === "ID") {
        result = {
          type: "ID",
          value: lookahead.value
        };
        match("ID");
      } else if (lookahead.type === "(") {
        match("(");
        result = expression();
        match(")");
      } else {
        throw "Syntax Error. Expected number or identifier or '(' but found " + (lookahead ? lookahead.value : "end of input") + " near '" + input.substr(lookahead.from) + "'";
      }
      return result;
    };
    tree = program(input);
    if (lookahead != null) {
      throw "Syntax Error parsing statements. " + "Expected 'end of input' and found '" + input.substr(lookahead.from) + "'";
    }
    return tree;
  };

