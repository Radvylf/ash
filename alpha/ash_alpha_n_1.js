var interpret = (program = [], input = []) => {
    var code_page = [
        "↑", "↓", "←", "→", "⌈", "⌉", "⌊", "⌋", "¦", "ø", "\\n", "ƒ", "⟨", "⟩", "…", "‰",
        "†", "‡", "↕", "↔", "⌐", "¬", "∂", "∫", "Δ", "∞", "≡", "≠", "≤", "≥", "÷", "±",
        " ", "!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/",
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ":", ";", "<", "=", ">", "?",
        "@", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O",
        "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "[", "\\", "]", "^", "_",
        "`", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o",
        "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "{", "|", "}", "~", "·",
        "Ȧ", "Ḃ", "Ċ", "Ḋ", "Ė", "Ḟ", "Ġ", "Ḣ", "İ", "Ŀ", "Ṁ", "Ṅ", "Ȯ", "Ṗ", "Ṙ", "Ṡ",
        "Ṫ", "Ẇ", "Ẋ", "Ẏ", "Ż", "ȧ", "ḃ", "ċ", "ḋ", "ė", "ḟ", "ġ", "ḣ", "ŀ", "ṁ", "ṅ",
        "ȯ", "ṗ", "ṙ", "ṡ", "ṫ", "ẇ", "ẋ", "ẏ", "ż", "Ạ", "Ḅ", "Ḍ", "Ẹ", "Ḥ", "Ị", "Ḳ",
        "Ḷ", "Ṃ", "Ṇ", "Ọ", "Ṛ", "Ṣ", "Ṭ", "Ụ", "Ṿ", "Ẉ", "Ỵ", "Ẓ", "ạ", "ḅ", "ḍ", "ẹ",
        "ḥ", "ị", "ḳ", "ḷ", "ṃ", "ṇ", "ọ", "ṛ", "ṣ", "ṭ", "ụ", "ṿ", "ẉ", "ỵ", "ẓ", "↵",
        "½", "⅓", "¼", "⅕", "⅙", "⅐", "⅛", "⅑", "⅒", "⅞", "⁺", "⁻", "⁼", "⁽", "⁾", "ⁿ",
        "₀", "₁", "₂", "₃", "₄", "₅", "₆", "₇", "₈", "₉", "₊", "₋", "₌", "₍", "₎", "ₓ",
        "ɓ", "ƈ", "ɗ", "ɠ", "ɦ", "ƙ", "ɱ", "ɲ", "ƭ", "ȥ", "Ɗ", "Ɲ", "‘", "’", "“", "”"
    ];
    
    var arities = {
        "0": 0,
        "1": 0,
        "_": 1,
        "+": 2
    };
    
    // Format program and input
    
    var format_program = (data) => {
        if (typeof data == "string")
            return data.split("").map(p => code_page[((code_page.indexOf(p) + 1) || 0x21) - 1]);
        else if (typeof data == "number" || typeof data == "bigint")
            return [code_page[Number(data)] || " "];
        else if (data === null || data === undefined)
            return [];
        else if (Array.isArray(data))
            return [].concat.apply([], data.map(format_program));
        else
            throw "ERR: Invalid program format";
    };
    
    program = format_program(program);
    
    var format_input = (data) => {
        if (typeof data == "string")
            return data.split("");
        else if (typeof data == "bigint")
            return [data];
        else if (typeof data == "number")
            return [Number.isNaN(data) ? 0 : data];
        else if (data === null || data === undefined)
            return [];
        else if (Array.isArray(data))
            return [].concat.apply([], data.map(format_input));
        else
            throw "ERR: Invalid input format";
    };
    
    input = format_input(input);
    
    // String tokenization
    
    var string_token = (slice) => {
        var point = code_page.indexOf(slice[0]);

        if (point == 0x0b || point == 0x0c || point == 0x0e)
            return slice.slice(0, 2);
        if (point == 0x0d)
            return slice.slice(0, 3);
        if (point == 0x0f)
            return slice.slice(0, 5);
        if (point >= 0x80 && point <= 0x9f && point % 0x10 <= 0x04)
            return slice.slice(0, 3);
        if (point >= 0xa0 && point <= 0xdf && point % 0x10 <= 0x04)
            return slice.slice(0, 2);
        if (point >= 0xe0 && point <= 0xe3 || point == 0xeb || point == 0xec || point == 0xed)
            return [slice[0]];
        if (point == 0xe4 || point == 0xe5 || point == 0xea || point == 0xee)
            return [slice[0], ...string_token(slice.slice(1))];
        if (point >= 0xf0 && point <= 0xf9 && point != 0xf8)
            return [slice[0]];
        if (point == 0xf8 || point == 0xfa || point == 0xfb || point == 0xe8 || point == 0xe9)
            return slice.slice(0, 2);
        if (point >= 0xfc)
            return [slice[0]];

        if (point == 0xe6 || point == 0xe7) {
            var tokens = [[slice[0]]];

            for (var i = 1; (!tokens.length || code_page.indexOf(tokens[tokens.length - 1][0]) != 0xef) && i < slice.length; i += tokens[tokens.length - 1].length)
                tokens.push(string_token(slice.slice(i)));

            return tokens.flat();
        }

        return [slice[0]];
    };
    
    var implicit_string = (slice) => {
        var i, n, c;
        
        var first = slice[0];
        
        if (first.match(/[0-9.-]/)) {
            for (i = 1, n = 0; i < slice.length; i++) {
                c = slice[i];
                
                if (c.match(/[^0-9.]/) || c == "." && n++)
                    return slice.slice(0, i);
            }
        }
        
        if (first.match(/[a-zA-Z_ ]/)) {
            for (i = 1; i < slice.length; i++) {
                if (slice[i].match(/[^a-zA-Z0-9_ ,.:-]/))
                    return slice.slice(0, i);
            }
        }
        
        if (first == "'" || first == "\"") {
            for (i = 1; i < slice.length; i++) {
                c = slice[i];
                
                if (c == first && !n)
                    return slice.slice(0, i + 1);
                
                if (c == "\\")
                    n = !n;
                else
                    n = 0;
            }
        }
        
        if (first == "(" || first == "[" || first == "{") {
            for (i = 0, n = 0; i < slice.length; i++) {
                c = slice[i];
                
                if (c == first && !n)
                    return slice.slice(0, i + 1);
                
                if (c == "\\")
                    n = !n;
                else
                    n = 0;
            }
        }
    };
    
    // Tokenization
    
    var next_token = (slice) => {
        var first = slice[0];
        
        switch (first) {
            case "ƒ":
            case "…":
            case "‰":
            case "†":
            case "‡":
            case "ɓ":
            case "ƈ":
            case "ɗ":
            case "ɠ":
            case "ɦ":
            case "ƙ":
            case "ɱ":
            case "ɲ":
            case "ƭ":
            case "ȥ":
                return slice.slice(0, 2);
            case "‘":
                return [slice[0], ...string_token(slice.slice(1))];
            case "’":
                return [slice[0], ...(code_page.indexOf(slice[1]) >= 0x80 ? [slice[1]] : slice.slice(1, 3))];
            case "“":
                return [slice[0], ...implicit_string(slice.slice(1))];
            case "”":
                var string = [slice[0]];
                var position = 1;
                var token;
                
                while (token != "”" && position < slice.length) {
                    token = string_token(slice.slice(position));
                    
                    position += token.length;
                    string = string.concat(token);
                }
                
                return string;
            default:
                return [slice[0]];
        }
    };
    
    var tokenize = (string) => {
        var tokens = [];
        var token;
        var i;
        
        for (i = 0; i < string.length; i += token.length) {
            token = next_token(string.slice(i));
            
            tokens.push(token);
        }
        
        return tokens;
    };
    
    // Parse
    
    var parse = (tokens) => {
        var tree = {
            type: "function",
            data: []
        };

        var depth = 0;

        var needed_archives = [];
        var needed = [];

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
        
        var i, p;
        
        for (i = 0; i < tokens.length; i++) {
            p = tokens[i][0];

            switch (p) {
                case "\n":
                    depth = 0;

                    needed_archives = [];
                    needed = [];
                    
                    break;
                case "{":
                    insert_at_depth({
                        type: "function",
                        data: []
                    });

                    needed_archives.push(needed);
                    needed = [];

                    depth++;
                    
                    break;
                case "}":
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
                    
                    break;
                case "‘":
                case "’":
                case "“":
                case "”":
                    insert_at_depth({
                        type: "string",
                        data: tokens[i]
                    });
                    
                    break;
                default:
                    insert_at_depth({
                        type: "operator",
                        name: tokens[i].join(""),
                        data: []
                    });

                    if (needed.length)
                        needed[needed.length - 1]--;

                    if (arities[tokens[i].join("")]) {
                        needed.push(arities[tokens[i].join("")]);

                        depth++;
                    } else {
                        while (needed.length && !needed[needed.length - 1]) {
                            needed.pop();

                            depth--;
                        }
                    }
                    
                    break;
            }
        }
    
        var pointer = [];
        var data;

        var read_at_pointer = (arg_pointer = pointer) => {
            var j, t = tree;

            for (j = 0; j < arg_pointer.length; j++)
                t = t.data[arg_pointer[j]];

            return t;
        };
        
        depth = 0;

        while (1) {
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
                    break;
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
                    break;
                }
            }
        }
        
        return tree;
    };
    
    var interpret_data = (data) => {
        if (data.type == "operator") {
            switch (data.name) {
                case "0":
                    return 0;
                case "1":
                    return 1;
                case "_":
                    return -interpret_data(data.data[0]);
                case "+":
                    return interpret_data(data.data[0]) + interpret_data(data.data[1]);
                default:
                    return 0;
            }
        } else if (data.type == "function") {
            var return_data = 0;
            
            for (var i = 0; i < data.data.length; i++)
                return_data = interpret_data(data.data[i]);
            
            return return_data;
        } else if (data.type == "default") {
            return input.shift();
        } else if (data.type == "string") {
            
        }
    };
    
    return interpret_data(parse(tokenize(program)));
};
