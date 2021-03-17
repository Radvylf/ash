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
        "ɓ", "ƈ", "ɗ", "ɠ", "ɦ", "ƙ", "ɱ", "ɲ", "ƭ", "ȥ", "‹", "›", "‘", "’", "“", "”"
    ];
    
    var arities = {
        "↑": 2,
        "↓": 3,
        "←": 2,
        "→": 2,
        "⌈": 1,
        "⌉": 1,
        "⌊": 1,
        "⌋": 1,
        "¦": 1,
        "ø": 0,
        "⟨": 2,
        "⟩": 2,
        "↕": 2,
        "↔": 1,
        "⌐": 1,
        "¬": 1,
        "∂": 1,
        "∫": 1,
        "Δ": 2,
        "∞": 0,
        "≡": 1,
        "≠": 2,
        "≤": 2,
        "≥": 2,
        "÷": 2,
        "±": 2,
        " ": 0,
        "!": 1,
        "\"": 2,
        "#": 1,
        "$": 2,
        "%": 2,
        "&": 2,
        "'": 2,
        "(": 2,
        ")": 3,
        "*": 2,
        "+": 2,
        ",": 2,
        "-": 2,
        ".": 1,
        "/": 2,
        "0": 0,
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 0,
        "8": 0,
        "9": 0,
        ":": 2,
        ";": 2,
        "<": 2,
        "=": 2,
        ">": 2,
        "@": 1,
        "A": 1,
        "B": 2,
        "C": 2,
        "D": 2,
        "E": 1,
        "F": 2,
        "G": 1,
        "H": 2,
        "I": 2,
        "J": 2,
        "K": 2,
        "L": 2,
        "M": 1,
        "N": 1,
        "O": 1,
        "P": 1,
        "Q": 2,
        "R": 2,
        "S": 3,
        "T": 1,
        "U": 2,
        "V": 3,
        "W": 2,
        "X": 1,
        "Y": 1,
        "Z": 1,
        "[": 2,
        "\\": 1,
        "]": 3,
        "^": 2,
        "_": 1,
        "`": 1,
        "a": 1,
        "b": 1,
        "c": 1,
        "d": 1,
        "e": 3,
        "f": 1,
        "g": 1,
        "h": 1,
        "i": 1,
        "j": 1,
        "k": 2,
        "l": 1,
        "m": 1,
        "n": 1,
        "o": 1,
        "p": 1,
        "q": 1,
        "r": 2,
        "s": 1,
        "t": 1,
        "u": 1,
        "v": 2,
        "w": 1,
        "x": 1,
        "y": 1,
        "z": 2,
        "|": 2,
        "~": 1,
        "·": 1,
        "Ȧ": 1,
        "Ḃ": 1,
        "Ċ": 1,
        "Ḋ": 1,
        "Ė": 3,
        "Ḟ": 1,
        "Ġ": 2,
        "Ḣ": 1,
        "İ": 1,
        "Ŀ": 2,
        "Ṁ": 3,
        "Ṅ": 1,
        "Ȯ": 1,
        "Ṗ": 1,
        "Ṙ": 1,
        "Ṡ": 3,
        "Ṫ": 2,
        "Ẇ": 2,
        "Ẋ": 2,
        "Ẏ": 3,
        "Ż": 2,
        "ȧ": 1,
        "ḟ": 1,
        "ġ": 1,
        "ḣ": 1,
        "ṅ": 1,
        "ȯ": 1,
        "ṙ": 0,
        "ṡ": 1,
        "ṫ": 1,
        "ẇ": 1,
        "ż": 1,
        "↵": 0,
        "½": 0,
        "⅓": 0,
        "¼": 0,
        "⅕": 0,
        "⅙": 0,
        "⅐": 0,
        "⅛": 0,
        "⅑": 0,
        "⅒": 0,
        "⅞": 0,
        "⁺": 0,
        "⁻": 0,
        "⁼": 0,
        "⁽": 0,
        "⁾": 0,
        "ⁿ": 0,
        "₊": 1,
        "₋": 0,
        "₌": 0,
        "₍": 0,
        "₎": 1,
        "ₓ": 0
    };
    
    var type_check = (data) => {
        if (typeof data == "bigint")
            return "integer";
        if (typeof data == "number")
            return "float";
        if (typeof data == "string")
            return "string";
        if (Array.isArray(data))
            return "array";

        throw "Unknown type";
    };

    var to_integer = (data) => {
        var type = type_check(data);

        if (type == "integer")
            return data;
        if (type == "float")
            return Number.isFinite(data) ? BigInt(Math.trunc(data)) : 0n;
        if (type == "string")
            return BigInt((data.match(/-?[0-9]+/g) || [])[0] || 0);
        if (type == "array")
            return data.map(to_integer).reduce((a, n) => a + n, 0n);

        return 0n;
    };

    var to_float = (data) => {
        var type = type_check(data);

        if (type == "integer")
            return Number(data);
        if (type == "float")
            return data;
        if (type == "string")
            return +(data.match(/-?[0-9]+(\.[0-9]*)?/g) || [])[0] || 0;
        if (type == "array")
            return data.map(to_float).reduce((a, n) => a + n, 0);

        return 0n;
    };

    var to_number = (data) => {
        var type = type_check(data);
        var float = to_float(data);

        if (type == "string" || type == "array")
            return Number.isInteger(float) && Number.isFinite(float) ? to_integer(data) : float;

        return data;
    };

    var to_boolean = (data) => {
        var type = type_check(data);

        if (type == "integer")
            return data == 0n ? 0n : 1n;
        if (type == "float")
            return data == 0 ? 0n : 1n;
        if (type == "string")
            return data.length ? 1n : 0n;
        if (type == "array")
            return data.some(n => to_boolean(n)) ? 1n : 0n;

        return 0n;
    };

    var to_string = (data) => {
        var type = type_check(data);

        if (type == "integer")
            return data.toString();
        if (type == "float")
            return data.toString();
        if (type == "string")
            return data;
        if (type == "array")
            return data.map(to_string).join("");

        return "";
    };

    var to_array = (data) => {
        var type = type_check(data);

        if (type == "array")
            return [...data];
        if (type == "string")
            return data.split("");

        return [data];
    };

    var take_type = (data, from) => {
        var type = type_check(from);

        if (type == "integer")
            return to_integer(data);
        if (type == "float")
            return to_float(data);
        if (type == "string")
            return to_string(data);
        if (type == "array")
            return to_array(data);

        return data;
    };

    var is_integer = (data) => typeof data == "bigint";
    var is_float = (data) => typeof data == "number";
    var is_string = (data) => typeof data == "string";
    var is_array = (data) => Array.isArray(data);
    var is_number = (data) => is_integer(data) || is_float(data);

    var identical = (d1, d2) => {
        var type = type_check(d1);

        if (type != type_check(d2))
            return 0n;

        if (type == "array")
            return d1.length == d2.length && d1.every((d, i) => identical(d, d2[i])) ? 1n : 0n;

        return d1 == d2 ? 1n : 0n;
    };

    var to_first_number = (numbers) => numbers.length ? (is_integer(to_number(numbers[0])) ? numbers.map(to_integer) : numbers.map(to_float)) : [];
    var to_float_or_integer = (numbers) => numbers.find(n => is_float(to_number(n))) !== undefined ? numbers.map(to_float) : numbers.map(to_integer);

    var NaN_default = (number, otherwise = 0) => Number.isNaN(number) ? otherwise : number;

    var sign = (number) => is_integer(number) ? number <= 0n ? (number != 0n ? -1n : 0n) : 1n : Math.sign(number);
    var positive = (number) => number < 0 || (is_float(number) && number == 0 && 1 / number == -Infinity) ? -number : number;
    var negative = (number) => number > 0 || (is_float(number) && number == 0 && 1 / number == Infinity) ? -number : number;
    var take_sign = (number, from) => positive(number) * sign(take_type(from, number) || number);

    var add = (...numbers) => {
        numbers = to_first_number(numbers);

        return NaN_default(numbers.reduce((a, n) => a + n, take_type(0, numbers.length ? numbers[0] : 0n)));
    };

    var subtract = (...numbers) => {
        numbers = to_first_number(numbers);

        return NaN_default(numbers.reduce((a, n, i) => i > 0 ? a - n : a, numbers[0]));
    };

    var multiply = (...numbers) => {
        numbers = to_first_number(numbers);

        return NaN_default(numbers.reduce((a, n) => a * n, take_type(1, numbers.length ? numbers[0] : 0n)));
    };

    var internal_divide = (...floats) => {
        var sign = Math.sign(floats[0] ? floats[0] : 1 / floats[0]) * Math.sign(floats[1] ? floats[1] : 1 / floats[1]);
        var positives = floats.map(n => n ? positive(n) : 0);

        if (positives[0] == 0)
            return 0 * sign;

        if (positives[0] == Infinity && positives[1] == Infinity)
            return sign;

        return (positives[0] / positives[1]) * sign;
    };

    var float_divide = (...numbers) => {
        numbers = numbers.map(to_float);

        var result = numbers.reduce((a, n, i) => i > 0 ? internal_divide(a, n) : a, numbers[0]);

        return NaN_default(result);
    };

    var integer_divide = (...numbers) => {
        return to_integer(float_divide(...numbers));
    };

    var floored_division = (...numbers) => {
        return take_type(Math.floor(float_divide(...numbers)), numbers[0]);
    };

    var modulo = (...numbers) => {
        numbers = to_float_or_integer(numbers);

        return numbers[1] ? NaN_default(numbers[0] - numbers[1] * floored_division(...numbers)) : 0;
    };

    var power = (...numbers) => {
        numbers[1] = to_integer(numbers[1]);

        if (numbers[0] === 0n && numbers[1] < 0n)
            return 0n;

        var p_base = (positive(numbers[0]) ** take_type(positive(numbers[1]), numbers[0])) * take_type(take_sign(1n, numbers[0]) ** positive(numbers[1]), numbers[0]);

        return numbers[1] < 0 ? take_type(1, numbers[0]) / p_base : p_base;
    };

    var root = (...numbers) => {
        var original = numbers[0];

        numbers[0] = to_float(numbers[0]);
        numbers[1] = to_float(to_integer(numbers[1]));

        if (numbers[1] <= 0 || numbers[0] == 0 || numbers[0] < 0 && numbers[1] % 2 != 1)
            return take_type(0, original);

        if (!Number.isFinite(numbers[0]))
            return numbers[0];

        var x_k, x_kn = numbers[0] / numbers[1];

        var i = 0;

        while (x_k != x_kn && i++ < 1024) {
            x_k = x_kn;
            x_kn = ((numbers[1] - 1) * x_k + numbers[0] / (x_k ** (numbers[1] - 1))) / numbers[1];
        }

        return take_type(x_kn, original);
    };

    var logarithm = (...numbers) => {
        var original = numbers[0];

        numbers[0] = to_float(numbers[0]);
        numbers[1] = to_float(to_integer(numbers[1]));

        if (numbers[0] < 0 || numbers[1] <= 1)
            return take_type(0, original);

        return take_type(Math.log(numbers[0]) / Math.log(numbers[1]), original);
    };

    var integer_logarithm = (...numbers) => to_integer(logarithm(...numbers));

    var range = (...bounds) => {
        bounds = to_float_or_integer(bounds);

        if (is_integer(bounds[0])) {
            var array = [...Array(Number(bounds[0] < bounds[1] ? bounds[1] - bounds[0] : bounds[0] - bounds[1]))];
            var step = bounds[0] < bounds[1] ? 1n : -1n;

            return array.map((_, i) => bounds[0] + BigInt(i) * step);
        } else {
            var array = [...Array(Math.ceil(Math.abs(bounds[0] - bounds[1])))];
            var step = Math.sign(bounds[1] - bounds[0]);

            return array.map((_, i) => bounds[0] + i * step);
        }
    };

    var range_inclusive = (...bounds) => {
        bounds = to_float_or_integer(bounds);

        if (is_integer(bounds[0])) {
            var array = [...Array(Number(bounds[0] < bounds[1] ? bounds[1] - bounds[0] : bounds[0] - bounds[1]) + 1)];
            var step = bounds[0] < bounds[1] ? 1n : -1n;

            return array.map((_, i) => bounds[0] + BigInt(i) * step);
        } else {
            var array = [...Array(Math.floor(Math.abs(bounds[0] - bounds[1])) + 1)];
            var step = Math.sign(bounds[1] - bounds[0]);

            return array.map((_, i) => bounds[0] + i * step);
        }
    };

    var multiply_power = (...numbers) => {
        numbers = to_first_number(numbers);

        return multiply(numbers[0], power(numbers[2], numbers[1]));
    };

    var divide_power = (...numbers) => multiply_power(numbers[0], -to_number(numbers[1]), numbers[2]);

    var factorial = (number) => {
        number = to_integer(number);

        if (number < 0n)
            return -1n;
        if (number <= 1n)
            return 1n;

        for (var i = number - 1n; i > 1n; i--)
            number *= i;

        return number;
    };

    var distance = (...numbers) => {
        numbers = to_float_or_integer(numbers);

        if (is_integer(numbers[0]))
            return root(numbers[0] ** 2n + numbers[1] ** 2n, 2n);
        else
            return Math.sqrt(numbers[0] ** 2 + numbers[1] ** 2);
    };

    var round_to_n = (number, point) => {
        [number, point] = to_first_number([number, point]);

        if (is_integer(number))
            return point < 0 ? (number / (10n ** -point) + sign(number) * BigInt(positive(number) / (10n ** -(point + 1n)) % 10n >= 5n)) * (10n ** -point) : number;
        else
            return NaN_default(Math.round(number * (10 ** point)) / (10 ** point), number);
    };

    var fixed_point = (number, point) => {
        [number, point] = to_first_number([number, to_integer(point)]);

        var rounded = round_to_n(number, point);

        if (is_integer(number)) {
            return point < 0 ? (rounded == 0n ? "" : rounded.toString()) : number.toString() + (point == 0 ? "" : "." + "0".repeat(Number(point)));
        } else {
            return point < 0 ? (rounded == 0 ? "" : rounded.toFixed(0)) : number.toFixed(Math.min(point, 100)) + "0".repeat(Math.min(Math.max(0, point - 100), 1000000));
        }
    };

    var divisible = (number, divisor) => to_number(number) % take_type(divisor, to_number(number)) ? 0n : 1n;
    var length_divisible = (data, divisor) => data.length % to_float(divisor) ? 0n : 1n;

    var digit = (number, position) => {
        [number, position] = to_first_number([number, position]);

        if (is_integer(number))
            return position < 0n ? 0n : positive((number / (10n ** position)) % 10n);
        else
            return NaN_default(Math.abs(Math.trunc((number / (10 ** position)) % 10)));
    };

    var write_digit = (number, position, digit) => {
        [number, position, digit] = to_first_number([number, position, digit]);

        if (number == -Infinity || number == Infinity)
            return number;

        if (is_integer(number))
            return position < 0n ? number : number - ((number / (10n ** position)) % 10n - (sign(number) || 1n) * digit) * (10n ** position);
        else
            return number - (Math.trunc((number / (10 ** position)) % 10) - (Math.sign(number) || 1) * digit) * (10 ** position);
    };

    var unsigned_addition = (...numbers) => {
        numbers = to_first_number(numbers);

        if (is_integer(numbers[0]))
            return numbers.reduce((a, n, i) => i > 0 ? a + n * (sign(numbers[0]) || 1n) : a, numbers[0]);
        else
            return numbers.reduce((a, n, i) => i > 0n ? a + n * (Math.sign(numbers[0]) || 1) : a, numbers[0]);
    };

    var base_256 = (...numbers) => {
        numbers = to_first_number(numbers);

        if (is_integer(numbers[0]))
            return numbers.reduce((a, n) => a * 256n + n, 0n);
        else
            return numbers.reduce((a, n) => NaN_default(a * 256 + n), 0);
    };

    var sig_figs = (number) => number && !(is_float(number) && !Number.isFinite(number)) ? number.toString().replace(/-/, "").replace(/\.|^0(?=.)/g, "").split("").map(to_integer) : [];

    var random_to_n = (number) => {
        return take_type(Math.random() * to_float(number), number);
    };

    var default_bases = [
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
        "aA", "bB", "cC", "dD", "eE", "fF", "gG", "hH",
        "iI", "jJ", "kK", "lL", "mM", "nN", "oO", "pP",
        "qQ", "rR", "sS", "tT", "uU", "vV", "wW", "xX",
        "yY", "zZ"
    ];

    var to_base = (number, base) => {
        var original = number;

        if (number == -Infinity || number == Infinity)
            return "";

        if (is_number(base)) {
            if (base > 36 || base == -Infinity)
                return "";

            base = default_bases.slice(0, Math.max(Number(base), 0));
        } else {
            base = [...base].map(b => to_array(is_number(b) ? to_string(b) : b).map(to_string)).map(b => b.length ? b : [""]);
        }

        if (base.length < 2)
            return "";

        var result = "";

        if (is_integer(number)) {
            number = positive(number);

            while (number) {
                result = base[number % BigInt(base.length)][0] + result;
                number = number / BigInt(base.length);
            }

            return (sign(original) < 0 ? "-" : "") + (result || base[0][0]);
        } else {
            number = [Math.abs(Math.trunc(number)), Math.abs(number - Math.trunc(number))];

            while (number[0]) {
                result = base[number[0] % base.length][0] + result;
                number[0] = Math.trunc(number[0] / base.length);
            }

            result = result || base[0][0];

            var counter = (52 - Math.min(Math.log2(Math.abs(original)), 52)) / Math.log2(base.length);

            if (number[1] && counter > 0)
                result += ".";

            var trim = 0;

            while (number[1] && counter-- > 0) {
                result += base[Math.trunc(number[1] * base.length)][0];

                trim = Math.trunc(number[1] * base.length) ? 0 : trim + 1;
                number[1] = (number[1] * base.length) % 1;
            }

            result = result || base[0][0];

            return (Math.sign(original) < 0 ? "-" : "") + (trim ? result.slice(0, -trim) : result);
        }
    };

    var from_base = (string, base) => {
        var input = string[0] == "-" ? string.slice(1) : string;

        if (is_number(base)) {
            if (base > 36 || base == -Infinity)
                return "";

            base = default_bases.slice(0, Math.max(Number(base), 0));
        } else {
            base = [...base].map(b => to_array(is_number(b) ? to_string(b) : b).map(to_string)).map(b => b.length ? b : [""]);
        }

        if (base.length < 2)
            return 0n;

        if (base.find(n => n.includes(".") || n.includes("-")))
            return 0n;

        if (!input.includes(".")) {
            var number = 0n;

            while (input) {
                number = number * BigInt(base.length) + BigInt(base.findIndex(n => n.includes(input[0])) + 1 || 1) - 1n;
                input = input.slice(1);
            }

            return (string[0] == "-" ? -1n : 1n) * number;
        } else {
            var number = [0, 0];

            input = input.split(".");

            while (input[0]) {
                number[0] = number[0] * base.length + (base.findIndex(n => n.includes(input[0][0])) + 1 || 1) - 1;
                input[0] = input[0].slice(1);
            }

            while (input[1]) {
                number[1] = number[1] / base.length + ((base.findIndex(n => n.includes(input[1].slice(-1))) + 1 || 1) - 1) / 10;
                input[1] = input[1].slice(0, -1);
            }

            return (string[0] == "-" ? -1 : 1) * (number[0] + number[1]);
        }
    };

    var base_convert = (...data) => {
        if (is_number(data[0]))
            return to_base(...data);
        else if (is_string(data[0]))
            return from_base(...data);
        else
            return data[0].map(d => base_convert(d, ...data.slice(1)));
    };

    var to_number_base = (number, base) => {
        number = positive(to_integer(number));
        base = to_integer(base);

        if (base >= -1n && base <= 1n)
            return [];

        var remainder;
        var result = [];

        while (number) {
            remainder = number % base;

            result.push(remainder < 0 ? remainder - base : remainder);
            number = remainder < 0 ? number / base + 1n : number / base;
        }

        return result.reverse();
    };

    var from_number_base = (array, base) => {
        array = array.map(to_integer);
        base = to_integer(base);

        return array.reduce((a, n) => a * base + n, 0n);
    };

    var bitwise_not = (number, bits) => {
        var numbers = [positive(to_integer(number)), 0n];

        var integer_max = (...numbers) => numbers[0] < numbers[1] ? numbers[1] : numbers[0];

        if (bits === undefined)
            numbers[1] = 2n ** (logarithm(numbers[0], 2n) + BigInt(numbers[0] != 0n));
        else
            numbers[1] = 2n ** integer_max(to_integer(bits), 0n);

        numbers[0] %= numbers[1];

        for (var i = 1n; i < numbers[1]; i *= 2n)
            numbers[0] = numbers[0] & i ? numbers[0] - i : numbers[0] + i;

        return take_sign(numbers[0], number);
    };

    var bitwise_and = (...numbers) => {
        var positive = numbers.map(a => positive(to_integer(a)));

        return (sign(to_integer(numbers[0])) * sign(to_integer(numbers[1])) || 1n) * (positive[0] & positive[1]);
    };

    var bitwise_or = (...numbers) => {
        var positive = numbers.map(a => positive(to_integer(a)));

        return (sign(to_integer(numbers[0])) * sign(to_integer(numbers[1])) || 1n) * (positive[0] | positive[1]);
    };

    var bitwise_xor = (...numbers) => {
        var positive = numbers.map(a => positive(to_integer(a)));

        return (sign(to_integer(numbers[0])) * sign(to_integer(numbers[1])) || 1n) * (positive[0] ^ positive[1]);
    };

    var parity = (number) => {
        var numbers = [positive(to_integer(number)), 0n];

        numbers[1] = 2n ** (logarithm(numbers[0], 2n) + BigInt(numbers[0] != 0n));

        var parity = 0n;

        for (var i = 1n; i < numbers[1]; i *= 2n)
            parity += numbers[0] & i ? 1n : 0n;

        return parity;
    };

    var flat = (data) => [].concat.apply([], data);

    var unique = (...data) => {
        var array = flat(data.map(to_array));
        var items = [];

        for (var i = 0; i < array.length; i++)
            if (!items.find(n => identical(array[i], n)))
                items.push(array[i]);

        return take_type(items, data[0]);
    };

    var all_identical = (data) => unique(data).length == 1 ? 1n : 0n;

    var factors = (number) => {
        number = positive(to_integer(number));

        var factors = [];

        if (number > 1n)
            factors.push(1n);

        for (var i = 2n; i ** 2n <= number; i++)
            if (number % i == 0n)
                factors.push(i, number / i);

        return unique(factors).sort((a, b) => Number(a - b));
    };

    var all_factors = (number) => {
        number = positive(to_integer(number));

        var factors = [];

        for (var i = 1n; i ** 2n <= number; i++)
            if (number % i == 0n)
                factors.push(i, number / i);

        return factors.sort((a, b) => Number(a - b));
    };

    var prime_factors = (number) => {
        number = positive(to_integer(number));

        var factors = [];

        var n = 2n;

        while (number > 1n) {
            while (number % n)
                n++;

            number /= n;
            factors.push(n);
        }

        return factors;
    };

    var is_prime = (number) => {
        number = positive(to_integer(number));

        if (prime_factors(number).length != 1)
            return 0n;

        var primes = 0n;

        for (var j, i = 2n; i <= number; i++) {
            for (j = 2n; j ** 2n <= i; j++) {
                if (!(i % j)) {
                    primes--;

                    break;
                }
            }

            primes++;
        }

        return primes;
    };

    var nth_prime = (number) => {
        number = to_integer(number);

        if (number < 0n)
            return 0n;

        var i = 1n;

        while (number != 0n)
            if (is_prime(++i))
                number--;

        return i;
    };

    var nth_fibonacci = (number, first = 0n, second = 0n) => {
        number = to_integer(number);

        var initial = to_float_or_integer([first, second]);

        if (number == 0n)
            return initial[0];

        if (number < 0n) {
            for (var i = 1n; i > number; i--)
                initial = [initial[1] - initial[0], initial[0]];
        } else {
            for (var i = 1n; i < number; i++)
                initial = [initial[1], initial[0] + initial[1]];
        }

        return NaN_default(initial[1]);
    };

    var code_point = (data) => {
        if (is_number(data)) {
            try {
                return String.fromCodePoint(Number(to_integer(data)));
            } catch {
                return "";
            }
        } else if (is_string(data)) {
            return data.split("").map(c => c.codePointAt(0));
        } else {
            return data.map(c => code_point(c));
        }
    };

    var string_concat = (...data) => data.map(to_string).join("");
    var array_concat = (...data) => flat(data.map(to_array));
    var concat = (...data) => is_array(data[0]) ? flat(data.map(to_array)) : data.map(to_string).join("");

    var remove_first = (data, item) => {
        var array = to_array(data);
        var index = array.findIndex(n => identical(n, item));

        if (index == -1)
            return data;

        return take_type(array.slice(0, index).concat(array.slice(index + 1)), array);
    };

    var remove_all = (data, item) => take_type(to_array(data).filter(d => !identical(d, item)), data);

    var union = (...data) => {
        var arrays = data.map(to_array);
        var items = [];

        for (var j, k, l, i = 0; i < arrays.length; i++) {
            for (j = 0; j < arrays[i].length; j++) {
                k = arrays[i][j];
                l = arrays[i].length;
                items.push(k);

                arrays = arrays.map(a => remove_first(a, k));

                if (arrays[i].length != l)
                    j--;
            }
        }

        return take_type(items, data[0]);
    };

    var intersection = (...data) => {
        var arrays = data.map(to_array);
        var items = [];

        for (var j, k, l, i = 0; i < arrays.length; i++) {
            for (j = 0; j < arrays[i].length; j++) {
                k = arrays[i][j];

                if (arrays.every(a => a.find(n => identical(k, n)))) {
                    l = arrays[i].length;
                    items.push(k);

                    arrays = arrays.map(a => remove_first(a, k));

                    if (arrays[i].length != l)
                        j--;
                }
            }
        }

        return take_type(items, data[0]);
    };

    var difference = (...data) => {
        var arrays = data.map(to_array);
        var others = flat(arrays.slice(1));
        var items = [];

        for (var j, p, i = 0; i < arrays[0].length; i++) {
            p = 1;

            for (j = 0; j < others.length; j++) {
                if (identical(arrays[0][i], others[j])) {
                    p = 0;

                    others = array_concat(others.slice(0, j), others.slice(j + 1));

                    break;
                }
            }

            if (p)
                items.push(arrays[0][i]);
        }

        return take_type(items, data[0]);
    };

    var duplicates = (...data) => unique(difference(flat(data.map(to_array)), unique(...data)));

    var sum = (data) => add(...data);
    var product = (data) => multiply(...data);

    var greatest_common_divisor = (...numbers) => {
        numbers = numbers.map(to_integer);

        return product(intersection(...numbers.map(n => prime_factors(n))));
    };

    var least_common_multiple = (...numbers) => {
        numbers = numbers.map(to_integer);

        return product(union(...numbers.map(n => prime_factors(n))));
    };

    var is_negative = (number) => number >= 0 ? take_type(0, number) : number;
    var is_positive = (number) => number <= 0 ? take_type(0, number) : number;

    var char_case = (char) => (char == char.toUpperCase()) * 2 + (char == char.toLowerCase());
    var determine_case = (string) => string.split("").reduce((a, c) => (a[[2, 0, 1, 2][char_case(c)]]++, a), [0n, 0n, 0n]);
    var lower_case = (string) => string.toLowerCase();
    var upper_case = (string) => string.toUpperCase();
    var title_case = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();
    var invert_case = (string) => string.split("").map(c => [c, c.toUpperCase(), c.toLowerCase(), c][char_case(c)]).join("");

    var take_case = (string, from) => {
        from = to_string(from).padEnd(string.length);

        return string.split("").map((c, i) => [c, c.toLowerCase(), c.toUpperCase(), c][char_case(from[i])]).join("");
    };

    var to_2d_array = (string) => string ? string.split("\n").map(r => r.split("")) : [];

    var is_whitespace = (string) => string.split("").reduce((a, c) => a + (c == " " ? 1n : 0n) + (c == "\t" ? 2n : 0n) + (c == "\n" || c == "\r" ? 3n : 0n) + (c == "\f" ? 4n : 0n), 0n);

    var levenshtein = (...strings) => {
        strings = strings.map(to_string);

        var track = [...Array(strings[1].length + 1)].map(_ => [...Array(strings[0].length + 1)]);

        for (var i = 0; i <= strings[0].length; i++)
            track[0][i] = i;

        for (var i = 0; i <= strings[1].length; i++)
            track[i][0] = i;

        for (var j, i = 1; i <= strings[1].length; i++) {
            for (j = 1; j <= strings[0].length; j++) {
                track[i][j] = Math.min(
                    track[i][j - 1] + 1,
                    track[i - 1][j] + 1,
                    track[i - 1][j - 1] + !(strings[0][i - 1] == strings[1][j - 1])
                );
            }
        }

        return to_integer(track[strings[1].length][strings[0].length]);
    };

    var split = (string, join) => string.split(to_string(join));
    var join = (array, join) => array.map(to_string).join(to_string(join));

    var trim = (string) => string.replace(/^[ \t\n\r\f]+|[ \t\n\r\f]+$/g, "");

    var duplicate_first = (data) => data.length ? is_array(data) ? concat([data[0]], data) : data[0] + data : data;
    var sum_code_points = (data) => sum(code_point(data));

    var reverse = (data) => is_array(data) ? [...data].reverse() : to_string(data).split("").reverse().join("");

    var multiply_all = (data, amount) => {
        var array = is_array(data) ? [...data] : to_string(data).split("");

        amount = to_integer(amount);

        if (amount == 0n)
            return take_type([], data);

        if (amount < 0n) {
            amount *= -1n;
            array = array.reverse();
        }

        return take_type(flat([...Array(Number(amount))].map(_ => array)), data);
    };

    var multiply_items = (data, amount) => {
        var array = is_array(data)? [...data] : to_string(data).split("");

        amount = to_integer(amount);

        if (amount == 0n)
            return take_type([], data);

        if (amount < 0n) {
            amount *= -1n;
            array = array.reverse();
        }

        return take_type(flat(array.map(d => [...Array(Number(amount))].map(_ => d))), data);
    };

    var interleave = (...data) => {
        var arrays = data.map(to_array);

        return take_type(flat(range(0, Math.max(...arrays.map(a => a.length))).map(i => arrays.map(a => i < a.length ? a[i] : null).filter(x => x !== null))), data[0]);
    };

    var partition = (data, position) => {
        var array = is_array(data) ? [...data] : to_string(data).split("");
        var at = unique((is_string(position) ? [to_float(to_integer(position))] : to_array(position).map(to_integer).map(to_float)).map(n => Math.min(Math.max(n, -data.length), data.length)).map(n => n >= 0 ? n : n + data.length)).sort((a, b) => b - a);

        var parts = [];

        for (var i = 0; i < at.length; i++) {
            parts.push(data.slice(at[i]));

            data = data.slice(0, at[i]);
        }

        parts.push(data);

        return parts.reverse();
    };

    var partition_half = (data) => partition(data, data.length / 2);

    var swap_rows_columns = (array) => {
        array = array.map(to_array);

        if (array.find(d => d.length != array[0].length))
            return data;

        return [...Array(array[0].length)].map((_, i) => array.map(d => d[i]));
    };

    var pass_wrap = (fn) => (data) => fn([data]);

    var modes = (array) => {
        var items = [];

        if (array.length == 0)
            return [];

        for (var d, i = 0; i < array.length; i++) {
            d = items.find(n => identical(n[0], array[i]));

            if (d)
                d[1]++;
            else
                items.push([array[i], 1]);
        }

        var max = Math.max(...items.map(n => n[1]));

        return items.filter(n => n[1] == max).map(n => n[0]);
    };

    var replace_map = (data, from, to) => {
        var array = to_array(data);

        from = to_array(from);
        to = to_array(to);

        var result = [...array];

        for (var n, i = 0; i < array.length; i++) {
            n = from.findIndex(d => identical(d, array[i]));

            if (n != -1)
                result[i] = n < to.length ? to[n] : null;
        }

        return take_type(result.filter(r => r !== null), data);
    };

    var length = (data) => is_array(data) ? data.length : to_string(data).length;
    var take_length = (data, from) => data.slice(0, from.length);

    var slice_from = (data, from) => take_type(to_array(data).slice(Number(to_integer(from))), data);
    var slice_to = (data, to) => take_type(to_array(data).slice(0, Number(to_integer(to))), data);
    var slice_between = (data, from, to) => {
        var array = to_array(data);
        var bounds = [to_integer(from), to_integer(to)];

        return take_type(array.slice(Number(bounds[0]), Number(bounds[1])), data);
    };

    var rotate_left = (data, amount) => {
        var array = to_array(data);
        var bound = to_integer(amount) % to_integer(array.length);

        return take_type(concat(slice_from(array, bound), slice_to(array, bound)), data);
    };

    var rotate_right = (data, amount) => {
        var array = to_array(data);
        var bound = -to_integer(amount) % to_integer(array.length);

        return take_type(concat(slice_from(array, bound), slice_to(array, bound)), data);
    };

    var array_factorial = (data) => {
        var array = to_array(data);
        var result = [];

        for (var i = 1; i <= array.length; i++)
            result.push(array.slice(0, i));

        return result.map(r => take_type(r, data));
    };

    var cumulative_sum = (array) => {
        var numbers = to_float_or_integer(array);

        return array_factorial(numbers).map(sum);
    };

    var all_slices = (data) => {
        var array = to_array(data);
        var result = [[]];

        for (var j, i = 1; i <= array.length; i++)
            for (j = 0; j <= array.length - i; j++)
                result.push(array.slice(j, j + i));

        return result.map(r => take_type(r, data));
    };

    var combinations = (data) => {
        var array = to_array(data);
        var result = [];

        for (var j, i = 0n; i < 2n ** BigInt(array.length); i++) {
            result.push([]);

            for (j = 0; j < array.length; j++)
                if (i & 2n ** BigInt(j))
                    result[i].push(array[j]);
        }

        return result.sort((a, b) => a.length - b.length).map(r => take_type(r, data));
    };

    var orderings = (data) => {
        var array = to_array(data);
        var result = [];

        for (var a, n, f, j, i = 0n; i < factorial([BigInt(array.length)]); i++) {
            a = array;
            n = i;

            result.push([]);

            for (j = 0; j < array.length; j++) {
                f = factorial([BigInt(array.length - j - 1)]);

                result[i].push(a[n / f]);
                a = a.filter((_, k) => k != n / f);

                n %= f;
            }
        }

        return result.map(r => take_type(r, data));
    };

    var combinations_n = (data, number) => {
        var array = to_array(data);
        var number = to_integer(number);

        var result = [];

        for (var j, k = -1, i = 0n; i < 2n ** BigInt(array.length); i++) {
            if (parity([i]) != number)
                continue;

            result.push([]);
            k++;

            for (j = 0; j < array.length; j++)
                if (i & 2n ** BigInt(j))
                    result[k].push(array[j]);
        }

        return result.sort((a, b) => a.length - b.length).map(r => take_type(r, data));
    };

    var permutations = (data) => flat(combinations(data).map(n => orderings(n)));
    var permutations_without = (data) => flat(combinations(data).slice(0, -1).map(n => orderings(n)));
    var permutations_n = (data, number) => flat(combinations_n(data, number).map(n => orderings(n)));

    var count_all_items = (data) => {
        var array = to_array(data);
        var items = [];

        for (var d, i = 0; i < array.length; i++) {
            d = items.find(n => identical(n[0], array[i]));

            if (d)
                d[1]++;
            else
                items.push([array[i], 1]);
        }

        return items;
    };

    var overlapping_pairs = (data) => {
        var array = to_array(data);
        var result = [];

        for (var i = 0; i < array.length - 1; i++)
            result.push(array.slice(i, i + 2));

        return result.map(r => take_type(r, data));
    };

    var group = (data, amount) => {
        var array = to_array(data);
        var number = to_integer(amount);

        if (number == 0n)
            return [data];

        if (number < 0n) {
            number *= -1n;
            array = array.reverse();
        }

        var groups = [];

        for (var g = -1, i = 0; i < array.length; i++) {
            if (!groups.length || groups[g].length == number) {
                groups.push([]);
                g++;
            }

            groups[g].push(array[i]);
        }

        if (to_integer(amount) < 0n) {
            groups.map(r => r.reverse());
            groups.reverse();
        }

        return groups.map(r => take_type(r, data));
    };

    var item = (data, position) => {
        var array = to_array(data);
        var i = Number(to_integer(position));

        return i < 0 ? (-i <= array.length ? array[array.length + i] : 0n) : (i < array.length ? array[i] : 0n);
    };

    var write = (data, position, item) => {
        var array = [...to_array(data)];
        var i = Number(to_integer(position));

        i = i < 0 ? (-i <= array.length ? array.length + i : null) : (i < array.length ? i : null);

        if (i === null)
            return array;

        array[i] = item;

        return take_type(array, data);
    };

    var insert = (data, position, item) => {
        var array = [...to_array(data)];
        var i = Number(to_integer(position));

        i = i < 0 ? (-i <= array.length ? array.length + i : 0) : (i < array.length ? i : null);

        if (i === null)
            return take_type(concat(array, [item]), data);

        return take_type(concat(array.slice(0, i), [item], array.slice(i)), data);
    };

    var insert_merge = (data, position, item) => {
        var array = [...to_array(data)];
        var i = Number(to_integer(position));

        i = i < 0 ? (-i <= array.length ? array.length + i : 0) : (i < array.length ? i : null);

        if (i === null)
            return concat(array, item);

        return take_type(concat(array.slice(0, i), item, array.slice(i)), data);
    };

    var prepend = (data, item) => take_type(concat([[item], to_array(data)]), data);
    var append = (data, item) => take_type(concat([to_array(data), [item]]), data);

    var map_other_item = (positions, from) => {
        from = to_array(from);

        return positions.map(n => item(from, n));
    };

    var average = (array) => {
        array = to_float_or_integer(array);

        if (!array.length)
            return 0n;

        return array.reduce((a, n) => a + n, take_type(0, array[0])) / take_type(array.length, array[0]);
    };

    var random_item = (data) => {
        var array = to_array(data);

        return array[Math.random() * array.length | 0];
    };

    var compare = (...data) => {
        var types = [type_check(data[0]), type_check(data[1])];

        if (types[0] == "integer" || types[0] == "float" || types[1] == "integer" || types[1] == "float") {
            data = data.map(to_number);

            return data[0] == data[1] ? 0n : data[0] < data[1] ? -1n : 1n;
        } else if (types[0] == "string" || types[1] == "string") {
            data = data.map(to_string);

            return data[0] == data[1] ? 0n : data[0] < data[1] ? -1n : 1n;
        } else {
            data = data.map(to_array);

            for (var r, i = 0; i < Math.max(data[0].length, data[1].length); i++) {
                if (i >= data[0].length)
                    return -1n;

                if (i >= data[1].length)
                    return 1n;

                r = compare([data[0][i], data[1][i]]);

                if (r)
                    return r;
            }

            return 0n;
        }
    };

    var min = (...data) => compare(...data) != 1n ? data[0] : data[1];
    var max = (...data) => compare(...data) == 1n ? data[0] : data[1];

    var sort_min = (data) => {
        var partition = (items, from, to) => {
            var pivot_item = items[to];
            var pivot = from;

            for (var i = pivot; i < to; i++) {
                if (compare(items[i], pivot_item) == -1n) {
                    [items[pivot], items[i]] = [items[i], items[pivot]];
                    pivot++;
                }
            }

            [items[pivot], items[to]] = [items[to], items[pivot]];

            return pivot;
        };

        var quicksort = (items, from = 0, to = items.length - 1) => {
            if (from < to) {
                var pivot = partition(items, from, to);

                quicksort(items, from, pivot - 1);
                quicksort(items, pivot + 1, to);
            }

            return items;
        };

        return take_type(quicksort([...to_array(data)]), data);
    };

    var sort_max = (data) => {
        var partition = (items, from, to) => {
            var pivot_item = items[to];
            var pivot = from;

            for (var i = pivot; i < to; i++) {
                if (compare(items[i], pivot_item) == 1n) {
                    [items[pivot], items[i]] = [items[i], items[pivot]];
                    pivot++;
                }
            }

            [items[pivot], items[to]] = [items[to], items[pivot]];

            return pivot;
        };

        var quicksort = (items, from = 0, to = items.length - 1) => {
            if (from < to) {
                var pivot = partition(items, from, to);

                quicksort(items, from, pivot - 1);
                quicksort(items, pivot + 1, to);
            }

            return items;
        };

        return take_type(quicksort([...to_array(data)]), data);
    };

    var array_min = (data) => sort_min(data)[0];
    var array_max = (data) => sort_max(data)[0];

    var remove = (data, position) => {
        position = sort_max(to_array(position).map(p => to_float(to_integer(p))));
        data = [...data];

        for (var i = 0; i < position.length; i++)
            data = concat(data.slice(0, position[i]), data.slice(position[i] + 1));

        return data;
    };

    var remove_slice = (data, from, to) => {
        var slice = slice_between(range(0, data.length), from, to);

        return concat(data.slice(0, slice[0]), data.slice(slice[slice.length - 1] + 1));
    };

    var determine_order = (data) => overlapping_pairs(data).map(d => compare(...d));
    var is_sorted = (data) => {
        var order = determine_order(data);

        for (var i = 0; i < order.length; i++)
            if (order[i] != order[0])
                return 0n;

        return order[0];
    };

    var is_min_sorted = (data) => is_sorted(data) == -1n ? 1n : 0n;
    var is_max_sorted = (data) => is_sorted(data) == 1n ? 1n : 0n;

    var is_lower_case = (string) => determine_case(string)[0];
    var is_upper_case = (string) => determine_case(string)[1];

    var array_delta = (array) => overlapping_pairs(array).map(p => subtract(p[1] - p[0]));

    var array_range = (data) => {
        var numbers = to_float_or_integer(data);
        var sorted = sort_min(numbers);

        if (!numbers.length)
            return 0n;

        return sorted[sorted.length - 1] - sorted[0];
    };

    var integer_from_sig_figs = (figures) => {
        var numbers = to_array(figures).map(to_integer);

        return numbers.reduce((a, n) => a * 10n + n, 0n);
    };

    var float_from_sig_figs = (figures, power) => {
        var numbers = to_array(figures).map(to_integer);

        power = to_float(power);

        var integer = Number(numbers.reduce((a, n) => a * 10n + n, 0n));

        var i_part = Math.trunc(integer / (10 ** power));
        var f_part = (integer - i_part * (10 ** power)) / (10 ** power);

        return i_part + f_part;
    };

    var i_part = (number) => Number.isFinite(to_float(number)) ? take_type(positive(to_integer(number)), number) : Infinity;
    var f_part = (number) => Number.isFinite(to_float(number)) ? take_type(positive(to_float(number)) - to_float(i_part(number)), number) : 0;
    var n_parts = (number) => [i_part, f_part];

    var is_safe_number = (string) => to_integer(string.match(/-?[0-9]+(\.[0-9]*)?/g).length);

    var divmod = (...numbers) => [is_float(to_float_or_integer(numbers)[0]) ? float_divide(...numbers) : integer_divide(...numbers), modulo(...numbers)];

    var decimal_string = (number) => f_part(number).toString().split(".")[1] || "0";
    var group_digits = (number, amount) => group(i_part(number).toString(), amount);
    var count_digits = (number) => count_all_items(sig_figs(number));

    var is_between = (number, ...bounds) => {
        bounds = to_first_number([number, ...bounds]).slice(1);

        if (bounds[0] <= number && number <= bounds[1])
            return 1n;

        return 0n;
    };

    var to_sign = (number) => take_type(2 * to_float(number) + 1, number);

    var line_lengths = (string) => string.split("\n").map(s => s.length);
    var group_square = (string) => group(string, Math.ceil(Math.sqrt(string.length)));

    var regular = (data) => {
        if (!is_array(data))
            return 0n;

        if (!data.some(d => is_array(d)))
            return [BigInt(data.length)];

        if (data.some(d => !is_array(d)))
            return 0n;

        var regular_0 = regular(data[0]);

        return regular_0 && data.every(d => d.length == data[0].length && identical(regular(d), regular_0)) ? [BigInt(data.length), ...regular_0] : 0n;
    };

    var depth = (data) => {
        var depth = regular(data);

        return depth ? (data.length ? BigInt(depth.length) : 0n) : -1n;
    };

    var wrap_n_times = (number) => {
        number = positive(to_integer(number));

        var array = 0n;

        for (var i = 0n; i < number; i++)
            array = [array];

        return array;
    };

    var initialize_multidimensional = (dimensions) => {
        var regular = to_array(dimensions).map(n => positive(to_integer(n)));
        var array = [];

        var insert_n = (array, regular) => {
            var number = regular[0];

            if (regular.length > 1) {
                for (var i = 0; i < number; i++) {
                    array.push([]);

                    insert_n(array[i], regular.slice(1));
                }
            } else {
                for (var i = 0; i < number; i++)
                    array.push(0n);
            }
        };

        insert_n(array, regular);

        return array;
    };

    var read_multidimensional = (array, position) => {
        position = to_array(position).map(n => to_float(to_integer(n)));

        if (!is_array(array))
            return 0n;

        var i = position[0] < 0 ? (-position[0] <= array.length ? array.length + position[0] : null) : (position[0] < array.length ? position[0] : null);

        if (i === null)
            return 0n;

        if (position.length > 1)
            return read_multidimensional(array[i], position.slice(1));

        return array[i];
    };

    var write_multidimensional = (array, position, data) => {
        position = to_array(position).map(n => to_float(to_integer(n)));

        if (!is_array(array))
            return array;

        var copy = [...array];
        var i = position[0] < 0 ? (-position[0] <= array.length ? array.length + position[0] : null) : (position[0] < array.length ? position[0] : null);

        if (i === null)
            return array;

        if (position.length > 1)
            return array_concat(array.slice(0, i), [write_multidimensional(array[i], position.slice(1), data)], array.slice(i + 1));

        return array_concat(array.slice(0, i), [data], array.slice(i + 1));
    };

    var array_fibonacci = (array) => {
        array = to_first_number(array);

        if (array.length == 0)
            return [0n];

        if (array.length == 1)
            return [array[0], array[0] + take_type([1, array[0]])];

        return concat(array, array[array.length - 2] + array[array.length - 1]);
    };

    var map_to_pairs = (...data) => {
        var arrays = data.map(to_array);

        if (arrays[0].length >= arrays[1].length)
            return arrays[0].map((n, i) => i < arrays[1].length ? [n, arrays[1][i]] : [n]);
        else
            return arrays[1].map((n, i) => i < arrays[0].length ? [arrays[0][i], n] : [n]);
    };

    var mirror_horizontal = (string) => {
        var max = Math.max(...string.split("\n").map(s => s.length));

        return string.split("\n").map(s => reverse(s.padEnd(max))).join("\n");
    };

    var mirror_vertical = (string) => string.split("\n").reverse().join("\n");
    var rotate_180 = (string) => mirror_horizontal(mirror_vertical(string));

    var shift_top = (data, amount) => concat(slice_to(data, -amount), rotate_right(slice_from(data, -amount), 1));

    var pad_start = (data, length, padding) => {
        if (is_string(data))
            return to_string(padding).repeat(Math.max(Math.ceil((length - data.length) / to_string(padding).length), 0)).slice(0, length - data.length) + data;
        else
            return array_concat(multiply_all(to_array(padding), Math.max(Math.ceil((length - data.length) / to_array(padding).length), 0)).slice(0, length - data.length), data);
    };

    var pad_end = (data, length, padding) => {
        if (is_string(data))
            return data + to_string(padding).repeat(Math.max(Math.ceil((length - data.length) / to_string(padding).length), 0)).slice(0, length - data.length);
        else
            return array_concat(data, multiply_all(to_array(padding), Math.max(Math.ceil((length - data.length) / to_array(padding).length), 0)).slice(0, length - data.length));
    };

    var rotate_clockwise = (data) => {
        var max, square;

        if (is_string(data)) {
            max = Math.max(...data.split("\n").map(s => s.length));
            square = data.split("\n").map(d => d.padEnd(max));

            return range(0, max).map(i => square.map(s => s[i]).reverse().join("")).join("\n");
        } else {
            data = data.map(to_array);

            max = Math.max(...data.map(d => d.length));
            square = data.map(d => range(0, max).map(i => i < d.length ? d[i] : 0n));

            return range(0, max).map(i => square.map(d => d[i]).reverse());
        }
    };

    var rotate_n_times = (data, amount) => {
        amount = modulo(to_integer(amount), 4);

        for (var i = 0; i < amount; i++)
            data = rotate_clockwise(data);

        return data;
    };

    var read_dictionary = (array, key) => {
        var pair = array.find(d => is_array(d) && d.length && identical(d[0], key));

        return pair && pair.length > 1 ? pair[1] : 0n;
    };

    var write_dictionary = (array, key, data) => {
        var copy = [...array.map(d => is_array(d) ? [...d] : d)];
        var pair = copy.find(d => is_array(d) && d.length && identical(d[0], key));

        if (pair)
            pair[1] = data;
        else
            copy.push([key, data]);

        return copy;
    };

    var filter_code_points = (string, allow) => {
        var allow = to_array(allow).map(to_string);

        return string.split("").filter(s => allow.includes(s)).join("");
    };

    var filter_multidimensional = (arrays, dimensions) => {
        dimensions = to_array(dimensions).map(d => max(to_integer(d), 0n));
        dimensions = dimensions.slice(0, (dimensions.indexOf(0n) + 1 || dimensions.length + 1) - 1);

        var points = arrays.map(a => pad_end(take_length(to_array(a).map(d => max(to_integer(d), 0n)), dimensions), dimensions.length, 0n));

        return points.filter(p => p.every((c, i) => c < dimensions[i]));
    };

    var logical_not = (...data) => 1n - to_boolean(data[0]);
    var logical_and = (...data) => to_boolean(data[0]) ? data[1] : data[0];
    var logical_or = (...data) => to_boolean(data[0]) ? data[0] : data[1];
    var logical_nand = (...data) => to_boolean(data[0]) * to_boolean(data[1]) ? 0n : 1n;
    var logical_nor = (...data) => to_boolean(data[0]) + to_boolean(data[1]) ? 0n : 1n;
    var logical_and_not = (...data) => to_boolean(data[0]) * logical_not(data[1]);
    var logical_not_and = (...data) => logical_not(data[0]) * to_boolean(data[1]);

    var index_of = (data, find) => {
        if (is_string(data))
            return data.indexOf(to_string(find));
        else
            return data.findIndex(d => identical(d, find));
    };

    var count = (data, find) => {
        var count = 0n;

        if (is_string(data)) {
            find = to_string(find);

            var i;

            while ((i = data.indexOf(to_string(find))) != -1) {
                data = data.slice(i + to_string(find).length);
                count++;
            }

            return count;
        } else {
            return data.reduce((a, d) => a + identical(d, find), 0n);
        }
    };

    var to_alpha = (number) => {
        var integer = to_integer(number);

        return ("abcdefghijklmnopqrstuvwxyz")[modulo(integer, 26)];
    };

    var is_alpha = (string) => {
        if (string.length == 0)
            return 0n;
        if (string.length == 1)
            return to_integer("abcdefghijklmnopqrstuvwxyz".indexOf(lower_case(string)));
        return string.split("").map(is_alpha);
    };

    var is_alphanum = (string) => {
        if (string.length == 0)
            return 0n;
        if (string.length == 1)
            return to_integer("abcdefghijklmnopqrstuvwxyz0123456789".indexOf(lower_case(string)));
        return string.split("").map(is_alphanum);
    };

    var is_num = (string) => {
        if (string.length == 0)
            return 0n;
        if (string.length == 1)
            return to_integer("0123456789".indexOf(lower_case(string)));
        return string.split("").map(is_num);
    };

    var alpha_compare = (...strings) => {
        strings = strings.map(s => to_string(s).split("").find(c => is_alpha(c)));

        if (strings.includes(null))
            return 0n;

        return is_alpha(strings[0]) - is_alpha(strings[1]);
    };

    var shift_alpha = (string, amount) => string.split("").map(c => is_alpha(c) ? take_case(("abcdefghijklmnopqrstuvwxyz")[modulo((is_alpha(c) - 1n + to_integer(amount)), 26)], c) : c).join("");

    var overwrite = (string, position, data) => {
        string = to_array(string);
        position = modulo(to_integer(position), string.length);
        data = to_array(to_string(data));

        for (var i = 0; i < data.length; i++)
            string[modulo(i + position, string.length)] = data[i];

        return to_string(string);
    };

    var neighbors = (position) => {
        position = to_array(position).map(n => to_integer(n));

        var result = [];

        for (var j, i = 0n; i < 3n ** to_integer(position.length); i++) {
            result.push([]);

            for (j = 0n; j < to_integer(position.length); j++)
                result[i].push(position[j] + (i / 3n ** j) % 3n - 1n);
        }

        return concat(result.slice(0, result.length / 2 | 0), result.slice(result.length / 2 + 1 | 0));
    };

    var to_bytes = (number, bytes) => {
        number = to_integer(number);
        bytes = positive(to_integer(bytes));

        if (bytes == 0n)
            return "";

        if (number >= 0)
            return to_base(number, 16).slice(-Number(bytes) * 2).padStart(Number(bytes) * 2, "0");

        return to_base(bitwise_not((positive(number) - 1n) % (2n ** (bytes * 8n)), 8n * bytes), 16).padStart(Number(bytes) * 2, "0");
    };

    var remove_whitespace = (string) => string.replace(/[ \t\n\r\f]/g, "");
    var default_filter = (array) => array.filter(to_boolean);

    var fill = (array, data) => array.map(d => is_array(data) ? [...data] : data);
    var fill_multidimensional = (array, data) => array.map(d => is_array(d) ? fill_multidimensional(d, data) : is_array(data) ? [...data] : data);
    
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
        if (typeof data == "number" || typeof data == "bigint" || typeof data == "string")
            return [data];
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

        if (point >= 0x0b && point <= 0x0d)
            return slice.slice(0, 2);
        if (point == 0x0e)
            return slice.slice(0, 3);
        if (point == 0x0f)
            return slice.slice(0, 5);
        if (point >= 0x80 && point <= 0x9f || point >= 0xa0 && point <= 0xbf && point % 0x10 <= 0x03)
            return slice.slice(0, 2 + (point >= 0x06));
        if (point >= 0xf0 && point <= 0xf2 || point >= 0xf6 && point <= 0xf8)
            return slice.slice(0, 1);
        if (point >= 0xf3 && point <= 0xf5)
            return [...slice.slice(0, 1), ...string_token(slice.slice(1))];
        if (point == 0xf9)
            return slice.slice(0, 2);
        
        if (point == 0xfa) {
            var tokens = [slice.slice(0, 1)];
            var offset = 1;
            
            while (code_page.indexOf(tokens[tokens.length - 1][0]) != 0xfb) {
                tokens.push(string_token(slice.slice(offset)));
                
                offset += tokens[tokens.length - 1].length;
            }
            
            return flat(tokens.slice(1));
        }
        
        return slice.slice(0, 1);
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
        
        return slice[0];
    };
    
    // Tokenization
    
    var next_token = (slice) => {
        var first = slice[0];
        
        switch (first) {
            case "ƒ":
                return slice.slice(0, 3);
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
    
    var string_arguments = (string) => {
        var position = 1;
        var token;
        
        var arg_count = 0;
        
        while (position < string.length) {
            token = string_token(string.slice(position));
            
            position += token.length;
            
            if (token[0] == code_page[0xf6])
                arg_count = Math.max(arg_count, 1);
            if (token[0] == code_page[0xf7])
                arg_count = Math.max(arg_count, 2);
            if (token[0] == code_page[0xf8] || token[0] == code_page[0xf9])
                arg_count = Math.max(arg_count, 3);
        }
        
        return arg_count;
    };
    
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
                case "’":
                case "“":
                    insert_at_depth({
                        type: "string",
                        string: tokens[i],
                        data: []
                    });

                    if (needed.length)
                        needed[needed.length - 1]--;
                    
                    while (needed.length && !needed[needed.length - 1]) {
                        needed.pop();

                        depth--;
                    }
                    
                    break;
                case "‘":
                case "”":
                    insert_at_depth({
                        type: "string",
                        string: tokens[i],
                        data: []
                    });

                    if (needed.length)
                        needed[needed.length - 1]--;
                    
                    var arg_count = string_arguments(tokens[i]);
                    
                    if (arg_count) {
                        needed.push(arg_count);

                        depth++;
                    } else {
                        while (needed.length && !needed[needed.length - 1]) {
                            needed.pop();

                            depth--;
                        }
                    }
                    
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

            if (depth > pointer.length || (data.type == "operator" || data.type == "string") && !data.data.length) {
                if (data.type == "operator") {
                    for (i = 0; data.data.length < arities[data.name]; i++)
                        data.data.push({
                            type: "default",
                            data: i
                        });
                }
                
                if (data.type == "string") {
                    var arg_count = string_arguments(data.string);
                    
                    for (i = 0; data.data.length < arg_count; i++)
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
    
    var pass = (fn, before = [], after = []) => (...args) => fn(...before, ...args, ...after);
    var float_pass = (fn) => (...args) => NaN_default(fn(...args.map(to_float)));
    
    var unimplemented = (...args) => args[0];
    
    var overload = (args, integer, float, string, array) => {
        var type = type_check(args[0]);

        if (type == "integer")
            return integer(...args);
        if (type == "float")
            return float(...args);
        if (type == "string")
            return string(...args);
        if (type == "array")
            return array(...args);

        return 0n;
    };
    
    var nip = (array) => {
        if (array.length == 0)
            return 0n;
        
        if (array.length == 1)
            return array.pop();
        
        var top = array.pop();
        var data = array.pop();
        
        array.push(top);
        
        return data;
    };
    
    var tuck = (array, data) => {
        if (array.length == 0) {
            array.push(data);
            
            return data;
        }
        
        var top = array.pop();
        
        array.push(data);
        array.push(top);
        
        return data;
    };
    
    var string_registers = ["", "", "", ""];
    var string_counter = 0;
    
    var string_next_input = (data) => {
        var array = to_array(data);
        
        return array.length ? to_string(array[string_counter++ % array.length]) : "";
    };
    
    var string_input = (data, input) => {
        var array = to_array(data);
        
        return input < array.length ? to_string(array[input]) : "";
    };
    
    var string_notation = (string, data) => {
        var notation_substring = (string, data) => {
            var output = {
                width: 0,
                string: ""
            };

            var s;

            while (output.width < string.length) {
                s = string_notation(string.slice(output.width), data);

                output.width += s.width;
                output.string += s.string;

                if (string[output.width - s.width] == code_page[0xfb])
                    break;
            }

            return output;
        };
        
        switch (code_page.indexOf(string[0])) {
            case 0x0b:
                return {
                    width: 2,
                    string: String.fromCodePoint(code_page.indexOf(string[1]) + 0x80)
                };
            case 0x0c:
                return {
                    width: 2,
                    string: String.fromCodePoint(code_page.indexOf(string[1]) + 0x180)
                };
            case 0x0d:
                return {
                    width: 2,
                    string: String.fromCodePoint(code_page.indexOf(string[1]) + 0x2500)
                };
            case 0x0e:
                try {
                    return {
                        width: 3,
                        string: String.fromCodePoint(code_page.indexOf(string[1]) * 0x100 + code_page.indexOf(string[2]))
                    };
                } catch (e) {
                    return {
                        width: 3,
                        string: ""
                    };
                }
            case 0x0f:
                try {
                    return {
                        width: 5,
                        string: String.fromCodePoint(code_page.indexOf(string[1]) * 0x1000000 + code_page.indexOf(string[2]) * 0x10000 + code_page.indexOf(string[3]) * 0x100 + code_page.indexOf(string[4]))
                    };
                } catch (e) {
                    return {
                        width: 5,
                        string: ""
                    };
                }
            case 0xf0:
            case 0xf1:
            case 0xf2:
                return {
                    width: 1,
                    string: string_registers[code_page.indexOf(string[0]) - 0xf0]
                };
            case 0xf3:
            case 0xf4:
            case 0xf5:
                var register = string_notation(string.slice(1), data);
                
                string_registers[code_page.indexOf(string[0]) - 0xf3] = register.string;
                
                return {
                    width: 1 + register.width,
                    string: register.string
                };
            case 0xf6:
            case 0xf7:
                console.log(data);
                
                return {
                    width: 1,
                    string: to_string(data[code_page.indexOf(string[0]) - 0xf6])
                };
            case 0xf8:
                return {
                    width: 1,
                    string: string_next_input(data[2])
                };
            case 0xf9:
                return {
                    width: 2,
                    string: string_input(data[2], code_page.indexOf(string[1]))
                };
            case 0xfa:
                var substring = notation_substring(string.slice(1), data);
                
                return {
                    width: 1 + substring.width,
                    string: substring.string
                };
            case 0xfb:
            case 0xfc:
            case 0xfd:
            case 0xfe:
            case 0xff:
                return {
                    width: 1,
                    string: ""
                };
            default:
                return {
                    width: 1,
                    string: string[0]
                };
        }
    };
    
    var stack = [];
    
    var interpret_data = (data) => {
        if (data.type == "operator") {
            switch (data.name) {
                case "↑":
                    return overload(data.data.map(interpret_data), unimplemented, unimplemented, remove, remove);
                case "↓":
                    return overload(data.data.map(interpret_data), unimplemented, unimplemented, insert, insert);
                case "←":
                    return overload(data.data.map(interpret_data), logical_not_and, logical_not_and, prepend, prepend);
                case "→":
                    return overload(data.data.map(interpret_data), logical_and_not, logical_and_not, append, append);
                case "⌈":
                    return overload(data.data.map(interpret_data), float_pass(Math.ceil), float_pass(Math.ceil), pass(item, [], [-1]), pass(item, [], [-1]));
                case "⌉":
                    return overload(data.data.map(interpret_data), float_pass(Math.round), float_pass(Math.round), pass(slice_to, [], [-1]), pass(slice_to, [], [-1]));
                case "⌊":
                    return overload(data.data.map(interpret_data), float_pass(Math.floor), float_pass(Math.floor), pass(item, [], [0]), pass(item, [], [0]));
                case "⌋":
                    return overload(data.data.map(interpret_data), float_pass(Math.trunc), float_pass(Math.trunc), pass(slice_from, [], [1]), pass(slice_from, [], [1]));
                case "¦":
                    return code_point(interpret_data(data.data[0]));
                case "ø":
                    return [];
                case "⟨":
                    return min(...data.data.map(interpret_data));
                case "⟩":
                    return max(...data.data.map(interpret_data));
                case "↕":
                    return overload(data.data.map(interpret_data), group_digits, group_digits, group, group);
                case "↔":
                    return overload(data.data.map(interpret_data), i_part, i_part, is_safe_number, flat);
                case "⌐":
                    return overload(data.data.map(interpret_data), pass(float_divide, [1]), pass(float_divide, [1]), reverse, reverse);
                case "¬":
                    return logical_not(interpret_data(data.data[0]));
                case "∂":
                    return overload(data.data.map(interpret_data), to_alpha, to_alpha, is_alpha, array_delta);
                case "∫":
                    return overload(data.data.map(interpret_data), f_part, f_part, is_alphanum, cumulative_sum);
                case "Δ":
                    return overload(data.data.map(interpret_data), distance, distance, levenshtein, fill);
                case "∞":
                    return Infinity;
                case "≡":
                    return to_boolean(interpret_data(data.data[0]));
                case "≠":
                    return 1n - identical(...data.data.map(interpret_data));
                case "≤":
                    return BigInt(compare(...data.data.map(interpret_data)) <= 0n);
                case "≥":
                    return BigInt(compare(...data.data.map(interpret_data)) >= 0n);
                case "÷":
                    return integer_divide(...data.data.map(interpret_data));
                case "±":
                    return compare(...data.data.map(interpret_data));
                case " ":
                    return 0n;
                case "!":
                    return overload(data.data.map(interpret_data), factorial, factorial, array_factorial, array_factorial);
                case "\"":
                    return overload(data.data.map(interpret_data), logical_nor, logical_nor, index_of, index_of);
                case "#":
                    return overload(data.data.map(interpret_data), unimplemented, unimplemented, is_whitespace, regular);
                case "$":
                    return overload(data.data.map(interpret_data), bitwise_not, bitwise_not, rotate_n_times, rotate_n_times);
                case "%":
                    return modulo(...data.data.map(interpret_data));
                case "&":
                    return logical_and(...data.data.map(interpret_data));
                case "'":
                    return overload(data.data.map(interpret_data), logical_nand, logical_nand, count, count);
                case "(":
                    return overload(data.data.map(interpret_data), range, range, alpha_compare, read_dictionary);
                case ")":
                    return overload(data.data.map(interpret_data), unimplemented, unimplemented, overwrite, write_dictionary);
                case "*":
                    return multiply(...data.data.map(interpret_data));
                case "+":
                    return add(...data.data.map(interpret_data));
                case ",":
                    return [...data.data.map(interpret_data)];
                case "-":
                    return subtract(...data.data.map(interpret_data));
                case ".":
                    return [...data.data.map(interpret_data)];
                case "/":
                    return float_divide(...data.data.map(interpret_data));
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
                    return +data.name;
                case ":":
                    return string_concat(...data.data.map(interpret_data));
                case ";":
                    return array_concat(...data.data.map(interpret_data));
                case "<":
                    return BigInt(compare(...data.data.map(interpret_data)) == -1n);
                case "=":
                    return identical(...data.data.map(interpret_data));
                case ">":
                    return BigInt(compare(...data.data.map(interpret_data)) == 1n);
                case "@":
                    return overload(data.data.map(interpret_data), to_sign, to_sign, group_square, depth);
                case "A":
                    return overload(data.data.map(interpret_data), all_factors, all_factors, permutations, permutations);
                case "B":
                    return base_convert(...data.data.map(interpret_data));
                case "C":
                    return overload(data.data.map(interpret_data), bitwise_or, bitwise_or, combinations_n, combinations_n);
                case "D":
                    return overload(data.data.map(interpret_data), to_number_base, to_number_base, to_number_base, from_number_base);
                case "E":
                    return base_convert(interpret_data(data.data[0]), 16);
                case "F":
                    return overload(data.data.map(interpret_data), pass(multiply_power, [], [10n]), pass(multiply_power, [], [10]), slice_from, slice_from);
                case "G":
                    return overload(data.data.map(interpret_data), decimal_string, decimal_string, pass(group, [], [2]), pass(group, [], [2]));
                case "H":
                    return overload(data.data.map(interpret_data), bitwise_and, bitwise_and, permutations_n, permutations_n);
                case "I":
                    return overload(data.data.map(interpret_data), is_prime, is_prime, all_identical, all_identical);
                case "J":
                    return overload(data.data.map(interpret_data), fixed_point, fixed_point, shift_top, shift_top);
                case "K":
                    return overload(data.data.map(interpret_data), pass(divide_power, [], [10n]), pass(divide_power, [], [10]), slice_to, slice_to);
                case "L":
                    return overload(data.data.map(interpret_data), pass(multiply_power, [], [2n]), pass(multiply_power, [], [2]), rotate_left, rotate_left);
                case "M":
                    return overload(data.data.map(interpret_data), pass(multiply, [10n]), pass(multiply, [10]), array_min, array_min);
                case "N":
                    return base_convert(interpret_data(data.data[0]), 2);
                case "O":
                    return overload(data.data.map(interpret_data), prime_factors, prime_factors, orderings, orderings);
                case "P":
                    return overload(data.data.map(interpret_data), nth_prime, nth_prime, all_slices, all_slices);
                case "Q":
                    return overload(data.data.map(interpret_data), root, root, multiply_items, multiply_items);
                case "R":
                    return overload(data.data.map(interpret_data), pass(divide_power, [], [2n]), pass(divide_power, [], [2]), rotate_right, rotate_right);
                case "S":
                    return overload(data.data.map(interpret_data), is_between, is_between, slice_between, slice_between);
                case "T":
                    return base_convert(interpret_data(data.data[0]), 3);
                case "U":
                    return overload(data.data.map(interpret_data), bitwise_xor, bitwise_xor, shift_alpha, map_other_item);
                case "V":
                    return overload(data.data.map(interpret_data), unimplemented, unimplemented, remove_slice, remove_slice);
                case "W":
                    return overload(data.data.map(interpret_data), logarithm, logarithm, interleave, interleave);
                case "X":
                    return overload(data.data.map(interpret_data), pass(multiply, [16n]), pass(multiply, [16]), array_max, array_max);
                case "Y":
                    return overload(data.data.map(interpret_data), pass(range_inclusive, [1n]), pass(range_inclusive, [1]), overlapping_pairs, overlapping_pairs);
                case "Z":
                    return overload(data.data.map(interpret_data), pass(range, [0n]), pass(range, [0]), count_all_items, count_all_items);
                case "[":
                    return overload(data.data.map(interpret_data), digit, digit, item, item);
                case "\\":
                    return overload(data.data.map(interpret_data), wrap_n_times, wrap_n_times, to_2d_array, initialize_multidimensional);
                case "]":
                    return overload(data.data.map(interpret_data), write_digit, write_digit, write, write);
                case "^":
                    return overload(data.data.map(interpret_data), power, power, multiply_all, multiply_all);
                case "_":
                    return overload(data.data.map(interpret_data), pass(multiply, [-1n]), pass(multiply, [-1]), invert_case, (array) => to_float_or_integer(array).map(n => -n));
                case "`":
                    return overload(data.data.map(interpret_data), unimplemented, unimplemented, filter_code_points, filter_multidimensional);
                case "a":
                    return to_array(interpret_data(data.data[0]));
                case "b":
                    return overload(data.data.map(interpret_data), parity, parity, duplicates, duplicates);
                case "c":
                    return overload(data.data.map(interpret_data), factors, factors, combinations, combinations);
                case "d":
                    return overload(data.data.map(interpret_data), pass(multiply, [], [2n]), pass(multiply, [], [2]), pass(multiply_all, [], [2]), pass(multiply_all, [], [2]));
                case "e":
                    return overload(data.data.map(interpret_data), unimplemented, unimplemented, insert_merge, insert_merge);
                case "f":
                    return to_float(interpret_data(data.data[0]));
                case "g":
                    return overload(data.data.map(interpret_data), negative, negative, lower_case, sort_min);
                case "h":
                    return overload(data.data.map(interpret_data), pass(integer_divide, [], [2n]), pass(float_divide, [], [2]), partition_half, partition_half);
                case "i":
                    return to_integer(interpret_data(data.data[0]));
                case "j":
                    return overload(data.data.map(interpret_data), pass(logarithm, [], [2n]), pass(logarithm, [], [2]), mirror_horizontal, average);
                case "k":
                    return overload(data.data.map(interpret_data), take_sign, take_sign, take_case, determine_order);
                case "l":
                    return length(interpret_data(data.data[0]));
                case "m":
                    return overload(data.data.map(interpret_data), pass(add, [-1n]), pass(add, [-1]), pass(slice_between, [], [1, -1]), pass(slice_between, [], [1, -1]));
                case "n":
                    return to_number(interpret_data(data.data[0]));
                case "o":
                    return overload(data.data.map(interpret_data), pass(add, [1n]), pass(add, [1]), duplicate_first, duplicate_first);
                case "p":
                    return overload(data.data.map(interpret_data), positive, positive, upper_case, sort_max);
                case "q":
                    return overload(data.data.map(interpret_data), pass(root, [], [2n]), pass(root, [], [2]), trim, product);
                case "r":
                    return overload(data.data.map(interpret_data), round_to_n, round_to_n, float_from_sig_figs, float_from_sig_figs);
                case "s":
                    return to_string(interpret_data(data.data[0]));
                case "t":
                    return overload(data.data.map(interpret_data), pass(multiply, [], [3n]), pass(multiply, [], [3]), pass(multiply_all, [], [3]), pass(multiply_all, [], [3]));
                case "u":
                    return overload(data.data.map(interpret_data), pass(power, [], [2n]), pass(power, [], [2]), sum_code_points, sum);
                case "v":
                    return overload(data.data.map(interpret_data), unsigned_addition, unsigned_addition, partition, partition);
                case "w":
                    return overload(data.data.map(interpret_data), sign, sign, determine_case, is_sorted);
                case "x":
                    return overload(data.data.map(interpret_data), pass(logarithm, [], [10n]), pass(logarithm, [], [10]), modes, modes);
                case "y":
                    return overload(data.data.map(interpret_data), pass(modulo, [], [2n]), pass(modulo, [], [2]), unique, unique);
                case "z":
                    return overload(data.data.map(interpret_data), n_parts, n_parts, split, join);
                case "|":
                    return logical_or(...data.data.map(interpret_data));
                case "~":
                    return overload(data.data.map(interpret_data), bitwise_not, bitwise_not, rotate_clockwise, rotate_clockwise);
                case "·":
                    return overload(data.data.map(interpret_data), pass(range_inclusive, [0n]), pass(range_inclusive, [0]), array_range, array_range);
                case "Ȧ":
                    return overload(data.data.map(interpret_data), count_digits, count_digits, is_num, neighbors);
                case "Ḃ":
                    return overload(data.data.map(interpret_data), pass(divisible, [], [2n]), pass(divisible, [], [2]), pass(divisible, [], [2]), pass(length_divisible, [], [2]));
                case "Ċ":
                    return overload(data.data.map(interpret_data), pass(divisible, [], [3n]), pass(divisible, [], [3]), pass(divisible, [], [3]), pass(length_divisible, [], [3]));
                case "Ḋ":
                    return overload(data.data.map(interpret_data), pass(divisible, [], [10n]), pass(divisible, [], [10]), pass(divisible, [], [10]), pass(length_divisible, [], [10]));
                case "Ė":
                    return overload(data.data.map(interpret_data), unimplemented, unimplemented, pad_end, pad_end);
                case "Ḟ":
                    return overload(data.data.map(interpret_data), nth_fibonacci, nth_fibonacci, title_case, array_fibonacci);
                case "Ġ":
                    return overload(data.data.map(interpret_data), greatest_common_divisor, greatest_common_divisor, intersection, intersection);
                case "Ḣ":
                    return overload(data.data.map(interpret_data), unimplemented, unimplemented, rotate_180, swap_rows_columns);
                case "İ":
                    return overload(data.data.map(interpret_data), sig_figs, sig_figs, integer_from_sig_figs, integer_from_sig_figs);
                case "Ŀ":
                    return overload(data.data.map(interpret_data), least_common_multiple, least_common_multiple, union, union);
                case "Ṁ":
                    return overload(data.data.map(interpret_data), nth_fibonacci, nth_fibonacci, replace_map, replace_map);
                case "Ṅ":
                    return overload(data.data.map(interpret_data), is_negative, is_negative, is_lower_case, is_min_sorted);
                case "Ȯ":
                    return overload(data.data.map(interpret_data), pass(divisible, [], [8n]), pass(divisible, [], [8]), pass(divisible, [], [8]), pass(length_divisible, [], [8]));
                case "Ṗ":
                    return overload(data.data.map(interpret_data), is_positive, is_positive, is_upper_case, is_max_sorted);
                case "Ṙ":
                    return overload(data.data.map(interpret_data), pass(divisible, [], [5n]), pass(divisible, [], [5]), pass(divisible, [], [5]), pass(length_divisible, [], [5]));
                case "Ṡ":
                    return overload(data.data.map(interpret_data), unimplemented, unimplemented, pad_start, pad_start);
                case "Ṫ":
                    return overload(data.data.map(interpret_data), range_inclusive, range_inclusive, take_length, take_length);
                case "Ẇ":
                    return overload(data.data.map(interpret_data), divmod, divmod, difference, difference);
                case "Ẋ":
                    return overload(data.data.map(interpret_data), to_bytes, to_bytes, pass(pad_start, [], ["0"]), read_multidimensional);
                case "Ẏ":
                    return overload(data.data.map(interpret_data), unimplemented, unimplemented, unimplemented, write_multidimensional);
                case "Ż":
                    return overload(data.data.map(interpret_data), base_256, base_256, map_to_pairs, map_to_pairs);
                case "ȧ":
                    return is_array(interpret_data(data.data[0]));
                case "ḟ":
                    return is_float(interpret_data(data.data[0]));
                case "ġ":
                    return overload(data.data.map(interpret_data), pass(power, [10n]), pass(power, [10]), pass(split, [], ["\n"]), pass(join, [], ["\n"]));
                case "ḣ":
                    return overload(data.data.map(interpret_data), random_to_n, random_to_n, random_item, random_item);
                case "ṅ":
                    return is_number(interpret_data(data.data[0]));
                case "ȯ":
                    return overload(data.data.map(interpret_data), unimplemented, unimplemented, remove_whitespace, default_filter);
                case "ṙ":
                    return Math.random();
                case "ṡ":
                    return is_string(interpret_data(data.data[0]));
                case "ṫ":
                    return type_check(interpret_data(data.data[0]));
                case "ẇ":
                    return overload(data.data.map(interpret_data), pass(power, [2n]), pass(power, [2]), pass(split, [], [" "]), pass(join, [], [" "]));
                case "ż":
                    return is_integer(interpret_data(data.data[0]));
                case "↵":
                    return "\n";
                case "½":
                case "⅓":
                case "¼":
                case "⅕":
                case "⅙":
                case "⅐":
                case "⅛":
                case "⅑":
                case "⅒":
                case "⅞":
                case "⁺":
                case "⁻":
                case "⁼":
                case "⁽":
                case "⁾":
                case "ⁿ":
                    return [10, 11, 12, 13, 14, 15, 16, 64, 100, 256, 1000, 1024, 1000000, 2 ** 32, -Infinity, -1][code_page.indexOf(data.name) % 0x10];
                case "₊":
                    stack.push(interpret_data(data.data[0]));

                    return stack[stack.length - 1];
                case "₋":
                    return stack.length ? stack.pop() : 0n;
                case "₌":
                    return stack.length ? take_type(stack[stack.length - 1], stack[stack.length - 1]) : 0n;
                case "₍":
                    return nip(stack);
                case "₎":
                    return tuck(stack, interpret_data(data.data[0]));
                case "ₓ":
                    return [...stack];
            }
        } else if (data.type == "function") {
            var return_data = 0;
            
            for (var i = 0; i < data.data.length; i++)
                return_data = interpret_data(data.data[i]);
            
            return return_data;
        } else if (data.type == "default") {
            return input.shift();
        } else if (data.type == "string") {
            string_counter = 0;
            
            if (data.string[0] == "‘")
                return string_notation(data.string.slice(1), data.data.map(interpret_data)).string;
            if (data.string[0] == "’")
                return String.fromCodePoint(code_page.indexOf(data.string[1]) >= 0x80 ? code_page.indexOf(data.string[1]) : code_page.indexOf(data.string[1]) * 0x100 + code_page.indexOf(data.string[2]));
            if (data.string[0] == "“")
                return data.string.slice(1).join("");
            if (data.string[0] == "”") {
                var string = "";
                var position = 1;
                
                var substring;
                
                while (position < data.string.length) {
                    substring = string_notation(data.string.slice(position), data.data.map(interpret_data));
                    
                    position += substring.width;
                    string += substring.string;
                }
                
                return string;
            }
            
            return "";
        }
    };
    
    return interpret_data(parse(tokenize(program)));
};
