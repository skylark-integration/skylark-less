var Node = require('./node'), Anonymous = require('./anonymous'), FunctionCaller = require('../functions/function-caller');
var Call = function (name, args, index, currentFileInfo) {
    this.name = name;
    this.args = args;
    this.calc = name === 'calc';
    this._index = index;
    this._fileInfo = currentFileInfo;
};
Call.prototype = new Node();
Call.prototype.type = 'Call';
Call.prototype.accept = function (visitor) {
    if (this.args) {
        this.args = visitor.visitArray(this.args);
    }
};
Call.prototype.eval = function (context) {
    var currentMathContext = context.mathOn;
    context.mathOn = !this.calc;
    if (this.calc || context.inCalc) {
        context.enterCalc();
    }
    var args = this.args.map(function (a) {
        return a.eval(context);
    });
    if (this.calc || context.inCalc) {
        context.exitCalc();
    }
    context.mathOn = currentMathContext;
    var result, funcCaller = new FunctionCaller(this.name, context, this.getIndex(), this.fileInfo());
    if (funcCaller.isValid()) {
        try {
            result = funcCaller.call(args);
        } catch (e) {
            throw {
                type: e.type || 'Runtime',
                message: 'error evaluating function `' + this.name + '`' + (e.message ? ': ' + e.message : ''),
                index: this.getIndex(),
                filename: this.fileInfo().filename,
                line: e.lineNumber,
                column: e.columnNumber
            };
        }
        if (result !== null && result !== undefined) {
            if (!(result instanceof Node)) {
                if (!result || result === true) {
                    result = new Anonymous(null);
                } else {
                    result = new Anonymous(result.toString());
                }
            }
            result._index = this._index;
            result._fileInfo = this._fileInfo;
            return result;
        }
    }
    return new Call(this.name, args, this.getIndex(), this.fileInfo());
};
Call.prototype.genCSS = function (context, output) {
    output.add(this.name + '(', this.fileInfo(), this.getIndex());
    for (var i = 0; i < this.args.length; i++) {
        this.args[i].genCSS(context, output);
        if (i + 1 < this.args.length) {
            output.add(', ');
        }
    }
    output.add(')');
};
module.exports = Call;