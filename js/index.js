var input = ace.edit("input");
input.setTheme("ace/theme/twilight");
input.getSession().setMode("ace/mode/javascript");

var SAMPLE_CODE = [
    '    import React from \'react\'; import Utils, {format} from \'./utils\';',
    '',
    '',

    '   let myFunction = () => { if (true) {return 123}  else { return 134}',
    '}',
    '',
    '/**',
    ' * My React Component',
    ' */',
    'class MyComponent extends  React.Component {',
    'constructor(...args) { super(...args) }',
    '',
    'static serialize(a) { return JSON.stringify(a); }',
    '',
    'render() {',
    '    return <Component a="attribute"',
    '        arg1={[1, 2,',
    '3]}  ',
    ' arg2={{prop1, prop2,   prop3: 5}}>                <p>Hello, World</p>',
    '                    </Component>',
    '}',
    '}',
    '',
    '',
    '',
    'export default MyComponent;'
].join('\n');


var output = ace.edit("output");
output.setTheme("ace/theme/twilight");
output.getSession().setMode("ace/mode/javascript");

input.setValue(SAMPLE_CODE.toString(), 1);

var format = _.debounce(function() {
    var formatted;

    try {
        formatted = esfmt.format(input.getValue());
    } catch (e) {
        formatted = e.message;
    }


    output.setValue(formatted, 1);
}, 300)

input.getSession().on('change', format);
input.getSession().setUseWorker(false);
output.getSession().setUseWorker(false);

_.defer(format);
