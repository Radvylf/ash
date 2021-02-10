function ash_interpret(program = [], inputs = []) {
    var code_page = [
        "¤", "∴", "∵", "∷", "⌊", "⌋", "⌈", "⌉", "¡", "¿", "⟨", "⟩", "⊷", "⊶", "⊏", "⊑",
        "¬", "∧", "∨", "⊕", "≪", "≫", "⋘", "⋙", "π", "≈", "×", "±", "≤", "≠", "≥", "÷",
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
    
    console.log("Formatted program:", program);
    
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
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0,
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
    
    // Interpretation variables
    
    var the_stack = [];
    
    var stack = [{
        args: inputs
    }];
    
    var top;
    var args;
    
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
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0,
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
            
            if (data.name >= 0x30 && data.name < 0x3a)
                top.return = data.name - 0x30;
            else if (code_page[data.name] == "_")
                top.return = -args[0];
            else if (code_page[data.name] == "+")
                top.return = args[0] + args[1];
            else if (code_page[data.name] == "!")
                console.log(top.return = args[0]);
            
            if (stack.length == pointer.length + 2)
                stack.pop();
            
            pointer.pop();
        } else if (data.type == "function") {
            if (!top.next && data.data.length) {
                if (stack.length == pointer.length + 2)
                    stack.pop();
                
                pointer.push(0);
                
                top.next = 1;
            } else if (top.next < data.data.length - 1) {
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
}
