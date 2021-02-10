function ash_interpret(program = [], inputs = []) {
    var code_page = [
        "¤", "∴", "∵", "∷", "⌊", "⌋", "⌈", "⌉", "¡", "¿", "⟨", "⟩", "⊷", "⊶", "⊏", "⊑",
        "¬", "∧", "∨", "⊕", "≪", "≫", "⋘", "⋙", "⊸", "÷", "×", "±", "≤", "≠", "≥", "≈",
        " ", "!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/",
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ":", ";", "<", "=", ">", "?",
        "@", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O",
        "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "[", "\\", "]", "^", "_",
        "`", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o",
        "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "{", "|", "}", "~", "\n",
        "Ȧ", "Ḃ", "Ċ", "Ḋ", "Ė", "Ḟ", "Ġ", "Ḣ", "İ", "Ŀ", "Ṁ", "Ṅ", "Ȯ", "Ṗ", "Ṙ", "Ṡ",
        "Ṫ", "Ẇ", "Ẋ", "Ẏ", "Ż", "ȧ", "ḃ", "ċ", "ḋ", "ė", "ḟ", "ġ", "ḣ", "ŀ", "ṁ", "ṅ",
        "ȯ", "ṗ", "ṙ", "ṡ", "ṫ", "ẇ", "ẋ", "ẏ", "ż", "Ạ", "Ḅ", "Ḍ", "Ẹ", "Ḥ", "Ị", "Ḳ",
        "Ḷ", "Ṃ", "Ṇ", "Ọ", "Ṛ", "Ṣ", "Ṭ", "Ụ", "Ṿ", "Ẉ", "Ỵ", "Ẓ", "ạ", "ḅ", "ḍ", "ẹ",
        "ḥ", "ị", "ḳ", "ḷ", "ṃ", "ṇ", "ọ", "ṛ", "ṣ", "ṭ", "ụ", "ṿ", "ẉ", "ỵ", "ẓ", "¶",
        "½", "⅓", "¼", "⅕", "⅙", "⅐", "⅛", "⅑", "⅒", "⅞", "⁺", "⁻", "⁼", "⁽", "⁾", "ⁿ",
        "ɓ", "ƈ", "ɗ", "ɠ", "ɦ", "ƙ", "ɱ", "ɲ", "ƭ", "ȥ", "₊", "₋", "₌", "₍", "₎", "ₓ",
        "₀", "₁", "₂", "₃", "₄", "₅", "₆", "₇", "₈", "₉", "∞", "∅", "‘", "’", "“", "”"
    ];
    
    // Variables
    
    var i, p, r, m;
    
    // Format program
    
    var format_program = (data) => {
        if (typeof data == "string")
            return data.split("").map(p => code_page[((code_page.indexOf(p) + 1) || 0x21) - 1]);
        else if (typeof data == "number")
            return [code_page[Math.max(Math.min(data, 0xff, 0x00))]];
        else if (data === null || data === undefined)
            return [code_page[0x20]];
        else if (Array.isArray(data))
            return [].concat.apply([], data.map(format_program));
        else
            throw "ERR: Invalid program format";
    };
    
    program = format_program(program);
    
    // Tokenization variables
    
    var tokens = [];
    
    var string_unit_length = (i) => {
        var j;
        
        var point = code_page.indexOf(program[i]);
        
        if (point < 0x10) {
            return 2;
        } else if (point < 0x18) {
            return 3;
        } else if (point == 0x18) {
            return 4 + !!(program[i + 1] & 0x80);
        } else if (point == 0x19) {
            return 5;
        } else if (point < 0xf8) {
            return 1;
        } else if (point == 0xf8) {
            for (j = i + 1; j < program.length; j++)
                if (code_page.indexOf(program[j]) >= 0xf8 && code_page.indexOf(program[j]) < 0xfc)
                    return j - i;
            
            return program.length - i;
        } else if (point < 0xfb) {
            for (j = i + 2; j < program.length; j++)
                if (code_page.indexOf(program[j]) >= 0xf8 && code_page.indexOf(program[j]) < 0xfc)
                    return j - i;
            
            return program.length - i;
        } else {
            return 1;
        }
    };
    
    var implicit_length = (i) => {
        var j, n;
        
        if (program[i + 1].match(/\(|\[|\{/)) {
            for (j = i + 1, n = 0; j < program.length; j++) {
                if (program[j].match(/\(|\[|\{/))
                    n++;
                if (program[j].match(/\)|\]|\}/))
                    n--;
                
                if (!n)
                    return j - i;
            }
        } else if (program[i + 1].match(/[a-zA-Z_ ]/)) {
            for (j = 0; j < program.length; j++)
                if (!program[j].match(/[a-zA-Z0-9_ .]/))
                    return j - i;
        } else if (program[i + 1].match(/[0-9.-]/)) {
            for (j = 0; j < program.length; j++)
                if (!program[j].match(/[0-9.-]/))
                    return j - i;
        } else {
            return 4;
        }
        
        return program.length - i;
    };
    
    // Tokenize
    
    for (i = 0; i < program.length; i++) {
        p = program[i];
        
        switch (p) {
            case "‘":
                r = string_unit_length(i + 1);

                tokens.push(program.slice(i, i + r + 1));

                i += r;
                
                break;
            case "’":
                r = 2 - !!(program[i + 1] & 0x80);

                tokens.push(program.slice(i, i + r + 1));

                i += r;
                
                break;
            case "“":
                r = implicit_length(i);

                tokens.push(program.slice(i, i + r + 1));

                i += r;
                
                break;
            case "”":
                r = program.length - i;

                for (j = i + 1; j < program.length; j++) {
                    if (program[j] == "”") {
                        r = j - i;

                        break;
                    } else {
                        j += string_unit_length(j);
                    }
                }

                tokens.push(program.slice(i, i + r + 1));

                i += r;
                
                break;
            case "ɓ":
            case "ƈ":
            case "ɠ":
            case "ɦ":
            case "ƙ":
            case "ɱ":
            case "ɲ":
            case "ƭ":
            case "ȥ":
                tokens.push(program.slice(i, i + 2));
                
                i += 1;
                
                break;
            case "ɗ":
                tokens.push(program.slice(i, i + 3));
                
                i += 2;
                
                break;
            default:
                tokens.push(program[i]);
        }
    }
    
    // Parsing variables
    
    var tree = {
        type: "function",
        data: []
    };
    
    var depth = 0;
    
    var needed_archives = [];
    
    var needed = [];
    
    var arities = [
        1, 1, 1, 0, 1, 1, 1, 1, 0, 3, 2, 2, 2, 2, 2, 1,
        1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        0, 1, 0, 0, 0, 2, 2, 0, 2, 3, 2, 2, 2, 2, 1, 2,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 3,
        0, 2, 1, 2, 2, 1, 2, 2, 2, 3, 2, 2, 1, 1, 2, 1,
        1, 2, 2, 3, 1, 1, 1, 2, 1, 2, 2, 2, 2, 3, 2, 1,
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1,
        1, 1, 2, 1, 1, 1, 1, 1, 0, 1, 2, 0, 2, 0, 1, 0,
        2, 1, 1, 1, 3, 1, 2, 1, 3, 2, 1, 1, 1, 1, 1, 3,
        1, 1, 1, 1, 1, 1, 4, 4, 4, 1, 1, 1, 1, 2, 3, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 2, 2,
        2, 2, 2, 0, 2, 2, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ];
    
    var insert_at_depth = (item) => {
        var j, t = tree;
        
        for (j = 0; j < depth; j++)
            t = t.data[t.data.length - 1];
        
        t.data.push(item);
    };
    
    var read_at_depth = () => {
        var j, t = tree;
        
        for (j = 0; j < depth; j++)
            t = t.data[t.data.length - 1];
        
        return t;
    };
    
    // Parse
    
    for (i = 0; i < tokens.length; i++) {
        p = code_page.indexOf(tokens[i][0]);
        
        if (p >= 0xfc) {
            insert_at_depth({
                type: "string",
                data: tokens[i]
            });
        } else if (p >= 0xe0 && p < 0xea) {
            insert_at_depth({
                type: "operator",
                name: tokens[i],
                data: []
            });
        } else if (code_page[p] == "{") {
            insert_at_depth({
                type: "function",
                data: []
            });
            
            needed_archives.push(needed);
            needed = [];
            
            depth++;
        } else if (code_page[p] == "}") {
            while (depth && read_at_depth().type != "function")
                depth--;
            
            needed = needed_archives.pop() || [];
            
            if (needed.length)
                needed[needed.length - 1]--;
            
            while (needed.length && !needed[needed.length - 1]) {
                needed.pop();

                depth--;
            }
            
            if (depth)
                depth--;
        } else if (code_page[p] == "\n") {
            depth = 0;
            
            needed_archives = [];
            needed = [];
        } else {
            insert_at_depth({
                type: "operator",
                name: p,
                data: []
            });
            
            if (needed.length)
                needed[needed.length - 1]--;
            
            if (arities[p]) {
                needed.push(arities[p]);
                
                depth++;
            } else {
                while (needed.length && !needed[needed.length - 1]) {
                    needed.pop();

                    depth--;
                }
            }
        }
    }
    
    // Interpretation functions
    
    var type_check = (data) => {
        if (data === null || data === undefined)
            return "null";
        if (typeof data == "bigint")
            return "integer";
        if (typeof data == "number")
            return "float";
        if (typeof data == "string")
            return "string";
        if (Array.isArray(data))
            return "array";
        
        return "null";
    };
    
    var to_integer = (data) => {
        var type = type_check(data);
        
        if (type == "null")
            return null;
        if (type == "integer")
            return data;
        if (type == "float")
            return Number.isFinite(data) ? BigInt(Math.trunc(data)) : null;
        if (type == "string")
            return data.match(/^-?[0-9]+$/) ? BigInt(data) : null;
        if (type == "array")
            return data.map(to_integer).reduce((a, n) => a === null || n === null ? null : a + n, 0n);
    };
    
    var to_float = (data) => {
        var type = type_check(data);
        
        if (type == "null")
            return null;
        if (type == "integer")
            return Number(data);
        if (type == "float")
            return data;
        if (type == "string")
            return data.match(/^-?[0-9]+(\.[0-9]*)?$/) ? +data : null;
        if (type == "array")
            return data.map(to_float).reduce((a, n) => a === null || n === null ? null : a + n, 0);
    };
    
    var to_number = (data) => {
        var type = type_check(data);
        
        if (type == "string")
            return data.match(/^-?[0-9]+(\.[0-9]*)?$/) ? to_float(data) : to_integer(data);
        if (type == "array")
            return to_number(data.map(to_float).reduce((a, n) => a === null || n === null ? null : a + n, 0));
        
        return data;
    };
    
    var to_boolean = (data) => {
        var type = type_check(data);
        
        if (type == "null")
            return 0n;
        if (type == "integer")
            return data == 0n ? 0n : 1n;
        if (type == "float")
            return data == 0 ? 0n : 1n;
        if (type == "string")
            return data.length ? 1n : 0n;
        if (type == "array")
            return data.some(n => to_boolean(n)) ? 1n : 0n;
    };
    
    var to_string = (data) => {
        var type = type_check(data);
        
        if (type == "null")
            return "";
        if (type == "integer")
            return data.toString();
        if (type == "float")
            return data.toString();
        if (type == "string")
            return data;
        if (type == "array")
            return data.map(to_string).join("");
    };
    
    var to_array = (data) => {
        var type = type_check(data);
        
        if (type == "null")
            return [];
        if (type == "array")
            return data;
        if (type == "string")
            return data.split("");
        
        return [data];
    };
    
    // Interpretation variables
    
    var the_stack = [];
    
    var stack = [{
        args: inputs
    }];
    
    var top;
    var args;
    var other = {};
    
    var pointer = [];
    var data;
    
    var stop = false;
    
    var static_depths = [
        1, 1, 1, 0, 1, 1, 1, 1, 0, 3, 2, 2, 2, 2, 2, 1,
        1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        0, 1, 0, 0, 0, 2, 2, 0, 2, 3, 2, 2, 2, 2, 1, 2,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 3,
        0, 2, 1, 2, 2, 1, 2, 2, 2, 3, 2, 2, 1, 1, 2, 1,
        1, 2, 2, 3, 1, 1, 1, 2, 1, 2, 2, 2, 2, 3, 2, 1,
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1,
        1, 1, 2, 1, 1, 1, 1, 1, 0, 1, 2, 0, 2, 0, 1, 0,
        2, 1, 1, 1, 3, 1, 2, 1, 3, 2, 1, 1, 1, 1, 1, 3,
        1, 1, 1, 1, 1, 1, 4, 4, 4, 1, 1, 1, 1, 2, 3, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 2, 2,
        2, 2, 2, 0, 2, 2, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ];
    
    var read_at_pointer = (arg_pointer = pointer) => {
        var j, t = tree;
        
        for (j = 0; j < arg_pointer.length; j++)
            t = t.data[arg_pointer[j]];
        
        return t;
    };
    
    // Insert default arguments
    
    depth = 0;
    
    while (!stop) {
        data = read_at_pointer();
        
        if (depth > pointer.length || data.type == "operator" && !data.data.length) {
            if (data.type == "operator") {
                for (i = 0; data.data.length < arities[data.name]; i++)
                    data.data.push({
                        type: "default",
                        data: i
                    });
            }
            
            depth = pointer.length;
            
            if (pointer[pointer.length - 1] < read_at_pointer(pointer.slice(0, -1)).data.length - 1) {
                pointer[pointer.length - 1]++;
            } else if (pointer.length) {
                pointer.pop();
            } else {
                stop = true;
            }
        } else {
            if ((data.type == "operator" || data.type == "function") && data.data.length) {
                pointer.push(0);
                depth++;
            } else if (pointer[pointer.length - 1] < read_at_pointer(pointer.slice(0, -1)).data.length - 1) {
                pointer[pointer.length - 1]++;
            } else if (pointer.length) {
                pointer.pop();
            } else {
                stop = true;
            }
        }
    }
    
    pointer = [];
    stop = false;
    
    while (!stop) {
        data = read_at_pointer();
        
        if (stack.length > pointer.length) {
            top = stack[pointer.length];
        } else {
            stack[pointer.length] = top = {
                args: []
            };
        }
        
        args = top.args;
        
        while (stack.length > pointer.length + 2)
            stack.pop();
        
        if (data.type == "operator") {
            if (args.length < static_depths[data.name]) {
                if (stack.length == pointer.length + 2)
                    args.push(stack.pop().return);
                
                if (args.length < static_depths[data.name]) {
                    pointer.push(args.length);
                    
                    continue;
                }
            }
            
            top.return = null;
            
            switch (code_page[data.name]) {
                case "¤":
                    top.return = to_boolean(args[0]);
                    
                    break;
                case "⌊":
                    other.type = type_check(args[0]);
                    
                    if (other.type == "integer")
                        top.return = args[0];
                    else if (other.type == "float")
                        top.return = Math.floor(args[0]);
                    else if (other.type == "string" || other.type == "array")
                        top.return = args[0][0];
                    
                    break;
                case "⌋":
                    other.type = type_check(args[0]);
                    
                    if (other.type == "integer")
                        top.return = args[0];
                    else if (other.type == "float")
                        top.return = Math.trunc(args[0]);
                    else if (other.type == "string" || other.type == "array")
                        top.return = args[0].slice(1);
                    
                    break;
                case "⌈":
                    other.type = type_check(args[0]);
                    
                    if (other.type == "integer")
                        top.return = args[0];
                    else if (other.type == "float")
                        top.return = Math.ceil(args[0]);
                    else if (other.type == "string" || other.type == "array")
                        top.return = args[0][args[0].length - 1];
                    
                    break;
                case "⌉":
                    other.type = type_check(args[0]);
                    
                    if (other.type == "integer")
                        top.return = args[0];
                    else if (other.type == "float")
                        top.return = Number.isInteger(Math.abs(args[0]) * 2) ? args[0] < 0 ? Math.floor(args[0]) : Math.ceil(args[0]) : Math.round(args[0]);
                    else if (other.type == "string")
                        top.return = to_integer(+args[0].split("").every(s => s.codePointAt(0) <= 0x7f));
                    else if (other.type == "array" && to_integer(args[0][0]) !== null)
                        top.return = args[0].slice(0, (args[0].indexOf(null) + 1 || Infinity) - 1);
                    
                    break;
                case "¬":
                    top.return = 1n - to_boolean(args[0]);
                    
                    break;
                case "÷":
                    other.args = [to_float(args[0]), to_float(args[1])];
                    
                    try {
                        top.return = other.args[0] === null || other.args[1] === null ? null : to_integer(other.args[0] / other.args[1]);
                    } catch {
                        top.return = null;
                    }
                    
                    break;
                case " ":
                    top.return = null;
                    
                    break;
                case "!":
                    console.log(args[0]);
                    
                    top.return = args[0];
                    
                    break;
                case "*":
                    other.args = [to_number(args[0])];
                    other.args[1] = type_check(other.args[0]) == "integer" ? to_integer(args[1]) : to_float(args[1]);
                    
                    top.return = other.args[0] === null || other.args[1] === null ? null : other.args[0] * other.args[1];
                    
                    break;
                case "+":
                    other.args = [to_number(args[0])];
                    other.args[1] = type_check(other.args[0]) == "integer" ? to_integer(args[1]) : to_float(args[1]);
                    
                    top.return = other.args[0] === null || other.args[1] === null ? null : other.args[0] + other.args[1];
                    
                    break;
                case ",":
                    top.return = [args[0], args[1]];
                    
                    break;
                case "-":
                    other.args = [to_number(args[0])];
                    other.args[1] = type_check(other.args[0]) == "integer" ? to_integer(args[1]) : to_float(args[1]);
                    
                    top.return = other.args[0] === null || other.args[1] === null ? null : other.args[0] - other.args[1];
                    
                    break;
                case ".":
                    top.return = [args[0]];
                    
                    break;
                case "/":
                    other.args = [to_float(args[0]), to_float(args[1])];
                    other.return = other.args[0] === null || other.args[1] === null ? null : other.args[0] / other.args[1];
                    
                    top.return = other.return === null || Number.isNaN(other.return) ? null : other.return;
                    
                    break;
                case "0":
                case "1":
                case "2":
                case "3":
                case "4":
                case "5":
                case "6":
                case "7":
                case "8":
                case "9":
                    top.return = +code_page[data.name];
                    
                    break;
                case ":":
                    top.return = to_string(args[0]) + to_string(args[1]);
                    
                    break;
                case ";":
                    top.return = [...to_array(args[0]), ...to_array(args[1])];
                    
                    break;
                case "Q":
                    other.type = type_check(args[0]);
                    
                    if (other.type == "integer" || other.type == "float") {
                        other.args = [to_float(args[0]), to_float(args[1])];

                        try {
                            top.return = other.args[0] === null || other.args[1] === null ? null : other.args[0] ** (1 / other.args[1]);
                        } catch {
                            top.return = null;
                        }
                    } else if (other.type == "string") {
                        top.return = to_integer(args[1]) < 0 ? args[0].split("").map(s => s.repeat(Math.abs(Number(to_integer(args[1])) || 0))).reverse().join("") : args[0].split("").map(s => s.repeat(Number(to_integer(args[1])) || 0)).join("");
                    } else if (other.type == "array") {
                        top.return = to_integer(args[1]) < 0 ? [].concat.apply([], args[0].map(d => [...Array(Math.abs(Number(args[1])))].fill(d))).reverse() : [].concat.apply([], args[0].map(d => [...Array(Number(args[1]))].fill(d)));
                    }
                    
                    break;
                case "^":
                    other.type = type_check(args[0]);
                    
                    if (other.type == "integer" || other.type == "float") {
                        other.args = [to_number(args[0]), to_number(args[1])];

                        if (type_check(other.args[0]) == "float" || type_check(other.args[1]) == "float")
                            other.args = other.args.map(a => to_float(a));

                        try {
                            top.return = other.args[0] === null || other.args[1] === null ? null : other.args[0] ** other.args[1];
                        } catch {
                            top.return = null;
                        }
                    } else if (other.type == "string") {
                        top.return = to_integer(args[1]) < 0 ? args[0].repeat(Math.abs(Number(to_integer(args[1])) || 0)).split("").reverse().join("") : args[0].repeat(Number(to_integer(args[1])) || 0);
                    } else if (other.type == "array") {
                        top.return = to_integer(args[1]) < 0 ? [].concat.apply([], [...Array(Math.abs(Number(args[1])))].map(n => [...args[0]].reverse())) : [].concat.apply([], [...Array(Number(args[1]))].map(n => args[0]));
                    }
                    
                    break;
                case "_":
                    other.args = [to_number(args[0])];
                    
                    top.return = other.args[0] === null ? null : -other.args[0];
                    
                    break;
                case "a":
                    top.return = to_array(args[0]);
                    
                    break;
                case "e":
                    other.type = type_check(args[0]);
                    
                    if (other.type == "integer")
                        top.return = args[0] * 3n;
                    else if (other.type == "float")
                        top.return = args[0] * 3;
                    else if (other.type == "string")
                        top.return = args[0].split("").map(s => s == s.toUpperCase() ? s.toLowerCase() : s.toUpperCase()).join("");
                    else if (other.type == "array" && args[0].every(d => type_check(d) == "array" && d.length == args[0][0].length))
                        top.return = [...Array(args[0][0].length)].map((_, i) => args[0].map(d => d[i]));
                    
                    break;
                case "f":
                    top.return = to_float(args[0]);
                    
                    break;
                case "h":
                    other.type = type_check(args[0]);
                    
                    if (other.type == "integer")
                        top.return = args[0] / 2n;
                    else if (other.type == "float")
                        top.return = args[0] / 2;
                    else if (other.type == "string")
                        top.return = args[0].split("").map(s => s + s).join("");
                    else if (other.type == "array")
                        top.return = [].concat.apply([], args[0].map(d => [d, d]));
                    
                    break;
                case "i":
                    top.return = to_integer(args[0]);
                    
                    break;
                case "m":
                    other.type = type_check(args[0]);
                    
                    if (other.type == "integer")
                        top.return = args[0] - 1n;
                    else if (other.type == "float")
                        top.return = args[0] - 1;
                    else if (other.type == "string" || other.type == "array")
                        top.return = args[0].slice(0, -1);
                    
                    break;
                case "n":
                    top.return = to_number(args[0]);
                    
                    break;
                case "o":
                    other.type = type_check(args[0]);
                    
                    if (other.type == "integer")
                        top.return = args[0] + 1n;
                    else if (other.type == "float")
                        top.return = args[0] + 1;
                    else if (other.type == "string")
                        top.return = args[0] + args[0][args[0].length - 1];
                    else if (other.type == "array")
                        top.return = [...args[0], args[0][args[0].length - 1]];
                    
                    break;
                case "q":
                    other.type = type_check(args[0]);
                    
                    if (other.type == "integer")
                        top.return = args[0] < 0n ? null : BigInt(Math.trunc(Math.sqrt(Number(args[0]))));
                    else if (other.type == "float")
                        top.return = args[0] < 0 ? null : Math.sqrt(args[0]);
                    else if (other.type == "string")
                        top.return = to_integer(+args[0].split("").every(s => s.codePointAt(0) >= 0x20 && s.codePointAt(0) < 0x7f));
                    else if (other.type == "array")
                        top.return = args[0].some(n => type_check(to_number(n)) == "float") ? args[0].reduce((a, n) => a === null || to_float(n) === null ? null : a * to_float(n), 1) : args[0].reduce((a, n) => a === null || to_integer(n) === null ? null : a * to_integer(n), 1n);
                    
                    break;
                case "s":
                    top.return = to_string(args[0]);
                    
                    break;
                case "t":
                    other.type = type_check(args[0]);
                    
                    if (other.type == "integer")
                        top.return = args[0] * 2n;
                    else if (other.type == "float")
                        top.return = args[0] * 2;
                    else if (other.type == "string")
                        top.return = args[0] + args[0];
                    else if (other.type == "array")
                        top.return = [...args[0], ...args[0]];
                    
                    break;
                case "u":
                    other.type = type_check(args[0]);
                    
                    if (other.type == "integer")
                        top.return = args[0] ** 2n;
                    else if (other.type == "float")
                        top.return = args[0] ** 2;
                    else if (other.type == "string")
                        top.return = args[0].split("").reduce((a, s) => a + BigInt(s.codePointAt(0)), 0n);
                    else if (other.type == "array")
                        top.return = args[0].some(n => type_check(to_number(n)) == "float") ? args[0].reduce((a, n) => a === null || to_float(n) === null ? null : a + to_float(n), 0) : args[0].reduce((a, n) => a === null || to_integer(n) === null ? null : a + to_integer(n), 0n);
                    
                    break;
                case "v":
                    other.type = type_check(args[0]);
                    
                    if (other.type == "integer" || other.type == "float") {
                        other.args = [to_float(args[0])];
                        
                        top.return = other.args[0] ? 1 / other.args[0] : null;
                    } else if (other.type == "string") {
                        top.return = args[0].split("").reverse().join("");
                    } else if (other.type == "array") {
                        top.return = [...args[0]].reverse();
                    }
                    
                    break;
                default:
                    top.return = null;
                    
                    break;
            }
            
            if (stack.length == pointer.length + 2)
                stack.pop();
            
            pointer.pop();
        } else if (data.type == "function") {
            if (!top.next && data.data.length) {
                if (stack.length == pointer.length + 2)
                    stack.pop();
                
                pointer.push(0);
                
                top.next = 1;
            } else if (top.next < data.data.length) {
                if (stack.length == pointer.length + 2)
                    stack.pop();
                
                pointer.push(top.next++);
            } else {
                top.return = stack.length == pointer.length + 2 ? stack.pop().return : null;
                
                if (pointer.length) {
                    pointer.pop();
                } else {
                    stop = true;
                }
            }
        } else if (data.type == "default") {
            if (stack.length == pointer.length + 2)
                stack.pop();
            
            for (i = pointer.length; i >= 0; i--) {
                p = read_at_pointer(pointer.slice(0, i));
                
                if (p.type == "function") {
                    top.return = data.data < stack[p.length].args.length ? stack[p.length].args[data.data] : the_stack.length ? the_stack.pop() : null;

                    pointer.pop();
                    
                    break;
                }
            }
        } else if (data.type == "string") {
            if (stack.length == pointer.length + 2)
                stack.pop();
        }
    }
    
    return stack[0].return;
}
