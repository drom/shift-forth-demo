(function () {
    'use strict';

    var parse = require('shift-parser').default,
        analyze = require('shift-scope').default,
        forth = require('shift-forth');

    var inp, asm, cmJavaSCript, cmForth, comments;

    function refresh () {
        var source, tree, scope; // , time; // astElement, time;

        source = cmJavaSCript.getValue();

        tree = parse(source);
        forth.naming(tree);
        scope = analyze(tree);
        localStorage.shiftAST = source;
        forth.dfg(scope);
        forth.emit(scope, { comments: comments });
        cmForth.setValue(scope.forth);
    }

    comments = true;
    inp = document.getElementById('inp');
    // ast = document.getElementById('ast');
    asm = document.getElementById('asm');

    inp.value = localStorage.shiftAST || 'function add (a, b) {\n  return a + b;\n}';
    asm.value = 'dup drop';

    document.getElementById('button').addEventListener('click', function () {
        comments = !comments;
        refresh();
    });

    cmJavaSCript = CodeMirror.fromTextArea(
        inp,
        {
            mode: 'javascript',
            lineNumbers: true,
            indentUnit: 2,
            tabSize: 2,
            matchBrackets: true,
            autoCloseBrackets: true,
            highlightSelectionMatche: true,
            autofocus: true
        }
    );

    cmForth = CodeMirror.fromTextArea(
        asm,
        {
            mode: 'forth',
            theme: 'colorforth',
            lineNumbers: true,
            lineWrapping: true,
            indentUnit: 2,
            tabSize: 2,
            autofocus: false
        }
    );

    cmJavaSCript.on('change', function () {
        setTimeout(refresh, 750);
    });

    // document.addEventListener('polymer-ready', refresh);
    refresh();
})();

/* global console, CodeMirror */
