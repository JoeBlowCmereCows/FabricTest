var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/uuid/dist/esm-browser/rng.js
function rng() {
  if (!getRandomValues) {
    getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== "undefined" && typeof msCrypto.getRandomValues === "function" && msCrypto.getRandomValues.bind(msCrypto);
    if (!getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
  }
  return getRandomValues(rnds8);
}
var getRandomValues, rnds8;
var init_rng = __esm({
  "node_modules/uuid/dist/esm-browser/rng.js"() {
    rnds8 = new Uint8Array(16);
  }
});

// node_modules/uuid/dist/esm-browser/regex.js
var regex_default;
var init_regex = __esm({
  "node_modules/uuid/dist/esm-browser/regex.js"() {
    regex_default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
  }
});

// node_modules/uuid/dist/esm-browser/validate.js
function validate(uuid) {
  return typeof uuid === "string" && regex_default.test(uuid);
}
var validate_default;
var init_validate = __esm({
  "node_modules/uuid/dist/esm-browser/validate.js"() {
    init_regex();
    validate_default = validate;
  }
});

// node_modules/uuid/dist/esm-browser/stringify.js
function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
  if (!validate_default(uuid)) {
    throw TypeError("Stringified UUID is invalid");
  }
  return uuid;
}
var byteToHex, i, stringify_default;
var init_stringify = __esm({
  "node_modules/uuid/dist/esm-browser/stringify.js"() {
    init_validate();
    byteToHex = [];
    for (i = 0; i < 256; ++i) {
      byteToHex.push((i + 256).toString(16).substr(1));
    }
    stringify_default = stringify;
  }
});

// node_modules/uuid/dist/esm-browser/v1.js
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || new Array(16);
  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== void 0 ? options.clockseq : _clockseq;
  if (node == null || clockseq == null) {
    var seedBytes = options.random || (options.rng || rng)();
    if (node == null) {
      node = _nodeId = [seedBytes[0] | 1, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }
    if (clockseq == null) {
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 16383;
    }
  }
  var msecs = options.msecs !== void 0 ? options.msecs : Date.now();
  var nsecs = options.nsecs !== void 0 ? options.nsecs : _lastNSecs + 1;
  var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 1e4;
  if (dt < 0 && options.clockseq === void 0) {
    clockseq = clockseq + 1 & 16383;
  }
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === void 0) {
    nsecs = 0;
  }
  if (nsecs >= 1e4) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }
  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;
  msecs += 122192928e5;
  var tl = ((msecs & 268435455) * 1e4 + nsecs) % 4294967296;
  b[i++] = tl >>> 24 & 255;
  b[i++] = tl >>> 16 & 255;
  b[i++] = tl >>> 8 & 255;
  b[i++] = tl & 255;
  var tmh = msecs / 4294967296 * 1e4 & 268435455;
  b[i++] = tmh >>> 8 & 255;
  b[i++] = tmh & 255;
  b[i++] = tmh >>> 24 & 15 | 16;
  b[i++] = tmh >>> 16 & 255;
  b[i++] = clockseq >>> 8 | 128;
  b[i++] = clockseq & 255;
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }
  return buf || stringify_default(b);
}
var _nodeId, _clockseq, _lastMSecs, _lastNSecs, v1_default;
var init_v1 = __esm({
  "node_modules/uuid/dist/esm-browser/v1.js"() {
    init_rng();
    init_stringify();
    _lastMSecs = 0;
    _lastNSecs = 0;
    v1_default = v1;
  }
});

// node_modules/uuid/dist/esm-browser/parse.js
function parse(uuid) {
  if (!validate_default(uuid)) {
    throw TypeError("Invalid UUID");
  }
  var v;
  var arr = new Uint8Array(16);
  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 255;
  arr[2] = v >>> 8 & 255;
  arr[3] = v & 255;
  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 255;
  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 255;
  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 255;
  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 1099511627776 & 255;
  arr[11] = v / 4294967296 & 255;
  arr[12] = v >>> 24 & 255;
  arr[13] = v >>> 16 & 255;
  arr[14] = v >>> 8 & 255;
  arr[15] = v & 255;
  return arr;
}
var parse_default;
var init_parse = __esm({
  "node_modules/uuid/dist/esm-browser/parse.js"() {
    init_validate();
    parse_default = parse;
  }
});

// node_modules/uuid/dist/esm-browser/v35.js
function stringToBytes(str) {
  str = unescape(encodeURIComponent(str));
  var bytes = [];
  for (var i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }
  return bytes;
}
function v35_default(name, version2, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    if (typeof value === "string") {
      value = stringToBytes(value);
    }
    if (typeof namespace === "string") {
      namespace = parse_default(namespace);
    }
    if (namespace.length !== 16) {
      throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
    }
    var bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 15 | version2;
    bytes[8] = bytes[8] & 63 | 128;
    if (buf) {
      offset = offset || 0;
      for (var i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }
      return buf;
    }
    return stringify_default(bytes);
  }
  try {
    generateUUID.name = name;
  } catch (err) {
  }
  generateUUID.DNS = DNS;
  generateUUID.URL = URL2;
  return generateUUID;
}
var DNS, URL2;
var init_v35 = __esm({
  "node_modules/uuid/dist/esm-browser/v35.js"() {
    init_stringify();
    init_parse();
    DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
    URL2 = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
  }
});

// node_modules/uuid/dist/esm-browser/md5.js
function md5(bytes) {
  if (typeof bytes === "string") {
    var msg = unescape(encodeURIComponent(bytes));
    bytes = new Uint8Array(msg.length);
    for (var i = 0; i < msg.length; ++i) {
      bytes[i] = msg.charCodeAt(i);
    }
  }
  return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
}
function md5ToHexEncodedArray(input) {
  var output = [];
  var length32 = input.length * 32;
  var hexTab = "0123456789abcdef";
  for (var i = 0; i < length32; i += 8) {
    var x = input[i >> 5] >>> i % 32 & 255;
    var hex = parseInt(hexTab.charAt(x >>> 4 & 15) + hexTab.charAt(x & 15), 16);
    output.push(hex);
  }
  return output;
}
function getOutputLength(inputLength8) {
  return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
function wordsToMd5(x, len) {
  x[len >> 5] |= 128 << len % 32;
  x[getOutputLength(len) - 1] = len;
  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;
  for (var i = 0; i < x.length; i += 16) {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    a = md5ff(a, b, c, d, x[i], 7, -680876936);
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x[i], 20, -373897302);
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x[i], 11, -358537222);
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5ii(a, b, c, d, x[i], 6, -198630844);
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }
  return [a, b, c, d];
}
function bytesToWords(input) {
  if (input.length === 0) {
    return [];
  }
  var length8 = input.length * 8;
  var output = new Uint32Array(getOutputLength(length8));
  for (var i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input[i / 8] & 255) << i % 32;
  }
  return output;
}
function safeAdd(x, y) {
  var lsw = (x & 65535) + (y & 65535);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 65535;
}
function bitRotateLeft(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}
function md5ff(a, b, c, d, x, s, t) {
  return md5cmn(b & c | ~b & d, a, b, x, s, t);
}
function md5gg(a, b, c, d, x, s, t) {
  return md5cmn(b & d | c & ~d, a, b, x, s, t);
}
function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}
var md5_default;
var init_md5 = __esm({
  "node_modules/uuid/dist/esm-browser/md5.js"() {
    md5_default = md5;
  }
});

// node_modules/uuid/dist/esm-browser/v3.js
var v3, v3_default;
var init_v3 = __esm({
  "node_modules/uuid/dist/esm-browser/v3.js"() {
    init_v35();
    init_md5();
    v3 = v35_default("v3", 48, md5_default);
    v3_default = v3;
  }
});

// node_modules/uuid/dist/esm-browser/v4.js
function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return stringify_default(rnds);
}
var v4_default;
var init_v4 = __esm({
  "node_modules/uuid/dist/esm-browser/v4.js"() {
    init_rng();
    init_stringify();
    v4_default = v4;
  }
});

// node_modules/uuid/dist/esm-browser/sha1.js
function f(s, x, y, z) {
  switch (s) {
    case 0:
      return x & y ^ ~x & z;
    case 1:
      return x ^ y ^ z;
    case 2:
      return x & y ^ x & z ^ y & z;
    case 3:
      return x ^ y ^ z;
  }
}
function ROTL(x, n) {
  return x << n | x >>> 32 - n;
}
function sha1(bytes) {
  var K = [1518500249, 1859775393, 2400959708, 3395469782];
  var H = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
  if (typeof bytes === "string") {
    var msg = unescape(encodeURIComponent(bytes));
    bytes = [];
    for (var i = 0; i < msg.length; ++i) {
      bytes.push(msg.charCodeAt(i));
    }
  } else if (!Array.isArray(bytes)) {
    bytes = Array.prototype.slice.call(bytes);
  }
  bytes.push(128);
  var l = bytes.length / 4 + 2;
  var N = Math.ceil(l / 16);
  var M = new Array(N);
  for (var _i = 0; _i < N; ++_i) {
    var arr = new Uint32Array(16);
    for (var j = 0; j < 16; ++j) {
      arr[j] = bytes[_i * 64 + j * 4] << 24 | bytes[_i * 64 + j * 4 + 1] << 16 | bytes[_i * 64 + j * 4 + 2] << 8 | bytes[_i * 64 + j * 4 + 3];
    }
    M[_i] = arr;
  }
  M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
  M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = (bytes.length - 1) * 8 & 4294967295;
  for (var _i2 = 0; _i2 < N; ++_i2) {
    var W = new Uint32Array(80);
    for (var t = 0; t < 16; ++t) {
      W[t] = M[_i2][t];
    }
    for (var _t = 16; _t < 80; ++_t) {
      W[_t] = ROTL(W[_t - 3] ^ W[_t - 8] ^ W[_t - 14] ^ W[_t - 16], 1);
    }
    var a = H[0];
    var b = H[1];
    var c = H[2];
    var d = H[3];
    var e = H[4];
    for (var _t2 = 0; _t2 < 80; ++_t2) {
      var s = Math.floor(_t2 / 20);
      var T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[_t2] >>> 0;
      e = d;
      d = c;
      c = ROTL(b, 30) >>> 0;
      b = a;
      a = T;
    }
    H[0] = H[0] + a >>> 0;
    H[1] = H[1] + b >>> 0;
    H[2] = H[2] + c >>> 0;
    H[3] = H[3] + d >>> 0;
    H[4] = H[4] + e >>> 0;
  }
  return [H[0] >> 24 & 255, H[0] >> 16 & 255, H[0] >> 8 & 255, H[0] & 255, H[1] >> 24 & 255, H[1] >> 16 & 255, H[1] >> 8 & 255, H[1] & 255, H[2] >> 24 & 255, H[2] >> 16 & 255, H[2] >> 8 & 255, H[2] & 255, H[3] >> 24 & 255, H[3] >> 16 & 255, H[3] >> 8 & 255, H[3] & 255, H[4] >> 24 & 255, H[4] >> 16 & 255, H[4] >> 8 & 255, H[4] & 255];
}
var sha1_default;
var init_sha1 = __esm({
  "node_modules/uuid/dist/esm-browser/sha1.js"() {
    sha1_default = sha1;
  }
});

// node_modules/uuid/dist/esm-browser/v5.js
var v5, v5_default;
var init_v5 = __esm({
  "node_modules/uuid/dist/esm-browser/v5.js"() {
    init_v35();
    init_sha1();
    v5 = v35_default("v5", 80, sha1_default);
    v5_default = v5;
  }
});

// node_modules/uuid/dist/esm-browser/nil.js
var nil_default;
var init_nil = __esm({
  "node_modules/uuid/dist/esm-browser/nil.js"() {
    nil_default = "00000000-0000-0000-0000-000000000000";
  }
});

// node_modules/uuid/dist/esm-browser/version.js
function version(uuid) {
  if (!validate_default(uuid)) {
    throw TypeError("Invalid UUID");
  }
  return parseInt(uuid.substr(14, 1), 16);
}
var version_default;
var init_version = __esm({
  "node_modules/uuid/dist/esm-browser/version.js"() {
    init_validate();
    version_default = version;
  }
});

// node_modules/uuid/dist/esm-browser/index.js
var esm_browser_exports = {};
__export(esm_browser_exports, {
  NIL: () => nil_default,
  parse: () => parse_default,
  stringify: () => stringify_default,
  v1: () => v1_default,
  v3: () => v3_default,
  v4: () => v4_default,
  v5: () => v5_default,
  validate: () => validate_default,
  version: () => version_default
});
var init_esm_browser = __esm({
  "node_modules/uuid/dist/esm-browser/index.js"() {
    init_v1();
    init_v3();
    init_v4();
    init_v5();
    init_nil();
    init_version();
    init_validate();
    init_stringify();
    init_parse();
  }
});

// node_modules/bowser/es5.js
var require_es5 = __commonJS({
  "node_modules/bowser/es5.js"(exports, module) {
    !(function(e, t) {
      "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.bowser = t() : e.bowser = t();
    })(exports, (function() {
      return (function(e) {
        var t = {};
        function r(i) {
          if (t[i]) return t[i].exports;
          var n = t[i] = { i, l: false, exports: {} };
          return e[i].call(n.exports, n, n.exports, r), n.l = true, n.exports;
        }
        return r.m = e, r.c = t, r.d = function(e2, t2, i) {
          r.o(e2, t2) || Object.defineProperty(e2, t2, { enumerable: true, get: i });
        }, r.r = function(e2) {
          "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
        }, r.t = function(e2, t2) {
          if (1 & t2 && (e2 = r(e2)), 8 & t2) return e2;
          if (4 & t2 && "object" == typeof e2 && e2 && e2.__esModule) return e2;
          var i = /* @__PURE__ */ Object.create(null);
          if (r.r(i), Object.defineProperty(i, "default", { enumerable: true, value: e2 }), 2 & t2 && "string" != typeof e2) for (var n in e2) r.d(i, n, function(t3) {
            return e2[t3];
          }.bind(null, n));
          return i;
        }, r.n = function(e2) {
          var t2 = e2 && e2.__esModule ? function() {
            return e2.default;
          } : function() {
            return e2;
          };
          return r.d(t2, "a", t2), t2;
        }, r.o = function(e2, t2) {
          return Object.prototype.hasOwnProperty.call(e2, t2);
        }, r.p = "", r(r.s = 90);
      })({ 17: function(e, t, r) {
        "use strict";
        t.__esModule = true, t.default = void 0;
        var i = r(18), n = (function() {
          function e2() {
          }
          return e2.getFirstMatch = function(e3, t2) {
            var r2 = t2.match(e3);
            return r2 && r2.length > 0 && r2[1] || "";
          }, e2.getSecondMatch = function(e3, t2) {
            var r2 = t2.match(e3);
            return r2 && r2.length > 1 && r2[2] || "";
          }, e2.matchAndReturnConst = function(e3, t2, r2) {
            if (e3.test(t2)) return r2;
          }, e2.getWindowsVersionName = function(e3) {
            switch (e3) {
              case "NT":
                return "NT";
              case "XP":
                return "XP";
              case "NT 5.0":
                return "2000";
              case "NT 5.1":
                return "XP";
              case "NT 5.2":
                return "2003";
              case "NT 6.0":
                return "Vista";
              case "NT 6.1":
                return "7";
              case "NT 6.2":
                return "8";
              case "NT 6.3":
                return "8.1";
              case "NT 10.0":
                return "10";
              default:
                return;
            }
          }, e2.getMacOSVersionName = function(e3) {
            var t2 = e3.split(".").splice(0, 2).map((function(e4) {
              return parseInt(e4, 10) || 0;
            }));
            t2.push(0);
            var r2 = t2[0], i2 = t2[1];
            if (10 === r2) switch (i2) {
              case 5:
                return "Leopard";
              case 6:
                return "Snow Leopard";
              case 7:
                return "Lion";
              case 8:
                return "Mountain Lion";
              case 9:
                return "Mavericks";
              case 10:
                return "Yosemite";
              case 11:
                return "El Capitan";
              case 12:
                return "Sierra";
              case 13:
                return "High Sierra";
              case 14:
                return "Mojave";
              case 15:
                return "Catalina";
              default:
                return;
            }
            switch (r2) {
              case 11:
                return "Big Sur";
              case 12:
                return "Monterey";
              case 13:
                return "Ventura";
              case 14:
                return "Sonoma";
              case 15:
                return "Sequoia";
              default:
                return;
            }
          }, e2.getAndroidVersionName = function(e3) {
            var t2 = e3.split(".").splice(0, 2).map((function(e4) {
              return parseInt(e4, 10) || 0;
            }));
            if (t2.push(0), !(1 === t2[0] && t2[1] < 5)) return 1 === t2[0] && t2[1] < 6 ? "Cupcake" : 1 === t2[0] && t2[1] >= 6 ? "Donut" : 2 === t2[0] && t2[1] < 2 ? "Eclair" : 2 === t2[0] && 2 === t2[1] ? "Froyo" : 2 === t2[0] && t2[1] > 2 ? "Gingerbread" : 3 === t2[0] ? "Honeycomb" : 4 === t2[0] && t2[1] < 1 ? "Ice Cream Sandwich" : 4 === t2[0] && t2[1] < 4 ? "Jelly Bean" : 4 === t2[0] && t2[1] >= 4 ? "KitKat" : 5 === t2[0] ? "Lollipop" : 6 === t2[0] ? "Marshmallow" : 7 === t2[0] ? "Nougat" : 8 === t2[0] ? "Oreo" : 9 === t2[0] ? "Pie" : void 0;
          }, e2.getVersionPrecision = function(e3) {
            return e3.split(".").length;
          }, e2.compareVersions = function(t2, r2, i2) {
            void 0 === i2 && (i2 = false);
            var n2 = e2.getVersionPrecision(t2), a = e2.getVersionPrecision(r2), o = Math.max(n2, a), s = 0, u = e2.map([t2, r2], (function(t3) {
              var r3 = o - e2.getVersionPrecision(t3), i3 = t3 + new Array(r3 + 1).join(".0");
              return e2.map(i3.split("."), (function(e3) {
                return new Array(20 - e3.length).join("0") + e3;
              })).reverse();
            }));
            for (i2 && (s = o - Math.min(n2, a)), o -= 1; o >= s; ) {
              if (u[0][o] > u[1][o]) return 1;
              if (u[0][o] === u[1][o]) {
                if (o === s) return 0;
                o -= 1;
              } else if (u[0][o] < u[1][o]) return -1;
            }
          }, e2.map = function(e3, t2) {
            var r2, i2 = [];
            if (Array.prototype.map) return Array.prototype.map.call(e3, t2);
            for (r2 = 0; r2 < e3.length; r2 += 1) i2.push(t2(e3[r2]));
            return i2;
          }, e2.find = function(e3, t2) {
            var r2, i2;
            if (Array.prototype.find) return Array.prototype.find.call(e3, t2);
            for (r2 = 0, i2 = e3.length; r2 < i2; r2 += 1) {
              var n2 = e3[r2];
              if (t2(n2, r2)) return n2;
            }
          }, e2.assign = function(e3) {
            for (var t2, r2, i2 = e3, n2 = arguments.length, a = new Array(n2 > 1 ? n2 - 1 : 0), o = 1; o < n2; o++) a[o - 1] = arguments[o];
            if (Object.assign) return Object.assign.apply(Object, [e3].concat(a));
            var s = function() {
              var e4 = a[t2];
              "object" == typeof e4 && null !== e4 && Object.keys(e4).forEach((function(t3) {
                i2[t3] = e4[t3];
              }));
            };
            for (t2 = 0, r2 = a.length; t2 < r2; t2 += 1) s();
            return e3;
          }, e2.getBrowserAlias = function(e3) {
            return i.BROWSER_ALIASES_MAP[e3];
          }, e2.getBrowserTypeByAlias = function(e3) {
            return i.BROWSER_MAP[e3] || "";
          }, e2;
        })();
        t.default = n, e.exports = t.default;
      }, 18: function(e, t, r) {
        "use strict";
        t.__esModule = true, t.ENGINE_MAP = t.OS_MAP = t.PLATFORMS_MAP = t.BROWSER_MAP = t.BROWSER_ALIASES_MAP = void 0;
        t.BROWSER_ALIASES_MAP = { AmazonBot: "amazonbot", "Amazon Silk": "amazon_silk", "Android Browser": "android", BaiduSpider: "baiduspider", Bada: "bada", BingCrawler: "bingcrawler", Brave: "brave", BlackBerry: "blackberry", "ChatGPT-User": "chatgpt_user", Chrome: "chrome", ClaudeBot: "claudebot", Chromium: "chromium", Diffbot: "diffbot", DuckDuckBot: "duckduckbot", DuckDuckGo: "duckduckgo", Electron: "electron", Epiphany: "epiphany", FacebookExternalHit: "facebookexternalhit", Firefox: "firefox", Focus: "focus", Generic: "generic", "Google Search": "google_search", Googlebot: "googlebot", GPTBot: "gptbot", "Internet Explorer": "ie", InternetArchiveCrawler: "internetarchivecrawler", "K-Meleon": "k_meleon", LibreWolf: "librewolf", Linespider: "linespider", Maxthon: "maxthon", "Meta-ExternalAds": "meta_externalads", "Meta-ExternalAgent": "meta_externalagent", "Meta-ExternalFetcher": "meta_externalfetcher", "Meta-WebIndexer": "meta_webindexer", "Microsoft Edge": "edge", "MZ Browser": "mz", "NAVER Whale Browser": "naver", "OAI-SearchBot": "oai_searchbot", Omgilibot: "omgilibot", Opera: "opera", "Opera Coast": "opera_coast", "Pale Moon": "pale_moon", PerplexityBot: "perplexitybot", "Perplexity-User": "perplexity_user", PhantomJS: "phantomjs", PingdomBot: "pingdombot", Puffin: "puffin", QQ: "qq", QQLite: "qqlite", QupZilla: "qupzilla", Roku: "roku", Safari: "safari", Sailfish: "sailfish", "Samsung Internet for Android": "samsung_internet", SlackBot: "slackbot", SeaMonkey: "seamonkey", Sleipnir: "sleipnir", "Sogou Browser": "sogou", Swing: "swing", Tizen: "tizen", "UC Browser": "uc", Vivaldi: "vivaldi", "WebOS Browser": "webos", WeChat: "wechat", YahooSlurp: "yahooslurp", "Yandex Browser": "yandex", YandexBot: "yandexbot", YouBot: "youbot" };
        t.BROWSER_MAP = { amazonbot: "AmazonBot", amazon_silk: "Amazon Silk", android: "Android Browser", baiduspider: "BaiduSpider", bada: "Bada", bingcrawler: "BingCrawler", blackberry: "BlackBerry", brave: "Brave", chatgpt_user: "ChatGPT-User", chrome: "Chrome", claudebot: "ClaudeBot", chromium: "Chromium", diffbot: "Diffbot", duckduckbot: "DuckDuckBot", duckduckgo: "DuckDuckGo", edge: "Microsoft Edge", electron: "Electron", epiphany: "Epiphany", facebookexternalhit: "FacebookExternalHit", firefox: "Firefox", focus: "Focus", generic: "Generic", google_search: "Google Search", googlebot: "Googlebot", gptbot: "GPTBot", ie: "Internet Explorer", internetarchivecrawler: "InternetArchiveCrawler", k_meleon: "K-Meleon", librewolf: "LibreWolf", linespider: "Linespider", maxthon: "Maxthon", meta_externalads: "Meta-ExternalAds", meta_externalagent: "Meta-ExternalAgent", meta_externalfetcher: "Meta-ExternalFetcher", meta_webindexer: "Meta-WebIndexer", mz: "MZ Browser", naver: "NAVER Whale Browser", oai_searchbot: "OAI-SearchBot", omgilibot: "Omgilibot", opera: "Opera", opera_coast: "Opera Coast", pale_moon: "Pale Moon", perplexitybot: "PerplexityBot", perplexity_user: "Perplexity-User", phantomjs: "PhantomJS", pingdombot: "PingdomBot", puffin: "Puffin", qq: "QQ Browser", qqlite: "QQ Browser Lite", qupzilla: "QupZilla", roku: "Roku", safari: "Safari", sailfish: "Sailfish", samsung_internet: "Samsung Internet for Android", seamonkey: "SeaMonkey", slackbot: "SlackBot", sleipnir: "Sleipnir", sogou: "Sogou Browser", swing: "Swing", tizen: "Tizen", uc: "UC Browser", vivaldi: "Vivaldi", webos: "WebOS Browser", wechat: "WeChat", yahooslurp: "YahooSlurp", yandex: "Yandex Browser", yandexbot: "YandexBot", youbot: "YouBot" };
        t.PLATFORMS_MAP = { bot: "bot", desktop: "desktop", mobile: "mobile", tablet: "tablet", tv: "tv" };
        t.OS_MAP = { Android: "Android", Bada: "Bada", BlackBerry: "BlackBerry", ChromeOS: "Chrome OS", HarmonyOS: "HarmonyOS", iOS: "iOS", Linux: "Linux", MacOS: "macOS", PlayStation4: "PlayStation 4", Roku: "Roku", Tizen: "Tizen", WebOS: "WebOS", Windows: "Windows", WindowsPhone: "Windows Phone" };
        t.ENGINE_MAP = { Blink: "Blink", EdgeHTML: "EdgeHTML", Gecko: "Gecko", Presto: "Presto", Trident: "Trident", WebKit: "WebKit" };
      }, 90: function(e, t, r) {
        "use strict";
        t.__esModule = true, t.default = void 0;
        var i, n = (i = r(91)) && i.__esModule ? i : { default: i }, a = r(18);
        function o(e2, t2) {
          for (var r2 = 0; r2 < t2.length; r2++) {
            var i2 = t2[r2];
            i2.enumerable = i2.enumerable || false, i2.configurable = true, "value" in i2 && (i2.writable = true), Object.defineProperty(e2, i2.key, i2);
          }
        }
        var s = (function() {
          function e2() {
          }
          var t2, r2, i2;
          return e2.getParser = function(e3, t3, r3) {
            if (void 0 === t3 && (t3 = false), void 0 === r3 && (r3 = null), "string" != typeof e3) throw new Error("UserAgent should be a string");
            return new n.default(e3, t3, r3);
          }, e2.parse = function(e3, t3) {
            return void 0 === t3 && (t3 = null), new n.default(e3, t3).getResult();
          }, t2 = e2, i2 = [{ key: "BROWSER_MAP", get: function() {
            return a.BROWSER_MAP;
          } }, { key: "ENGINE_MAP", get: function() {
            return a.ENGINE_MAP;
          } }, { key: "OS_MAP", get: function() {
            return a.OS_MAP;
          } }, { key: "PLATFORMS_MAP", get: function() {
            return a.PLATFORMS_MAP;
          } }], (r2 = null) && o(t2.prototype, r2), i2 && o(t2, i2), e2;
        })();
        t.default = s, e.exports = t.default;
      }, 91: function(e, t, r) {
        "use strict";
        t.__esModule = true, t.default = void 0;
        var i = u(r(92)), n = u(r(93)), a = u(r(94)), o = u(r(95)), s = u(r(17));
        function u(e2) {
          return e2 && e2.__esModule ? e2 : { default: e2 };
        }
        var d = (function() {
          function e2(e3, t3, r2) {
            if (void 0 === t3 && (t3 = false), void 0 === r2 && (r2 = null), null == e3 || "" === e3) throw new Error("UserAgent parameter can't be empty");
            this._ua = e3;
            var i2 = false;
            "boolean" == typeof t3 ? (i2 = t3, this._hints = r2) : this._hints = null != t3 && "object" == typeof t3 ? t3 : null, this.parsedResult = {}, true !== i2 && this.parse();
          }
          var t2 = e2.prototype;
          return t2.getHints = function() {
            return this._hints;
          }, t2.hasBrand = function(e3) {
            if (!this._hints || !Array.isArray(this._hints.brands)) return false;
            var t3 = e3.toLowerCase();
            return this._hints.brands.some((function(e4) {
              return e4.brand && e4.brand.toLowerCase() === t3;
            }));
          }, t2.getBrandVersion = function(e3) {
            if (this._hints && Array.isArray(this._hints.brands)) {
              var t3 = e3.toLowerCase(), r2 = this._hints.brands.find((function(e4) {
                return e4.brand && e4.brand.toLowerCase() === t3;
              }));
              return r2 ? r2.version : void 0;
            }
          }, t2.getUA = function() {
            return this._ua;
          }, t2.test = function(e3) {
            return e3.test(this._ua);
          }, t2.parseBrowser = function() {
            var e3 = this;
            this.parsedResult.browser = {};
            var t3 = s.default.find(i.default, (function(t4) {
              if ("function" == typeof t4.test) return t4.test(e3);
              if (Array.isArray(t4.test)) return t4.test.some((function(t5) {
                return e3.test(t5);
              }));
              throw new Error("Browser's test function is not valid");
            }));
            return t3 && (this.parsedResult.browser = t3.describe(this.getUA(), this)), this.parsedResult.browser;
          }, t2.getBrowser = function() {
            return this.parsedResult.browser ? this.parsedResult.browser : this.parseBrowser();
          }, t2.getBrowserName = function(e3) {
            return e3 ? String(this.getBrowser().name).toLowerCase() || "" : this.getBrowser().name || "";
          }, t2.getBrowserVersion = function() {
            return this.getBrowser().version;
          }, t2.getOS = function() {
            return this.parsedResult.os ? this.parsedResult.os : this.parseOS();
          }, t2.parseOS = function() {
            var e3 = this;
            this.parsedResult.os = {};
            var t3 = s.default.find(n.default, (function(t4) {
              if ("function" == typeof t4.test) return t4.test(e3);
              if (Array.isArray(t4.test)) return t4.test.some((function(t5) {
                return e3.test(t5);
              }));
              throw new Error("Browser's test function is not valid");
            }));
            return t3 && (this.parsedResult.os = t3.describe(this.getUA())), this.parsedResult.os;
          }, t2.getOSName = function(e3) {
            var t3 = this.getOS().name;
            return e3 ? String(t3).toLowerCase() || "" : t3 || "";
          }, t2.getOSVersion = function() {
            return this.getOS().version;
          }, t2.getPlatform = function() {
            return this.parsedResult.platform ? this.parsedResult.platform : this.parsePlatform();
          }, t2.getPlatformType = function(e3) {
            void 0 === e3 && (e3 = false);
            var t3 = this.getPlatform().type;
            return e3 ? String(t3).toLowerCase() || "" : t3 || "";
          }, t2.parsePlatform = function() {
            var e3 = this;
            this.parsedResult.platform = {};
            var t3 = s.default.find(a.default, (function(t4) {
              if ("function" == typeof t4.test) return t4.test(e3);
              if (Array.isArray(t4.test)) return t4.test.some((function(t5) {
                return e3.test(t5);
              }));
              throw new Error("Browser's test function is not valid");
            }));
            return t3 && (this.parsedResult.platform = t3.describe(this.getUA())), this.parsedResult.platform;
          }, t2.getEngine = function() {
            return this.parsedResult.engine ? this.parsedResult.engine : this.parseEngine();
          }, t2.getEngineName = function(e3) {
            return e3 ? String(this.getEngine().name).toLowerCase() || "" : this.getEngine().name || "";
          }, t2.parseEngine = function() {
            var e3 = this;
            this.parsedResult.engine = {};
            var t3 = s.default.find(o.default, (function(t4) {
              if ("function" == typeof t4.test) return t4.test(e3);
              if (Array.isArray(t4.test)) return t4.test.some((function(t5) {
                return e3.test(t5);
              }));
              throw new Error("Browser's test function is not valid");
            }));
            return t3 && (this.parsedResult.engine = t3.describe(this.getUA())), this.parsedResult.engine;
          }, t2.parse = function() {
            return this.parseBrowser(), this.parseOS(), this.parsePlatform(), this.parseEngine(), this;
          }, t2.getResult = function() {
            return s.default.assign({}, this.parsedResult);
          }, t2.satisfies = function(e3) {
            var t3 = this, r2 = {}, i2 = 0, n2 = {}, a2 = 0;
            if (Object.keys(e3).forEach((function(t4) {
              var o3 = e3[t4];
              "string" == typeof o3 ? (n2[t4] = o3, a2 += 1) : "object" == typeof o3 && (r2[t4] = o3, i2 += 1);
            })), i2 > 0) {
              var o2 = Object.keys(r2), u2 = s.default.find(o2, (function(e4) {
                return t3.isOS(e4);
              }));
              if (u2) {
                var d2 = this.satisfies(r2[u2]);
                if (void 0 !== d2) return d2;
              }
              var c = s.default.find(o2, (function(e4) {
                return t3.isPlatform(e4);
              }));
              if (c) {
                var f2 = this.satisfies(r2[c]);
                if (void 0 !== f2) return f2;
              }
            }
            if (a2 > 0) {
              var l = Object.keys(n2), b = s.default.find(l, (function(e4) {
                return t3.isBrowser(e4, true);
              }));
              if (void 0 !== b) return this.compareVersion(n2[b]);
            }
          }, t2.isBrowser = function(e3, t3) {
            void 0 === t3 && (t3 = false);
            var r2 = this.getBrowserName().toLowerCase(), i2 = e3.toLowerCase(), n2 = s.default.getBrowserTypeByAlias(i2);
            return t3 && n2 && (i2 = n2.toLowerCase()), i2 === r2;
          }, t2.compareVersion = function(e3) {
            var t3 = [0], r2 = e3, i2 = false, n2 = this.getBrowserVersion();
            if ("string" == typeof n2) return ">" === e3[0] || "<" === e3[0] ? (r2 = e3.substr(1), "=" === e3[1] ? (i2 = true, r2 = e3.substr(2)) : t3 = [], ">" === e3[0] ? t3.push(1) : t3.push(-1)) : "=" === e3[0] ? r2 = e3.substr(1) : "~" === e3[0] && (i2 = true, r2 = e3.substr(1)), t3.indexOf(s.default.compareVersions(n2, r2, i2)) > -1;
          }, t2.isOS = function(e3) {
            return this.getOSName(true) === String(e3).toLowerCase();
          }, t2.isPlatform = function(e3) {
            return this.getPlatformType(true) === String(e3).toLowerCase();
          }, t2.isEngine = function(e3) {
            return this.getEngineName(true) === String(e3).toLowerCase();
          }, t2.is = function(e3, t3) {
            return void 0 === t3 && (t3 = false), this.isBrowser(e3, t3) || this.isOS(e3) || this.isPlatform(e3);
          }, t2.some = function(e3) {
            var t3 = this;
            return void 0 === e3 && (e3 = []), e3.some((function(e4) {
              return t3.is(e4);
            }));
          }, e2;
        })();
        t.default = d, e.exports = t.default;
      }, 92: function(e, t, r) {
        "use strict";
        t.__esModule = true, t.default = void 0;
        var i, n = (i = r(17)) && i.__esModule ? i : { default: i };
        var a = /version\/(\d+(\.?_?\d+)+)/i, o = [{ test: [/gptbot/i], describe: function(e2) {
          var t2 = { name: "GPTBot" }, r2 = n.default.getFirstMatch(/gptbot\/(\d+(\.\d+)+)/i, e2) || n.default.getFirstMatch(a, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/chatgpt-user/i], describe: function(e2) {
          var t2 = { name: "ChatGPT-User" }, r2 = n.default.getFirstMatch(/chatgpt-user\/(\d+(\.\d+)+)/i, e2) || n.default.getFirstMatch(a, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/oai-searchbot/i], describe: function(e2) {
          var t2 = { name: "OAI-SearchBot" }, r2 = n.default.getFirstMatch(/oai-searchbot\/(\d+(\.\d+)+)/i, e2) || n.default.getFirstMatch(a, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/claudebot/i, /claude-web/i, /claude-user/i, /claude-searchbot/i], describe: function(e2) {
          var t2 = { name: "ClaudeBot" }, r2 = n.default.getFirstMatch(/(?:claudebot|claude-web|claude-user|claude-searchbot)\/(\d+(\.\d+)+)/i, e2) || n.default.getFirstMatch(a, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/omgilibot/i, /webzio-extended/i], describe: function(e2) {
          var t2 = { name: "Omgilibot" }, r2 = n.default.getFirstMatch(/(?:omgilibot|webzio-extended)\/(\d+(\.\d+)+)/i, e2) || n.default.getFirstMatch(a, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/diffbot/i], describe: function(e2) {
          var t2 = { name: "Diffbot" }, r2 = n.default.getFirstMatch(/diffbot\/(\d+(\.\d+)+)/i, e2) || n.default.getFirstMatch(a, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/perplexitybot/i], describe: function(e2) {
          var t2 = { name: "PerplexityBot" }, r2 = n.default.getFirstMatch(/perplexitybot\/(\d+(\.\d+)+)/i, e2) || n.default.getFirstMatch(a, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/perplexity-user/i], describe: function(e2) {
          var t2 = { name: "Perplexity-User" }, r2 = n.default.getFirstMatch(/perplexity-user\/(\d+(\.\d+)+)/i, e2) || n.default.getFirstMatch(a, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/youbot/i], describe: function(e2) {
          var t2 = { name: "YouBot" }, r2 = n.default.getFirstMatch(/youbot\/(\d+(\.\d+)+)/i, e2) || n.default.getFirstMatch(a, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/meta-webindexer/i], describe: function(e2) {
          var t2 = { name: "Meta-WebIndexer" }, r2 = n.default.getFirstMatch(/meta-webindexer\/(\d+(\.\d+)+)/i, e2) || n.default.getFirstMatch(a, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/meta-externalads/i], describe: function(e2) {
          var t2 = { name: "Meta-ExternalAds" }, r2 = n.default.getFirstMatch(/meta-externalads\/(\d+(\.\d+)+)/i, e2) || n.default.getFirstMatch(a, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/meta-externalagent/i], describe: function(e2) {
          var t2 = { name: "Meta-ExternalAgent" }, r2 = n.default.getFirstMatch(/meta-externalagent\/(\d+(\.\d+)+)/i, e2) || n.default.getFirstMatch(a, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/meta-externalfetcher/i], describe: function(e2) {
          var t2 = { name: "Meta-ExternalFetcher" }, r2 = n.default.getFirstMatch(/meta-externalfetcher\/(\d+(\.\d+)+)/i, e2) || n.default.getFirstMatch(a, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/googlebot/i], describe: function(e2) {
          var t2 = { name: "Googlebot" }, r2 = n.default.getFirstMatch(/googlebot\/(\d+(\.\d+))/i, e2) || n.default.getFirstMatch(a, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/linespider/i], describe: function(e2) {
          var t2 = { name: "Linespider" }, r2 = n.default.getFirstMatch(/(?:linespider)(?:-[-\w]+)?[\s/](\d+(\.\d+)+)/i, e2) || n.default.getFirstMatch(a, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/amazonbot/i], describe: function(e2) {
          var t2 = { name: "AmazonBot" }, r2 = n.default.getFirstMatch(/amazonbot\/(\d+(\.\d+)+)/i, e2) || n.default.getFirstMatch(a, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/bingbot/i], describe: function(e2) {
          var t2 = { name: "BingCrawler" }, r2 = n.default.getFirstMatch(/bingbot\/(\d+(\.\d+)+)/i, e2) || n.default.getFirstMatch(a, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/baiduspider/i], describe: function(e2) {
          var t2 = { name: "BaiduSpider" }, r2 = n.default.getFirstMatch(/baiduspider\/(\d+(\.\d+)+)/i, e2) || n.default.getFirstMatch(a, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/duckduckbot/i], describe: function(e2) {
          var t2 = { name: "DuckDuckBot" }, r2 = n.default.getFirstMatch(/duckduckbot\/(\d+(\.\d+)+)/i, e2) || n.default.getFirstMatch(a, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/ia_archiver/i], describe: function(e2) {
          var t2 = { name: "InternetArchiveCrawler" }, r2 = n.default.getFirstMatch(/ia_archiver\/(\d+(\.\d+)+)/i, e2) || n.default.getFirstMatch(a, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/facebookexternalhit/i, /facebookcatalog/i], describe: function() {
          return { name: "FacebookExternalHit" };
        } }, { test: [/slackbot/i, /slack-imgProxy/i], describe: function(e2) {
          var t2 = { name: "SlackBot" }, r2 = n.default.getFirstMatch(/(?:slackbot|slack-imgproxy)(?:-[-\w]+)?[\s/](\d+(\.\d+)+)/i, e2) || n.default.getFirstMatch(a, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/yahoo!?[\s/]*slurp/i], describe: function() {
          return { name: "YahooSlurp" };
        } }, { test: [/yandexbot/i, /yandexmobilebot/i], describe: function() {
          return { name: "YandexBot" };
        } }, { test: [/pingdom/i], describe: function() {
          return { name: "PingdomBot" };
        } }, { test: [/opera/i], describe: function(e2) {
          var t2 = { name: "Opera" }, r2 = n.default.getFirstMatch(a, e2) || n.default.getFirstMatch(/(?:opera)[\s/](\d+(\.?_?\d+)+)/i, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/opr\/|opios/i], describe: function(e2) {
          var t2 = { name: "Opera" }, r2 = n.default.getFirstMatch(/(?:opr|opios)[\s/](\S+)/i, e2) || n.default.getFirstMatch(a, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/SamsungBrowser/i], describe: function(e2) {
          var t2 = { name: "Samsung Internet for Android" }, r2 = n.default.getFirstMatch(a, e2) || n.default.getFirstMatch(/(?:SamsungBrowser)[\s/](\d+(\.?_?\d+)+)/i, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/Whale/i], describe: function(e2) {
          var t2 = { name: "NAVER Whale Browser" }, r2 = n.default.getFirstMatch(a, e2) || n.default.getFirstMatch(/(?:whale)[\s/](\d+(?:\.\d+)+)/i, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/PaleMoon/i], describe: function(e2) {
          var t2 = { name: "Pale Moon" }, r2 = n.default.getFirstMatch(a, e2) || n.default.getFirstMatch(/(?:PaleMoon)[\s/](\d+(?:\.\d+)+)/i, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/MZBrowser/i], describe: function(e2) {
          var t2 = { name: "MZ Browser" }, r2 = n.default.getFirstMatch(/(?:MZBrowser)[\s/](\d+(?:\.\d+)+)/i, e2) || n.default.getFirstMatch(a, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/focus/i], describe: function(e2) {
          var t2 = { name: "Focus" }, r2 = n.default.getFirstMatch(/(?:focus)[\s/](\d+(?:\.\d+)+)/i, e2) || n.default.getFirstMatch(a, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/swing/i], describe: function(e2) {
          var t2 = { name: "Swing" }, r2 = n.default.getFirstMatch(/(?:swing)[\s/](\d+(?:\.\d+)+)/i, e2) || n.default.getFirstMatch(a, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/coast/i], describe: function(e2) {
          var t2 = { name: "Opera Coast" }, r2 = n.default.getFirstMatch(a, e2) || n.default.getFirstMatch(/(?:coast)[\s/](\d+(\.?_?\d+)+)/i, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/opt\/\d+(?:.?_?\d+)+/i], describe: function(e2) {
          var t2 = { name: "Opera Touch" }, r2 = n.default.getFirstMatch(/(?:opt)[\s/](\d+(\.?_?\d+)+)/i, e2) || n.default.getFirstMatch(a, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/yabrowser/i], describe: function(e2) {
          var t2 = { name: "Yandex Browser" }, r2 = n.default.getFirstMatch(/(?:yabrowser)[\s/](\d+(\.?_?\d+)+)/i, e2) || n.default.getFirstMatch(a, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/ucbrowser/i], describe: function(e2) {
          var t2 = { name: "UC Browser" }, r2 = n.default.getFirstMatch(a, e2) || n.default.getFirstMatch(/(?:ucbrowser)[\s/](\d+(\.?_?\d+)+)/i, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/Maxthon|mxios/i], describe: function(e2) {
          var t2 = { name: "Maxthon" }, r2 = n.default.getFirstMatch(a, e2) || n.default.getFirstMatch(/(?:Maxthon|mxios)[\s/](\d+(\.?_?\d+)+)/i, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/epiphany/i], describe: function(e2) {
          var t2 = { name: "Epiphany" }, r2 = n.default.getFirstMatch(a, e2) || n.default.getFirstMatch(/(?:epiphany)[\s/](\d+(\.?_?\d+)+)/i, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/puffin/i], describe: function(e2) {
          var t2 = { name: "Puffin" }, r2 = n.default.getFirstMatch(a, e2) || n.default.getFirstMatch(/(?:puffin)[\s/](\d+(\.?_?\d+)+)/i, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/sleipnir/i], describe: function(e2) {
          var t2 = { name: "Sleipnir" }, r2 = n.default.getFirstMatch(a, e2) || n.default.getFirstMatch(/(?:sleipnir)[\s/](\d+(\.?_?\d+)+)/i, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/k-meleon/i], describe: function(e2) {
          var t2 = { name: "K-Meleon" }, r2 = n.default.getFirstMatch(a, e2) || n.default.getFirstMatch(/(?:k-meleon)[\s/](\d+(\.?_?\d+)+)/i, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/micromessenger/i], describe: function(e2) {
          var t2 = { name: "WeChat" }, r2 = n.default.getFirstMatch(/(?:micromessenger)[\s/](\d+(\.?_?\d+)+)/i, e2) || n.default.getFirstMatch(a, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/qqbrowser/i], describe: function(e2) {
          var t2 = { name: /qqbrowserlite/i.test(e2) ? "QQ Browser Lite" : "QQ Browser" }, r2 = n.default.getFirstMatch(/(?:qqbrowserlite|qqbrowser)[/](\d+(\.?_?\d+)+)/i, e2) || n.default.getFirstMatch(a, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/msie|trident/i], describe: function(e2) {
          var t2 = { name: "Internet Explorer" }, r2 = n.default.getFirstMatch(/(?:msie |rv:)(\d+(\.?_?\d+)+)/i, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/\sedg\//i], describe: function(e2) {
          var t2 = { name: "Microsoft Edge" }, r2 = n.default.getFirstMatch(/\sedg\/(\d+(\.?_?\d+)+)/i, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/edg([ea]|ios)/i], describe: function(e2) {
          var t2 = { name: "Microsoft Edge" }, r2 = n.default.getSecondMatch(/edg([ea]|ios)\/(\d+(\.?_?\d+)+)/i, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/vivaldi/i], describe: function(e2) {
          var t2 = { name: "Vivaldi" }, r2 = n.default.getFirstMatch(/vivaldi\/(\d+(\.?_?\d+)+)/i, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/seamonkey/i], describe: function(e2) {
          var t2 = { name: "SeaMonkey" }, r2 = n.default.getFirstMatch(/seamonkey\/(\d+(\.?_?\d+)+)/i, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/sailfish/i], describe: function(e2) {
          var t2 = { name: "Sailfish" }, r2 = n.default.getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/silk/i], describe: function(e2) {
          var t2 = { name: "Amazon Silk" }, r2 = n.default.getFirstMatch(/silk\/(\d+(\.?_?\d+)+)/i, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/phantom/i], describe: function(e2) {
          var t2 = { name: "PhantomJS" }, r2 = n.default.getFirstMatch(/phantomjs\/(\d+(\.?_?\d+)+)/i, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/slimerjs/i], describe: function(e2) {
          var t2 = { name: "SlimerJS" }, r2 = n.default.getFirstMatch(/slimerjs\/(\d+(\.?_?\d+)+)/i, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/blackberry|\bbb\d+/i, /rim\stablet/i], describe: function(e2) {
          var t2 = { name: "BlackBerry" }, r2 = n.default.getFirstMatch(a, e2) || n.default.getFirstMatch(/blackberry[\d]+\/(\d+(\.?_?\d+)+)/i, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/(web|hpw)[o0]s/i], describe: function(e2) {
          var t2 = { name: "WebOS Browser" }, r2 = n.default.getFirstMatch(a, e2) || n.default.getFirstMatch(/w(?:eb)?[o0]sbrowser\/(\d+(\.?_?\d+)+)/i, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/bada/i], describe: function(e2) {
          var t2 = { name: "Bada" }, r2 = n.default.getFirstMatch(/dolfin\/(\d+(\.?_?\d+)+)/i, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/tizen/i], describe: function(e2) {
          var t2 = { name: "Tizen" }, r2 = n.default.getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i, e2) || n.default.getFirstMatch(a, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/qupzilla/i], describe: function(e2) {
          var t2 = { name: "QupZilla" }, r2 = n.default.getFirstMatch(/(?:qupzilla)[\s/](\d+(\.?_?\d+)+)/i, e2) || n.default.getFirstMatch(a, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/librewolf/i], describe: function(e2) {
          var t2 = { name: "LibreWolf" }, r2 = n.default.getFirstMatch(/(?:librewolf)[\s/](\d+(\.?_?\d+)+)/i, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/firefox|iceweasel|fxios/i], describe: function(e2) {
          var t2 = { name: "Firefox" }, r2 = n.default.getFirstMatch(/(?:firefox|iceweasel|fxios)[\s/](\d+(\.?_?\d+)+)/i, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/electron/i], describe: function(e2) {
          var t2 = { name: "Electron" }, r2 = n.default.getFirstMatch(/(?:electron)\/(\d+(\.?_?\d+)+)/i, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/sogoumobilebrowser/i, /metasr/i, /se 2\.[x]/i], describe: function(e2) {
          var t2 = { name: "Sogou Browser" }, r2 = n.default.getFirstMatch(/(?:sogoumobilebrowser)[\s/](\d+(\.?_?\d+)+)/i, e2), i2 = n.default.getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i, e2), a2 = n.default.getFirstMatch(/se ([\d.]+)x/i, e2), o2 = r2 || i2 || a2;
          return o2 && (t2.version = o2), t2;
        } }, { test: [/MiuiBrowser/i], describe: function(e2) {
          var t2 = { name: "Miui" }, r2 = n.default.getFirstMatch(/(?:MiuiBrowser)[\s/](\d+(\.?_?\d+)+)/i, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: function(e2) {
          return !!e2.hasBrand("DuckDuckGo") || e2.test(/\sDdg\/[\d.]+$/i);
        }, describe: function(e2, t2) {
          var r2 = { name: "DuckDuckGo" };
          if (t2) {
            var i2 = t2.getBrandVersion("DuckDuckGo");
            if (i2) return r2.version = i2, r2;
          }
          var a2 = n.default.getFirstMatch(/\sDdg\/([\d.]+)$/i, e2);
          return a2 && (r2.version = a2), r2;
        } }, { test: function(e2) {
          return e2.hasBrand("Brave");
        }, describe: function(e2, t2) {
          var r2 = { name: "Brave" };
          if (t2) {
            var i2 = t2.getBrandVersion("Brave");
            if (i2) return r2.version = i2, r2;
          }
          return r2;
        } }, { test: [/chromium/i], describe: function(e2) {
          var t2 = { name: "Chromium" }, r2 = n.default.getFirstMatch(/(?:chromium)[\s/](\d+(\.?_?\d+)+)/i, e2) || n.default.getFirstMatch(a, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/chrome|crios|crmo/i], describe: function(e2) {
          var t2 = { name: "Chrome" }, r2 = n.default.getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/GSA/i], describe: function(e2) {
          var t2 = { name: "Google Search" }, r2 = n.default.getFirstMatch(/(?:GSA)\/(\d+(\.?_?\d+)+)/i, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: function(e2) {
          var t2 = !e2.test(/like android/i), r2 = e2.test(/android/i);
          return t2 && r2;
        }, describe: function(e2) {
          var t2 = { name: "Android Browser" }, r2 = n.default.getFirstMatch(a, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/playstation 4/i], describe: function(e2) {
          var t2 = { name: "PlayStation 4" }, r2 = n.default.getFirstMatch(a, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/safari|applewebkit/i], describe: function(e2) {
          var t2 = { name: "Safari" }, r2 = n.default.getFirstMatch(a, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/.*/i], describe: function(e2) {
          var t2 = -1 !== e2.search("\\(") ? /^(.*)\/(.*)[ \t]\((.*)/ : /^(.*)\/(.*) /;
          return { name: n.default.getFirstMatch(t2, e2), version: n.default.getSecondMatch(t2, e2) };
        } }];
        t.default = o, e.exports = t.default;
      }, 93: function(e, t, r) {
        "use strict";
        t.__esModule = true, t.default = void 0;
        var i, n = (i = r(17)) && i.__esModule ? i : { default: i }, a = r(18);
        var o = [{ test: [/Roku\/DVP/], describe: function(e2) {
          var t2 = n.default.getFirstMatch(/Roku\/DVP-(\d+\.\d+)/i, e2);
          return { name: a.OS_MAP.Roku, version: t2 };
        } }, { test: [/windows phone/i], describe: function(e2) {
          var t2 = n.default.getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i, e2);
          return { name: a.OS_MAP.WindowsPhone, version: t2 };
        } }, { test: [/windows /i], describe: function(e2) {
          var t2 = n.default.getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i, e2), r2 = n.default.getWindowsVersionName(t2);
          return { name: a.OS_MAP.Windows, version: t2, versionName: r2 };
        } }, { test: [/Macintosh(.*?) FxiOS(.*?)\//], describe: function(e2) {
          var t2 = { name: a.OS_MAP.iOS }, r2 = n.default.getSecondMatch(/(Version\/)(\d[\d.]+)/, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/macintosh/i], describe: function(e2) {
          var t2 = n.default.getFirstMatch(/mac os x (\d+(\.?_?\d+)+)/i, e2).replace(/[_\s]/g, "."), r2 = n.default.getMacOSVersionName(t2), i2 = { name: a.OS_MAP.MacOS, version: t2 };
          return r2 && (i2.versionName = r2), i2;
        } }, { test: [/(ipod|iphone|ipad)/i], describe: function(e2) {
          var t2 = n.default.getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i, e2).replace(/[_\s]/g, ".");
          return { name: a.OS_MAP.iOS, version: t2 };
        } }, { test: [/OpenHarmony/i], describe: function(e2) {
          var t2 = n.default.getFirstMatch(/OpenHarmony\s+(\d+(\.\d+)*)/i, e2);
          return { name: a.OS_MAP.HarmonyOS, version: t2 };
        } }, { test: function(e2) {
          var t2 = !e2.test(/like android/i), r2 = e2.test(/android/i);
          return t2 && r2;
        }, describe: function(e2) {
          var t2 = n.default.getFirstMatch(/android[\s/-](\d+(\.\d+)*)/i, e2), r2 = n.default.getAndroidVersionName(t2), i2 = { name: a.OS_MAP.Android, version: t2 };
          return r2 && (i2.versionName = r2), i2;
        } }, { test: [/(web|hpw)[o0]s/i], describe: function(e2) {
          var t2 = n.default.getFirstMatch(/(?:web|hpw)[o0]s\/(\d+(\.\d+)*)/i, e2), r2 = { name: a.OS_MAP.WebOS };
          return t2 && t2.length && (r2.version = t2), r2;
        } }, { test: [/blackberry|\bbb\d+/i, /rim\stablet/i], describe: function(e2) {
          var t2 = n.default.getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i, e2) || n.default.getFirstMatch(/blackberry\d+\/(\d+([_\s]\d+)*)/i, e2) || n.default.getFirstMatch(/\bbb(\d+)/i, e2);
          return { name: a.OS_MAP.BlackBerry, version: t2 };
        } }, { test: [/bada/i], describe: function(e2) {
          var t2 = n.default.getFirstMatch(/bada\/(\d+(\.\d+)*)/i, e2);
          return { name: a.OS_MAP.Bada, version: t2 };
        } }, { test: [/tizen/i], describe: function(e2) {
          var t2 = n.default.getFirstMatch(/tizen[/\s](\d+(\.\d+)*)/i, e2);
          return { name: a.OS_MAP.Tizen, version: t2 };
        } }, { test: [/linux/i], describe: function() {
          return { name: a.OS_MAP.Linux };
        } }, { test: [/CrOS/], describe: function() {
          return { name: a.OS_MAP.ChromeOS };
        } }, { test: [/PlayStation 4/], describe: function(e2) {
          var t2 = n.default.getFirstMatch(/PlayStation 4[/\s](\d+(\.\d+)*)/i, e2);
          return { name: a.OS_MAP.PlayStation4, version: t2 };
        } }];
        t.default = o, e.exports = t.default;
      }, 94: function(e, t, r) {
        "use strict";
        t.__esModule = true, t.default = void 0;
        var i, n = (i = r(17)) && i.__esModule ? i : { default: i }, a = r(18);
        var o = [{ test: [/googlebot/i], describe: function() {
          return { type: a.PLATFORMS_MAP.bot, vendor: "Google" };
        } }, { test: [/linespider/i], describe: function() {
          return { type: a.PLATFORMS_MAP.bot, vendor: "Line" };
        } }, { test: [/amazonbot/i], describe: function() {
          return { type: a.PLATFORMS_MAP.bot, vendor: "Amazon" };
        } }, { test: [/gptbot/i], describe: function() {
          return { type: a.PLATFORMS_MAP.bot, vendor: "OpenAI" };
        } }, { test: [/chatgpt-user/i], describe: function() {
          return { type: a.PLATFORMS_MAP.bot, vendor: "OpenAI" };
        } }, { test: [/oai-searchbot/i], describe: function() {
          return { type: a.PLATFORMS_MAP.bot, vendor: "OpenAI" };
        } }, { test: [/baiduspider/i], describe: function() {
          return { type: a.PLATFORMS_MAP.bot, vendor: "Baidu" };
        } }, { test: [/bingbot/i], describe: function() {
          return { type: a.PLATFORMS_MAP.bot, vendor: "Bing" };
        } }, { test: [/duckduckbot/i], describe: function() {
          return { type: a.PLATFORMS_MAP.bot, vendor: "DuckDuckGo" };
        } }, { test: [/claudebot/i, /claude-web/i, /claude-user/i, /claude-searchbot/i], describe: function() {
          return { type: a.PLATFORMS_MAP.bot, vendor: "Anthropic" };
        } }, { test: [/omgilibot/i, /webzio-extended/i], describe: function() {
          return { type: a.PLATFORMS_MAP.bot, vendor: "Webz.io" };
        } }, { test: [/diffbot/i], describe: function() {
          return { type: a.PLATFORMS_MAP.bot, vendor: "Diffbot" };
        } }, { test: [/perplexitybot/i], describe: function() {
          return { type: a.PLATFORMS_MAP.bot, vendor: "Perplexity AI" };
        } }, { test: [/perplexity-user/i], describe: function() {
          return { type: a.PLATFORMS_MAP.bot, vendor: "Perplexity AI" };
        } }, { test: [/youbot/i], describe: function() {
          return { type: a.PLATFORMS_MAP.bot, vendor: "You.com" };
        } }, { test: [/ia_archiver/i], describe: function() {
          return { type: a.PLATFORMS_MAP.bot, vendor: "Internet Archive" };
        } }, { test: [/meta-webindexer/i], describe: function() {
          return { type: a.PLATFORMS_MAP.bot, vendor: "Meta" };
        } }, { test: [/meta-externalads/i], describe: function() {
          return { type: a.PLATFORMS_MAP.bot, vendor: "Meta" };
        } }, { test: [/meta-externalagent/i], describe: function() {
          return { type: a.PLATFORMS_MAP.bot, vendor: "Meta" };
        } }, { test: [/meta-externalfetcher/i], describe: function() {
          return { type: a.PLATFORMS_MAP.bot, vendor: "Meta" };
        } }, { test: [/facebookexternalhit/i, /facebookcatalog/i], describe: function() {
          return { type: a.PLATFORMS_MAP.bot, vendor: "Meta" };
        } }, { test: [/slackbot/i, /slack-imgProxy/i], describe: function() {
          return { type: a.PLATFORMS_MAP.bot, vendor: "Slack" };
        } }, { test: [/yahoo/i], describe: function() {
          return { type: a.PLATFORMS_MAP.bot, vendor: "Yahoo" };
        } }, { test: [/yandexbot/i, /yandexmobilebot/i], describe: function() {
          return { type: a.PLATFORMS_MAP.bot, vendor: "Yandex" };
        } }, { test: [/pingdom/i], describe: function() {
          return { type: a.PLATFORMS_MAP.bot, vendor: "Pingdom" };
        } }, { test: [/huawei/i], describe: function(e2) {
          var t2 = n.default.getFirstMatch(/(can-l01)/i, e2) && "Nova", r2 = { type: a.PLATFORMS_MAP.mobile, vendor: "Huawei" };
          return t2 && (r2.model = t2), r2;
        } }, { test: [/nexus\s*(?:7|8|9|10).*/i], describe: function() {
          return { type: a.PLATFORMS_MAP.tablet, vendor: "Nexus" };
        } }, { test: [/ipad/i], describe: function() {
          return { type: a.PLATFORMS_MAP.tablet, vendor: "Apple", model: "iPad" };
        } }, { test: [/Macintosh(.*?) FxiOS(.*?)\//], describe: function() {
          return { type: a.PLATFORMS_MAP.tablet, vendor: "Apple", model: "iPad" };
        } }, { test: [/kftt build/i], describe: function() {
          return { type: a.PLATFORMS_MAP.tablet, vendor: "Amazon", model: "Kindle Fire HD 7" };
        } }, { test: [/silk/i], describe: function() {
          return { type: a.PLATFORMS_MAP.tablet, vendor: "Amazon" };
        } }, { test: [/tablet(?! pc)/i], describe: function() {
          return { type: a.PLATFORMS_MAP.tablet };
        } }, { test: function(e2) {
          var t2 = e2.test(/ipod|iphone/i), r2 = e2.test(/like (ipod|iphone)/i);
          return t2 && !r2;
        }, describe: function(e2) {
          var t2 = n.default.getFirstMatch(/(ipod|iphone)/i, e2);
          return { type: a.PLATFORMS_MAP.mobile, vendor: "Apple", model: t2 };
        } }, { test: [/nexus\s*[0-6].*/i, /galaxy nexus/i], describe: function() {
          return { type: a.PLATFORMS_MAP.mobile, vendor: "Nexus" };
        } }, { test: [/Nokia/i], describe: function(e2) {
          var t2 = n.default.getFirstMatch(/Nokia\s+([0-9]+(\.[0-9]+)?)/i, e2), r2 = { type: a.PLATFORMS_MAP.mobile, vendor: "Nokia" };
          return t2 && (r2.model = t2), r2;
        } }, { test: [/[^-]mobi/i], describe: function() {
          return { type: a.PLATFORMS_MAP.mobile };
        } }, { test: function(e2) {
          return "blackberry" === e2.getBrowserName(true);
        }, describe: function() {
          return { type: a.PLATFORMS_MAP.mobile, vendor: "BlackBerry" };
        } }, { test: function(e2) {
          return "bada" === e2.getBrowserName(true);
        }, describe: function() {
          return { type: a.PLATFORMS_MAP.mobile };
        } }, { test: function(e2) {
          return "windows phone" === e2.getBrowserName();
        }, describe: function() {
          return { type: a.PLATFORMS_MAP.mobile, vendor: "Microsoft" };
        } }, { test: function(e2) {
          var t2 = Number(String(e2.getOSVersion()).split(".")[0]);
          return "android" === e2.getOSName(true) && t2 >= 3;
        }, describe: function() {
          return { type: a.PLATFORMS_MAP.tablet };
        } }, { test: function(e2) {
          return "android" === e2.getOSName(true);
        }, describe: function() {
          return { type: a.PLATFORMS_MAP.mobile };
        } }, { test: [/smart-?tv|smarttv/i], describe: function() {
          return { type: a.PLATFORMS_MAP.tv };
        } }, { test: [/netcast/i], describe: function() {
          return { type: a.PLATFORMS_MAP.tv };
        } }, { test: function(e2) {
          return "macos" === e2.getOSName(true);
        }, describe: function() {
          return { type: a.PLATFORMS_MAP.desktop, vendor: "Apple" };
        } }, { test: function(e2) {
          return "windows" === e2.getOSName(true);
        }, describe: function() {
          return { type: a.PLATFORMS_MAP.desktop };
        } }, { test: function(e2) {
          return "linux" === e2.getOSName(true);
        }, describe: function() {
          return { type: a.PLATFORMS_MAP.desktop };
        } }, { test: function(e2) {
          return "playstation 4" === e2.getOSName(true);
        }, describe: function() {
          return { type: a.PLATFORMS_MAP.tv };
        } }, { test: function(e2) {
          return "roku" === e2.getOSName(true);
        }, describe: function() {
          return { type: a.PLATFORMS_MAP.tv };
        } }];
        t.default = o, e.exports = t.default;
      }, 95: function(e, t, r) {
        "use strict";
        t.__esModule = true, t.default = void 0;
        var i, n = (i = r(17)) && i.__esModule ? i : { default: i }, a = r(18);
        var o = [{ test: function(e2) {
          return "microsoft edge" === e2.getBrowserName(true);
        }, describe: function(e2) {
          if (/\sedg\//i.test(e2)) return { name: a.ENGINE_MAP.Blink };
          var t2 = n.default.getFirstMatch(/edge\/(\d+(\.?_?\d+)+)/i, e2);
          return { name: a.ENGINE_MAP.EdgeHTML, version: t2 };
        } }, { test: [/trident/i], describe: function(e2) {
          var t2 = { name: a.ENGINE_MAP.Trident }, r2 = n.default.getFirstMatch(/trident\/(\d+(\.?_?\d+)+)/i, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: function(e2) {
          return e2.test(/presto/i);
        }, describe: function(e2) {
          var t2 = { name: a.ENGINE_MAP.Presto }, r2 = n.default.getFirstMatch(/presto\/(\d+(\.?_?\d+)+)/i, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: function(e2) {
          var t2 = e2.test(/gecko/i), r2 = e2.test(/like gecko/i);
          return t2 && !r2;
        }, describe: function(e2) {
          var t2 = { name: a.ENGINE_MAP.Gecko }, r2 = n.default.getFirstMatch(/gecko\/(\d+(\.?_?\d+)+)/i, e2);
          return r2 && (t2.version = r2), t2;
        } }, { test: [/(apple)?webkit\/537\.36/i], describe: function() {
          return { name: a.ENGINE_MAP.Blink };
        } }, { test: [/(apple)?webkit/i], describe: function(e2) {
          var t2 = { name: a.ENGINE_MAP.WebKit }, r2 = n.default.getFirstMatch(/webkit\/(\d+(\.?_?\d+)+)/i, e2);
          return r2 && (t2.version = r2), t2;
        } }];
        t.default = o, e.exports = t.default;
      } });
    }));
  }
});

// node_modules/@ms-fabric/workload-client/src/workload-client.js
var require_workload_client = __commonJS({
  "node_modules/@ms-fabric/workload-client/src/workload-client.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports, (init_esm_browser(), __toCommonJS(esm_browser_exports)), require_es5()) : typeof define === "function" && define.amd ? define(["exports", "uuid", "bowser"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.WorkloadClient = {}, global.UUID, global.Bowser));
    })(exports, (function(exports2, uuid, bowser) {
      "use strict";
      function _interopNamespaceDefault(e2) {
        var n2 = /* @__PURE__ */ Object.create(null);
        if (e2) {
          Object.keys(e2).forEach(function(k2) {
            if (k2 !== "default") {
              var d2 = Object.getOwnPropertyDescriptor(e2, k2);
              Object.defineProperty(n2, k2, d2.get ? d2 : {
                enumerable: true,
                get: function() {
                  return e2[k2];
                }
              });
            }
          });
        }
        n2.default = e2;
        return Object.freeze(n2);
      }
      var uuid__namespace = /* @__PURE__ */ _interopNamespaceDefault(uuid);
      var bowser__namespace = /* @__PURE__ */ _interopNamespaceDefault(bowser);
      exports2.Permissions = void 0;
      (function(Permissions) {
        Permissions[Permissions["None"] = 0] = "None";
        Permissions[Permissions["Read"] = 1] = "Read";
        Permissions[Permissions["Write"] = 2] = "Write";
        Permissions[Permissions["ReShare"] = 4] = "ReShare";
        Permissions[Permissions["Explore"] = 8] = "Explore";
        Permissions[Permissions["CopyOnWrite"] = 16] = "CopyOnWrite";
        Permissions[Permissions["WriteCheckRelaxForReadOnlyGroup"] = 32] = "WriteCheckRelaxForReadOnlyGroup";
        Permissions[Permissions["Execute"] = 64] = "Execute";
        Permissions[Permissions["Subscribe"] = 128] = "Subscribe";
        Permissions[Permissions["ReadExplore"] = 9] = "ReadExplore";
        Permissions[Permissions["ReadWrite"] = 3] = "ReadWrite";
        Permissions[Permissions["ReadWriteCheckRelaxForReadOnlyGroup"] = 35] = "ReadWriteCheckRelaxForReadOnlyGroup";
        Permissions[Permissions["ReadReshare"] = 5] = "ReadReshare";
        Permissions[Permissions["All"] = 7] = "All";
      })(exports2.Permissions || (exports2.Permissions = {}));
      exports2.SharingLinkType = void 0;
      (function(SharingLinkType) {
        SharingLinkType["TenantOnly"] = "TenantOnly";
        SharingLinkType["SpecificPeople"] = "SpecificPeople";
        SharingLinkType["ExistingAccess"] = "ExistingAccess";
      })(exports2.SharingLinkType || (exports2.SharingLinkType = {}));
      const DefaultWorkloadClientConfig = {
        workloadHostWindow: window.parent
      };
      exports2.DisplayColumn = void 0;
      (function(DisplayColumn) {
        DisplayColumn["Expand"] = "expand";
        DisplayColumn["Icon"] = "icon";
        DisplayColumn["Name"] = "name";
        DisplayColumn["Type"] = "type";
        DisplayColumn["Endorsement"] = "endorsement";
        DisplayColumn["Owner"] = "owner";
        DisplayColumn["Workspace"] = "workspaceName";
        DisplayColumn["LastRefreshed"] = "lastRefreshed";
        DisplayColumn["Sensitivity"] = "sensitivity";
        DisplayColumn["LastAccessed"] = "lastAccessed";
        DisplayColumn["NextRefresh"] = "nextRefresh";
        DisplayColumn["Organization"] = "organization";
        DisplayColumn["Region"] = "region";
        DisplayColumn["Recent"] = "recent";
      })(exports2.DisplayColumn || (exports2.DisplayColumn = {}));
      exports2.GatewayType = void 0;
      (function(GatewayType) {
        GatewayType["Resource"] = "Resource";
        GatewayType["Personal"] = "Personal";
        GatewayType["VirtualNetwork"] = "VirtualNetwork";
        GatewayType["TenantCloud"] = "TenantCloud";
      })(exports2.GatewayType || (exports2.GatewayType = {}));
      var BooleanFilter;
      (function(BooleanFilter2) {
        BooleanFilter2[BooleanFilter2["Both"] = 0] = "Both";
        BooleanFilter2[BooleanFilter2["True"] = 1] = "True";
        BooleanFilter2[BooleanFilter2["False"] = 2] = "False";
      })(BooleanFilter || (BooleanFilter = {}));
      exports2.DatahubFilterType = void 0;
      (function(DatahubFilterType) {
        DatahubFilterType["domain"] = "domain";
        DatahubFilterType["workspace"] = "workspace";
        DatahubFilterType["fabricCreateShortcut"] = "fabricCreateShortcut";
        DatahubFilterType["fabricRegion"] = "FabricRegion";
        DatahubFilterType["ids"] = "ids";
      })(exports2.DatahubFilterType || (exports2.DatahubFilterType = {}));
      exports2.DatahubListPivot = void 0;
      (function(DatahubListPivot) {
        DatahubListPivot[DatahubListPivot["All"] = 0] = "All";
        DatahubListPivot[DatahubListPivot["MyData"] = 1] = "MyData";
        DatahubListPivot[DatahubListPivot["TrustedInYourOrg"] = 2] = "TrustedInYourOrg";
        DatahubListPivot[DatahubListPivot["ThisWorkspace"] = 3] = "ThisWorkspace";
        DatahubListPivot[DatahubListPivot["ExternalDatasets"] = 4] = "ExternalDatasets";
        DatahubListPivot[DatahubListPivot["Recommended"] = 5] = "Recommended";
        DatahubListPivot[DatahubListPivot["Recent"] = 6] = "Recent";
        DatahubListPivot[DatahubListPivot["Favorites"] = 7] = "Favorites";
      })(exports2.DatahubListPivot || (exports2.DatahubListPivot = {}));
      exports2.ControlTokens = void 0;
      (function(ControlTokens) {
        ControlTokens[ControlTokens["colorNeutralBackground1"] = 0] = "colorNeutralBackground1";
        ControlTokens[ControlTokens["colorNeutralBackground1Hover"] = 1] = "colorNeutralBackground1Hover";
        ControlTokens[ControlTokens["colorNeutralBackground1Pressed"] = 2] = "colorNeutralBackground1Pressed";
        ControlTokens[ControlTokens["colorNeutralBackground1Selected"] = 3] = "colorNeutralBackground1Selected";
        ControlTokens[ControlTokens["colorNeutralForeground1"] = 4] = "colorNeutralForeground1";
        ControlTokens[ControlTokens["colorNeutralStroke1Pressed"] = 5] = "colorNeutralStroke1Pressed";
        ControlTokens[ControlTokens["colorNeutralStrokeFocus1"] = 6] = "colorNeutralStrokeFocus1";
        ControlTokens[ControlTokens["colorNeutralStroke1Selected"] = 7] = "colorNeutralStroke1Selected";
        ControlTokens[ControlTokens["colorNeutralStroke1"] = 8] = "colorNeutralStroke1";
        ControlTokens[ControlTokens["colorNeutralStroke1Hover"] = 9] = "colorNeutralStroke1Hover";
        ControlTokens[ControlTokens["colorNeutralStrokeFocus2"] = 10] = "colorNeutralStrokeFocus2";
        ControlTokens[ControlTokens["colorNeutralForeground2"] = 11] = "colorNeutralForeground2";
        ControlTokens[ControlTokens["colorNeutralForeground2Hover"] = 12] = "colorNeutralForeground2Hover";
        ControlTokens[ControlTokens["colorNeutralForeground2Pressed"] = 13] = "colorNeutralForeground2Pressed";
        ControlTokens[ControlTokens["colorNeutralForeground3"] = 14] = "colorNeutralForeground3";
        ControlTokens[ControlTokens["colorNeutralForeground4"] = 15] = "colorNeutralForeground4";
        ControlTokens[ControlTokens["colorNeutralStrokeAccessibleSelected"] = 16] = "colorNeutralStrokeAccessibleSelected";
        ControlTokens[ControlTokens["colorNeutralForegroundInverted"] = 17] = "colorNeutralForegroundInverted";
        ControlTokens[ControlTokens["colorNeutralForegroundDisabled"] = 18] = "colorNeutralForegroundDisabled";
        ControlTokens[ControlTokens["colorNeutralBackgroundDisabled"] = 19] = "colorNeutralBackgroundDisabled";
        ControlTokens[ControlTokens["colorNeutralStrokeDisabled"] = 20] = "colorNeutralStrokeDisabled";
        ControlTokens[ControlTokens["colorNeutralForeground2BrandHover"] = 21] = "colorNeutralForeground2BrandHover";
        ControlTokens[ControlTokens["colorNeutralForeground2BrandSelected"] = 22] = "colorNeutralForeground2BrandSelected";
        ControlTokens[ControlTokens["colorBrandForeground2"] = 23] = "colorBrandForeground2";
        ControlTokens[ControlTokens["colorSubtleBackgroundHover"] = 24] = "colorSubtleBackgroundHover";
        ControlTokens[ControlTokens["colorSubtleBackgroundPressed"] = 25] = "colorSubtleBackgroundPressed";
        ControlTokens[ControlTokens["buttonDefaultHoverContentColor"] = 26] = "buttonDefaultHoverContentColor";
        ControlTokens[ControlTokens["focusBoxShadowWhiteColor"] = 27] = "focusBoxShadowWhiteColor";
        ControlTokens[ControlTokens["neutralLighterColor"] = 28] = "neutralLighterColor";
        ControlTokens[ControlTokens["colorNeutralBackground6"] = 29] = "colorNeutralBackground6";
        ControlTokens[ControlTokens["colorBrandBackground"] = 30] = "colorBrandBackground";
        ControlTokens[ControlTokens["colorNeutralForegroundOnBrand"] = 31] = "colorNeutralForegroundOnBrand";
        ControlTokens[ControlTokens["colorBrandBackgroundHover"] = 32] = "colorBrandBackgroundHover";
        ControlTokens[ControlTokens["colorBrandBackgroundSelected"] = 33] = "colorBrandBackgroundSelected";
        ControlTokens[ControlTokens["colorNeutralStencil1"] = 34] = "colorNeutralStencil1";
        ControlTokens[ControlTokens["colorNeutralBackground4Hover"] = 35] = "colorNeutralBackground4Hover";
        ControlTokens[ControlTokens["colorNeutralShadowAmbient"] = 36] = "colorNeutralShadowAmbient";
        ControlTokens[ControlTokens["colorNeutralShadowKey"] = 37] = "colorNeutralShadowKey";
        ControlTokens[ControlTokens["fluentThemeLinkcolor"] = 38] = "fluentThemeLinkcolor";
      })(exports2.ControlTokens || (exports2.ControlTokens = {}));
      exports2.SupportedDatahubStyleProperties = void 0;
      (function(SupportedDatahubStyleProperties) {
        SupportedDatahubStyleProperties["searchHighlightColor"] = "searchHighlightColor";
        SupportedDatahubStyleProperties["lighterDialogBackgroundColor"] = "lighterDialogBackgroundColor";
        SupportedDatahubStyleProperties["shimmerBackgroundColor"] = "shimmerBackgroundColor";
        SupportedDatahubStyleProperties["shimmerColor"] = "shimmerColor";
        SupportedDatahubStyleProperties["selectedRowColor"] = "selectedRowColor";
        SupportedDatahubStyleProperties["hoverRowColor"] = "hoverRowColor";
        SupportedDatahubStyleProperties["rowBorderColor"] = "rowBorderColor";
        SupportedDatahubStyleProperties["rowForegroundColor"] = "rowForegroundColor";
        SupportedDatahubStyleProperties["pillColor"] = "pillColor";
        SupportedDatahubStyleProperties["pillBorderColor"] = "pillBorderColor";
        SupportedDatahubStyleProperties["pillBackgroundColor"] = "pillBackgroundColor";
        SupportedDatahubStyleProperties["activePillColor"] = "activePillColor";
        SupportedDatahubStyleProperties["activePillBorderColor"] = "activePillBorderColor";
        SupportedDatahubStyleProperties["activePillBackgroundColor"] = "activePillBackgroundColor";
        SupportedDatahubStyleProperties["pillHoverBackgroundColor"] = "pillHoverBackgroundColor";
        SupportedDatahubStyleProperties["activePillHoverBackgroundColor"] = "activePillHoverBackgroundColor";
        SupportedDatahubStyleProperties["endorsementForegroundColor"] = "endorsementForegroundColor";
        SupportedDatahubStyleProperties["hoverDWBColor"] = "hoverDWBColor";
        SupportedDatahubStyleProperties["pressedDWBColor"] = "pressedDWBColor";
        SupportedDatahubStyleProperties["selectedDWBColor"] = "selectedDWBColor";
        SupportedDatahubStyleProperties["foregroundWSExpandIconColor"] = "foregroundWSExpandIconColor";
        SupportedDatahubStyleProperties["foregroundWSTitleColor"] = "foregroundWSTitleColor";
        SupportedDatahubStyleProperties["foregroundWSSubTitleColor"] = "foregroundWSSubTitleColor";
        SupportedDatahubStyleProperties["foregroundDWBColor"] = "foregroundDWBColor";
        SupportedDatahubStyleProperties["foregroundDWBIconColor"] = "foregroundDWBIconColor";
      })(exports2.SupportedDatahubStyleProperties || (exports2.SupportedDatahubStyleProperties = {}));
      exports2.DialogType = void 0;
      (function(DialogType) {
        DialogType[DialogType["IFrame"] = 0] = "IFrame";
        DialogType[DialogType["MessageBox"] = 1] = "MessageBox";
      })(exports2.DialogType || (exports2.DialogType = {}));
      exports2.ButtonType = void 0;
      (function(ButtonType) {
        ButtonType[ButtonType["Default"] = 0] = "Default";
        ButtonType[ButtonType["Primary"] = 1] = "Primary";
      })(exports2.ButtonType || (exports2.ButtonType = {}));
      exports2.ErrorDialogWidth = void 0;
      (function(ErrorDialogWidth) {
        ErrorDialogWidth["Small"] = "288px";
        ErrorDialogWidth["Medium"] = "576px";
        ErrorDialogWidth["Large"] = "864px";
        ErrorDialogWidth["XLarge"] = "1440px";
      })(exports2.ErrorDialogWidth || (exports2.ErrorDialogWidth = {}));
      exports2.CapacitySkuTier = void 0;
      (function(CapacitySkuTier) {
        CapacitySkuTier[CapacitySkuTier["Premium"] = 1] = "Premium";
        CapacitySkuTier[CapacitySkuTier["Embedded"] = 2] = "Embedded";
        CapacitySkuTier[CapacitySkuTier["PBIE_Azure"] = 3] = "PBIE_Azure";
        CapacitySkuTier[CapacitySkuTier["PremiumPerUser"] = 4] = "PremiumPerUser";
        CapacitySkuTier[CapacitySkuTier["SharedOnPremium"] = 6] = "SharedOnPremium";
        CapacitySkuTier[CapacitySkuTier["DataCapacityTrial"] = 7] = "DataCapacityTrial";
        CapacitySkuTier[CapacitySkuTier["DataCapacity"] = 8] = "DataCapacity";
        CapacitySkuTier[CapacitySkuTier["DataCapacityLimited"] = 9] = "DataCapacityLimited";
      })(exports2.CapacitySkuTier || (exports2.CapacitySkuTier = {}));
      exports2.ErrorSource = void 0;
      (function(ErrorSource) {
        ErrorSource["FabricWorkload"] = "FabricWorkload";
        ErrorSource["WorkloadHost"] = "WorkloadHost";
        ErrorSource["WorkloadSDK"] = "WorkloadSDK";
      })(exports2.ErrorSource || (exports2.ErrorSource = {}));
      exports2.ErrorKind = void 0;
      (function(ErrorKind) {
        ErrorKind[ErrorKind["Error"] = 1] = "Error";
        ErrorKind[ErrorKind["Fatal"] = 2] = "Fatal";
        ErrorKind[ErrorKind["Warning"] = 3] = "Warning";
        ErrorKind[ErrorKind["Custom"] = 4] = "Custom";
      })(exports2.ErrorKind || (exports2.ErrorKind = {}));
      const PreDefinedEventName = ["loaded", "rendered", "error"];
      exports2.PreDefinedWorkloadAction = void 0;
      (function(PreDefinedWorkloadAction) {
        PreDefinedWorkloadAction["getItemActionDynamicAttrs"] = "getItemActionDynamicAttrs";
        PreDefinedWorkloadAction["getHelpPaneData"] = "getHelpPaneData";
      })(exports2.PreDefinedWorkloadAction || (exports2.PreDefinedWorkloadAction = {}));
      exports2.MessageBarType = void 0;
      (function(MessageBarType) {
        MessageBarType[MessageBarType["Information"] = 0] = "Information";
        MessageBarType[MessageBarType["Error"] = 1] = "Error";
        MessageBarType[MessageBarType["Warning"] = 2] = "Warning";
        MessageBarType[MessageBarType["Success"] = 3] = "Success";
        MessageBarType[MessageBarType["Blocked"] = 5] = "Blocked";
        MessageBarType[MessageBarType["Copilot"] = 6] = "Copilot";
        MessageBarType[MessageBarType["Promotion"] = 7] = "Promotion";
      })(exports2.MessageBarType || (exports2.MessageBarType = {}));
      exports2.NotificationType = void 0;
      (function(NotificationType) {
        NotificationType[NotificationType["Default"] = 0] = "Default";
        NotificationType[NotificationType["Alert"] = 1] = "Alert";
        NotificationType[NotificationType["Error"] = 2] = "Error";
        NotificationType[NotificationType["Loading"] = 3] = "Loading";
        NotificationType[NotificationType["Success"] = 4] = "Success";
        NotificationType[NotificationType["Warning"] = 5] = "Warning";
        NotificationType[NotificationType["Share"] = 6] = "Share";
        NotificationType[NotificationType["Info"] = 7] = "Info";
        NotificationType[NotificationType["NoIcon"] = 8] = "NoIcon";
        NotificationType[NotificationType["Delete"] = 10] = "Delete";
        NotificationType[NotificationType["Add"] = 11] = "Add";
        NotificationType[NotificationType["Feedback"] = 12] = "Feedback";
      })(exports2.NotificationType || (exports2.NotificationType = {}));
      exports2.NotificationToastDuration = void 0;
      (function(NotificationToastDuration) {
        NotificationToastDuration["Short"] = "Short";
        NotificationToastDuration["Medium"] = "Medium";
        NotificationToastDuration["Long"] = "Long";
      })(exports2.NotificationToastDuration || (exports2.NotificationToastDuration = {}));
      exports2.OpenNotificationButtonType = void 0;
      (function(OpenNotificationButtonType) {
        OpenNotificationButtonType[OpenNotificationButtonType["Primary"] = 1] = "Primary";
        OpenNotificationButtonType[OpenNotificationButtonType["Secondary"] = 2] = "Secondary";
        OpenNotificationButtonType[OpenNotificationButtonType["Link"] = 3] = "Link";
      })(exports2.OpenNotificationButtonType || (exports2.OpenNotificationButtonType = {}));
      exports2.OnelakeExplorerType = void 0;
      (function(OnelakeExplorerType) {
        OnelakeExplorerType["Tables"] = "Tables";
        OnelakeExplorerType["Files"] = "Files";
        OnelakeExplorerType["Audit"] = "Audit";
      })(exports2.OnelakeExplorerType || (exports2.OnelakeExplorerType = {}));
      exports2.OnelakeExplorerCheckMode = void 0;
      (function(OnelakeExplorerCheckMode) {
        OnelakeExplorerCheckMode[OnelakeExplorerCheckMode["None"] = 0] = "None";
        OnelakeExplorerCheckMode[OnelakeExplorerCheckMode["Single"] = 1] = "Single";
        OnelakeExplorerCheckMode[OnelakeExplorerCheckMode["Multi"] = 2] = "Multi";
      })(exports2.OnelakeExplorerCheckMode || (exports2.OnelakeExplorerCheckMode = {}));
      exports2.ExplorerWizardTabs = void 0;
      (function(ExplorerWizardTabs) {
        ExplorerWizardTabs["FileView"] = "fileView";
        ExplorerWizardTabs["DataAccess"] = "dataAccess";
      })(exports2.ExplorerWizardTabs || (exports2.ExplorerWizardTabs = {}));
      exports2.DataChangeEventType = void 0;
      (function(DataChangeEventType) {
        DataChangeEventType["RowSecurity"] = "row-level-security";
        DataChangeEventType["ColumnSecurity"] = "column-level-security";
      })(exports2.DataChangeEventType || (exports2.DataChangeEventType = {}));
      exports2.WorkloadHostApp = void 0;
      (function(WorkloadHostApp) {
        WorkloadHostApp[WorkloadHostApp["FabricWebApp"] = 0] = "FabricWebApp";
        WorkloadHostApp[WorkloadHostApp["EmbedApp"] = 1] = "EmbedApp";
      })(exports2.WorkloadHostApp || (exports2.WorkloadHostApp = {}));
      exports2.LifecycleEventType = void 0;
      (function(LifecycleEventType) {
        LifecycleEventType[LifecycleEventType["InitSucceeded"] = 1] = "InitSucceeded";
        LifecycleEventType[LifecycleEventType["InitFailed"] = 2] = "InitFailed";
      })(exports2.LifecycleEventType || (exports2.LifecycleEventType = {}));
      exports2.WorkloadLoadEventType = void 0;
      (function(WorkloadLoadEventType) {
        WorkloadLoadEventType["WorkloadBootstrap"] = "WorkloadBootstrap";
        WorkloadLoadEventType["WorkloadBootstrapStart"] = "WorkloadBootstrapStart";
      })(exports2.WorkloadLoadEventType || (exports2.WorkloadLoadEventType = {}));
      exports2.OpenMode = void 0;
      (function(OpenMode2) {
        OpenMode2[OpenMode2["Append"] = 1] = "Append";
        OpenMode2[OpenMode2["ReplaceAll"] = 2] = "ReplaceAll";
      })(exports2.OpenMode || (exports2.OpenMode = {}));
      exports2.CloseMode = void 0;
      (function(CloseMode) {
        CloseMode[CloseMode["PopOne"] = 1] = "PopOne";
        CloseMode[CloseMode["ClearAll"] = 2] = "ClearAll";
      })(exports2.CloseMode || (exports2.CloseMode = {}));
      const EXT_META_KEY = /* @__PURE__ */ Symbol.for("WORKLOAD_META");
      const iframeIdKey = "__iframeId";
      const iframeTypeKey = "__iframeType";
      const widgetTypeKey = "__wt";
      const environmentNameKey = "__environmentName";
      const workloadNameKey = "__extensionName";
      const workloadHostOriginKey = "__extensionHostOrigin";
      const bootstrapPathKey = "__bootstrapPath";
      const unminKey = "__unmin";
      const useCDNKey = "__useCDN";
      const cdnFallbackKey = "__cdnFallbackTime";
      const parallelLoadKey = "__parallelLoadingEnabled";
      const errorHandlingKey = "__eh";
      const eagerLoadTimeoutFallbackKey = "__el";
      const syncINPKey = "__inp";
      const cdnUrlPrefixKey = "__cpre";
      const cdnUrlPostfixKey = "__cpos";
      const syncPerfSnapshotKey = "__ps";
      class WorkloadMetaLoader {
        constructor(target = window) {
          this.target = target;
        }
        /**
         * @description
         * A static method to load the workload metadata for a given workload window
         * @param target The target workload window
         * @returns Loaded workload metadata
         */
        static Load(target) {
          return new this(target).load();
        }
        /**
         * @description
         * A method to load the workload metadata
         * @returns Loaded workload metadata
         */
        load() {
          return this.meta || (this.meta = this.tryLoad());
        }
        get meta() {
          return this.target[EXT_META_KEY];
        }
        set meta(meta) {
          Object.defineProperty(this.target, EXT_META_KEY, {
            get: () => meta,
            enumerable: false,
            configurable: false
          });
        }
        tryLoad() {
          const params = new URLSearchParams(this.target.location.search);
          const iframeType = params.get(iframeTypeKey);
          const raw = {
            iframeId: params.get(iframeIdKey),
            iframeType,
            widgetType: iframeType === "widget" ? params.get(widgetTypeKey) : void 0,
            environmentName: params.get(environmentNameKey),
            workloadName: params.get(workloadNameKey),
            workloadHostOrigin: params.get(workloadHostOriginKey),
            bootstrapPath: params.get(bootstrapPathKey),
            unmin: params.get(unminKey) === "true",
            useCDN: params.get(useCDNKey) === "true",
            cdnFallbackTime: params.get(cdnFallbackKey),
            parallelLoadingEnabled: params.get(parallelLoadKey) === "true",
            errorHandlingEnabled: params.get(errorHandlingKey) === "true",
            eagerLoadTimeoutFallbackEnabled: params.get(eagerLoadTimeoutFallbackKey) === "1",
            syncINPEnabled: params.get(syncINPKey) === "1",
            cdnUrlPrefix: params.get(cdnUrlPrefixKey) || void 0,
            cdnUrlPostfix: params.get(cdnUrlPostfixKey) || void 0,
            syncPerfSnapshotEnabled: params.get(syncPerfSnapshotKey) === "1"
          };
          this.assert(raw);
          return Object.freeze(raw);
        }
        // Note: update this method if meta definition changed
        assert(isMeta) {
          const meta = isMeta;
          if (meta.iframeId == null) {
            throw new Error("Empty iframeId");
          }
          if (!/^(worker|dialog|panel|page|widget)$/.test(meta.iframeType || "")) {
            throw new Error(`Invalid uiType: "${meta.iframeType}", must be 'worker', 'page', 'panel', 'dialog' or 'widget'`);
          }
          if (meta.iframeType === "widget" && meta.widgetType == null) {
            throw new Error(`"${widgetTypeKey}" param should be specified for widget iframes`);
          }
          if (meta.iframeType !== "widget" && meta.widgetType != null) {
            throw new Error(`"${widgetTypeKey}" param should not be specified for non-widget iframes`);
          }
          if (meta.environmentName == null) {
            throw new Error("Empty environmentName");
          }
          if (meta.workloadName == null) {
            throw new Error("Empty workloadName");
          }
          if (meta.workloadHostOrigin == null) {
            throw new Error("Empty workloadHostOrigin");
          }
          if (meta.unmin == null) {
            throw new Error("Empty unmin");
          }
          if (meta.useCDN == null) {
            throw new Error("Empty useCDN");
          }
          if (meta.parallelLoadingEnabled == null) {
            throw new Error("Empty parallelLoadingEnabled");
          }
          if (meta.errorHandlingEnabled == null) {
            throw new Error("Empty errorHandlingEnabled");
          }
          if (meta.eagerLoadTimeoutFallbackEnabled == null) {
            throw new Error("Empty eagerLoadTimeoutFallback");
          }
          if (meta.syncINPEnabled == null) {
            throw new Error("Empty syncINPEnabled");
          }
          if (meta.syncPerfSnapshotEnabled == null) {
            throw new Error("Empty syncPerfSnapshotEnabled");
          }
        }
      }
      const createMessage = (type, creator) => Object.assign(creator !== void 0 ? (...args) => ({
        type,
        ...creator(...args)
      }) : (props) => props !== void 0 ? { type, ...props } : { type }, { type });
      const mergeTracingInfoIntoMessage = (props, tracingInfo) => {
        Object.defineProperties(props, {
          tracingInfo: {
            value: tracingInfo,
            enumerable: false
            // Only allow direct access. Avoid being iterated.
          }
        });
        return props;
      };
      const createWorkloadMessage = (type) => Object.assign((props) => createMessage(type, (iframeId) => mergeTracingInfoIntoMessage({
        iframeId,
        ...props
      }, {
        ...props?.tracingInfo,
        startTime: Date.now()
      })), { type });
      const startPrefix = "[Start]";
      const resolvePrefix = "[Resolve]";
      const rejectPrefix = "[Reject]";
      const createAsyncWorkloadMessage = (type) => ({
        start: Object.assign((props) => createMessage(`${startPrefix} ${type}`, (iframeId) => mergeTracingInfoIntoMessage({
          ...props,
          asyncId: uuid.v4(),
          iframeId
        }, {
          ...props?.tracingInfo,
          startTime: Date.now()
        })), { type: `${startPrefix} ${type}` }),
        resolve: Object.assign((props) => createMessage(`${resolvePrefix} ${type}`, (iframeId, asyncId, tracingInfo) => mergeTracingInfoIntoMessage({
          ...props,
          asyncId,
          iframeId
        }, tracingInfo)), { type: `${resolvePrefix} ${type}` }),
        reject: Object.assign((props) => createMessage(`${rejectPrefix} ${type}`, (iframeId, asyncId, tracingInfo) => mergeTracingInfoIntoMessage({
          ...props,
          asyncId,
          iframeId
        }, tracingInfo)), { type: `${rejectPrefix} ${type}` })
      });
      function isWorkloadMessage(message) {
        const workloadMessage = message;
        return workloadMessage != null && typeof workloadMessage === "object" && workloadMessage.type !== void 0 && workloadMessage.iframeId !== void 0;
      }
      function isAsyncWorkloadMessage(message) {
        return message.asyncId !== void 0;
      }
      const __PACKAGE_VERSION__ = 2;
      function recursiveRenameKeys(obj, reverse = false) {
        const packageVersion = typeof __PACKAGE_VERSION__ !== "undefined" ? __PACKAGE_VERSION__ : 1;
        const baseMapping = {
          artifact: "item",
          Artifact: "Item",
          ARTIFACT: "ITEM",
          trident: "fabric",
          Trident: "Fabric",
          TRIDENT: "FABRIC",
          extension: "workload",
          Extension: "Workload",
          EXTENSION: "WORKLOAD"
        };
        const versionMappings = {};
        if (packageVersion >= 2) {
          versionMappings.jobPayloadJson = "executionData";
        }
        const mapping = { ...baseMapping, ...versionMappings };
        const keyMapping = reverse ? invertMapping(mapping) : mapping;
        const immutableKeys = /* @__PURE__ */ new Set(["workloadPayload"]);
        const immutableObjects = /* @__PURE__ */ new Set(["searchTokenMatchesBySection", "includedVariableTypes"]);
        function invertMapping(map) {
          const inverted = {};
          for (const key in map) {
            inverted[map[key]] = key;
          }
          return inverted;
        }
        function transformName(name) {
          if (name == null || typeof name !== "string" || immutableKeys.has(name)) {
            return name;
          }
          let transformedName = name;
          for (const mapKey in keyMapping) {
            transformedName = transformedName.replace(mapKey, keyMapping[mapKey]);
          }
          return transformedName;
        }
        function transformObject(obj2) {
          if (Array.isArray(obj2)) {
            return obj2.map(transformObject);
          } else if (obj2 && typeof obj2 === "object") {
            return Object.keys(obj2).reduce((acc, key) => {
              if (immutableObjects.has(key)) {
                acc[key] = obj2[key];
              } else {
                const newKey = immutableKeys.has(key) ? key : transformName(key);
                acc[newKey] = key === "type" ? transformName(obj2[key]) : transformObject(obj2[key]);
              }
              return acc;
            }, {});
          }
          return obj2;
        }
        return transformObject(obj);
      }
      function transformMessageEvent(eventMessage, mapping) {
        const newEvent = {};
        for (const key in eventMessage) {
          newEvent[key] = eventMessage[key];
        }
        if (newEvent.data) {
          newEvent.data = recursiveRenameKeys(newEvent.data, mapping);
        }
        return newEvent;
      }
      class MessageBroker {
        constructor(config) {
          this.genericListeners = /* @__PURE__ */ new Set();
          this.syncListeners = /* @__PURE__ */ new Map();
          this.asyncListeners = /* @__PURE__ */ new Map();
          this.asyncResponders = /* @__PURE__ */ new Map();
          this.listener = (message) => this.onMessage(message);
          this.getTargetWindow = config.getTargetWindow;
          this.getTargetOrigin = config.getTargetOrigin;
          this.onWorkloadMessage = config.onWorkloadMessage;
          this.shouldProcessMessage = config.shouldProcessMessage;
          window.addEventListener("message", this.listener);
        }
        /**
         * @description Registers a message listener that is invoked whenever a message of any type is received by the message broker
         * @param handler The message listener
         */
        listen(handler) {
          this.genericListeners.add(handler);
        }
        /**
         * @description Registers a message listener that is invoked when a synchronous message of a specific type is received by the message broker
         * @param creator The synchronous message type to listen for
         * @param handler The message listener
         */
        listenFor(creator, handler) {
          const type = creator.type;
          const syncListeners = this.syncListeners.get(type);
          if (syncListeners) {
            syncListeners.add(handler);
          } else {
            this.syncListeners.set(type, /* @__PURE__ */ new Set([handler]));
          }
        }
        /**
         * @description Registers a message listener that is invoked when an asynchronous message of a specific type is received by the message broker
         * @param creator The asynchronous message type to listen for
         * @param handler The message listener
         */
        listenForAsync(creator, handler) {
          const type = creator.start.type;
          const asyncListeners = this.asyncListeners.get(type);
          if (asyncListeners) {
            asyncListeners.add(handler);
          } else {
            this.asyncListeners.set(type, /* @__PURE__ */ new Set([handler]));
          }
        }
        /**
         * @description Sends a synchronous message and returns immediately
         * @param message The synchronous messsage to send
         */
        send(message) {
          this.sendMessage(message);
        }
        /**
         * @description Sends an asynchronous message and waits until the receiver of the message responds
         * @param message The asynchronous messsage to send
         * @returns The response of the asynchronous messsage
         */
        async sendAsync(message) {
          return new Promise((resolve, reject) => {
            const { asyncId } = message;
            this.asyncResponders.set(asyncId, [
              resolve,
              reject
            ]);
            this.sendMessage(message);
          });
        }
        onMessage(event) {
          event = transformMessageEvent(event);
          if (!this.shouldProcessMessage(event)) {
            return;
          }
          const message = event.data;
          if (isWorkloadMessage(message)) {
            if (this.onWorkloadMessage) {
              this.onWorkloadMessage(event);
            }
            const isAsyncMessage = isAsyncWorkloadMessage(message);
            if (isAsyncMessage) {
              const resolvers = this.asyncResponders.get(message.asyncId);
              if (resolvers) {
                const [resolve, reject] = resolvers;
                const { type, asyncId, iframeId, tracingInfo, ...props } = message;
                if (type.startsWith(resolvePrefix)) {
                  resolve(props);
                  this.asyncResponders.delete(message.asyncId);
                } else if (message.type.startsWith(rejectPrefix)) {
                  reject(props);
                  this.asyncResponders.delete(message.asyncId);
                }
              }
            }
            for (const listener of Array.from(this.genericListeners)) {
              listener(message);
            }
            const syncListeners = this.syncListeners.get(message.type);
            if (syncListeners) {
              for (const listener of Array.from(syncListeners)) {
                listener(message);
              }
            }
            if (isAsyncWorkloadMessage(message) && message.type.startsWith(startPrefix)) {
              const asyncListeners = this.asyncListeners.get(message.type);
              if (asyncListeners) {
                for (const listener of Array.from(asyncListeners)) {
                  Promise.resolve(listener(message)).then((responseCreator) => this.sendMessage(responseCreator(message.iframeId, message.asyncId, message.tracingInfo)));
                }
              }
            }
          }
        }
        sendMessage(message) {
          const extMessage = recursiveRenameKeys(message, true);
          this.getTargetWindow(extMessage).postMessage(extMessage, this.getTargetOrigin(extMessage));
        }
      }
      function createWorkloadClientMessageBroker(config) {
        return new WorkloadClientMessageBrokerImpl(config.getIframeId, config.workloadHostWindow);
      }
      class WorkloadClientMessageBrokerImpl {
        constructor(getIframeId, workloadHostWindow) {
          this.getIframeId = getIframeId;
          this.broker = new MessageBroker({
            getTargetWindow: () => {
              if (!workloadHostWindow) {
                throw new Error("Cannot find the workload host window");
              }
              return workloadHostWindow;
            },
            getTargetOrigin: () => {
              return WorkloadMetaLoader.Load().workloadHostOrigin;
            },
            shouldProcessMessage: (event) => {
              return event.origin === WorkloadMetaLoader.Load().workloadHostOrigin;
            }
          });
        }
        listenFor(creator, handler) {
          this.broker.listenFor(creator, handler);
        }
        listenForAsync(creator, handler) {
          this.broker.listenForAsync(creator, handler);
        }
        send(message) {
          this.broker.send(message(this.getIframeId()));
        }
        async sendAsync(message) {
          return this.broker.sendAsync(message(this.getIframeId()));
        }
      }
      var WorkloadMessageType$1;
      (function(WorkloadMessageType2) {
        WorkloadMessageType2["executeAction"] = "ExecuteAction";
        WorkloadMessageType2["listenAction"] = "ListenAction";
        WorkloadMessageType2["onAction"] = "OnAction";
        WorkloadMessageType2["navigateAsync"] = "NavigateAsync";
        WorkloadMessageType2["navigateWorkloadAsync"] = "NavigateWorkloadAsync";
        WorkloadMessageType2["onNavigate"] = "OnNavigate";
        WorkloadMessageType2["listenLeave"] = "ListenLeave";
        WorkloadMessageType2["onLeave"] = "OnLeave";
        WorkloadMessageType2["listenLeaveEnd"] = "ListenLeaveEnd";
        WorkloadMessageType2["onLeaveEnd"] = "OnLeaveEnd";
        WorkloadMessageType2["getAccessToken"] = "GetAccessToken";
        WorkloadMessageType2["getSettings"] = "GetSettings";
        WorkloadMessageType2["onSettingsChange"] = "OnSettingsChange";
        WorkloadMessageType2["openNotification"] = "OpenNotification";
        WorkloadMessageType2["hideNotification"] = "hideNotification";
        WorkloadMessageType2["openPage"] = "OpenPage";
        WorkloadMessageType2["openDatahubDialog"] = "OpenDatahubDialog";
        WorkloadMessageType2["openDatahubWizardDialog"] = "OpenDatahubWizardDialog";
        WorkloadMessageType2["openDialog"] = "OpenDialog";
        WorkloadMessageType2["closeDialog"] = "CloseDialog";
        WorkloadMessageType2["openPanel"] = "OpenPanel";
        WorkloadMessageType2["closePanel"] = "ClosePanel";
        WorkloadMessageType2["logEvent"] = "LogEvent";
        WorkloadMessageType2["postLifecycleEvent"] = "PostLifecycleEvent";
        WorkloadMessageType2["postDOMEvent"] = "PostDOMEvent";
        WorkloadMessageType2["getDOMRect"] = "GetDOMRect";
        WorkloadMessageType2["resetFocus"] = "ResetFocus";
        WorkloadMessageType2["getTheme"] = "GetTheme";
        WorkloadMessageType2["onThemeChange"] = "OnThemeChange";
        WorkloadMessageType2["openItemRecentRuns"] = "OpenItemRecentRuns";
        WorkloadMessageType2["handleRequestFailure"] = "HandleRequestFailure";
        WorkloadMessageType2["handleInvalidRoute"] = "HandleInvalidRoute";
        WorkloadMessageType2["openError"] = "openError";
        WorkloadMessageType2["emitEvent"] = "EmitEvent";
        WorkloadMessageType2["checkPermissionsOfItem"] = "CheckPermissionsOfItem";
        WorkloadMessageType2["checkPermissionsOfItems"] = "checkPermissionsOfItems";
        WorkloadMessageType2["checkPermissionsOfWorkspace"] = "CheckPermissionsOfWorkspace";
        WorkloadMessageType2["getPermissionsOfItem"] = "GetPermissionsOfItem";
        WorkloadMessageType2["getPermissionsOfItemByUser"] = "GetPermissionsOfItemByUser";
        WorkloadMessageType2["getPermissionsOfWorkspace"] = "GetPermissionsOfWorkspace";
        WorkloadMessageType2["getUsersWithAccessToItem"] = "GetUsersWithAccessToItem";
        WorkloadMessageType2["checkItemSharingEnabled"] = "CheckItemSharingEnabled";
        WorkloadMessageType2["getItemTypeShareablePermissions"] = "GetItemTypeShareablePermissions";
        WorkloadMessageType2["openItemSharingDialog"] = "OpenItemSharingDialog";
        WorkloadMessageType2["openItemSharingDialogWithResult"] = "OpenItemSharingDialogWithResult";
        WorkloadMessageType2["openItemSettings"] = "OpenItemSettings";
        WorkloadMessageType2["onCloseItemSettings"] = "onCloseItemSettings";
        WorkloadMessageType2["resizeIframeHeight"] = "resizeIframeHeight";
        WorkloadMessageType2["postCdnFallbackEvent"] = "PostCdnFallbackEvent";
        WorkloadMessageType2["postCdnLazyLoadFailureEvent"] = "PostCdnLazyLoadFailureEvent";
        WorkloadMessageType2["openSubfolderPickerDialog"] = "OpenSubfolderPickerDialog";
        WorkloadMessageType2["favoriteItem"] = "FavoriteItem";
        WorkloadMessageType2["unFavoriteItem"] = "UnFavoriteItem";
        WorkloadMessageType2["getItemFavoriteState"] = "GetItemFavoriteState";
        WorkloadMessageType2["onItemFavoriteStateChange"] = "OnItemFavoriteUpdate";
        WorkloadMessageType2["subscribeItemFavoriteStateChange"] = "SubscribeItemFavoriteUpdate";
        WorkloadMessageType2["unSubscribeItemFavoriteStateChange"] = "UnSubscribeItemFavoriteUpdate";
        WorkloadMessageType2["performanceItemsRequest"] = "PerformanceItemsRequest";
        WorkloadMessageType2["reportPackageMetadata"] = "ReportPackageMetadata";
        WorkloadMessageType2["logError"] = "LogError";
        WorkloadMessageType2["getItemDefinitions"] = "GetItemDefinitions";
        WorkloadMessageType2["reportINPMetric"] = "ReportINPMetric";
        WorkloadMessageType2["getPerfSnapshot"] = "GetPerfSnapshot";
      })(WorkloadMessageType$1 || (WorkloadMessageType$1 = {}));
      const executeAction = createAsyncWorkloadMessage(WorkloadMessageType$1.executeAction);
      const listenAction = createAsyncWorkloadMessage(WorkloadMessageType$1.listenAction);
      const onAction = createAsyncWorkloadMessage(WorkloadMessageType$1.onAction);
      const navigateAsync = createAsyncWorkloadMessage(WorkloadMessageType$1.navigateAsync);
      const navigateWorkloadAsync = createAsyncWorkloadMessage(WorkloadMessageType$1.navigateWorkloadAsync);
      const onNavigate = createWorkloadMessage(WorkloadMessageType$1.onNavigate);
      const listenLeave = createAsyncWorkloadMessage(WorkloadMessageType$1.listenLeave);
      const onLeave = createAsyncWorkloadMessage(WorkloadMessageType$1.onLeave);
      const listenLeaveEnd = createAsyncWorkloadMessage(WorkloadMessageType$1.listenLeaveEnd);
      const onLeaveEnd = createAsyncWorkloadMessage(WorkloadMessageType$1.onLeaveEnd);
      const getAccessToken = createAsyncWorkloadMessage(WorkloadMessageType$1.getAccessToken);
      const getSettings = createAsyncWorkloadMessage(WorkloadMessageType$1.getSettings);
      const onSettingsChange = createWorkloadMessage(WorkloadMessageType$1.onSettingsChange);
      const openNotification = createAsyncWorkloadMessage(WorkloadMessageType$1.openNotification);
      const hideNotification = createWorkloadMessage(WorkloadMessageType$1.hideNotification);
      const openPage = createAsyncWorkloadMessage(WorkloadMessageType$1.openPage);
      const openDatahubDialog = createAsyncWorkloadMessage(WorkloadMessageType$1.openDatahubDialog);
      const openDatahubWizardDialog = createAsyncWorkloadMessage(WorkloadMessageType$1.openDatahubWizardDialog);
      const openDialog = createAsyncWorkloadMessage(WorkloadMessageType$1.openDialog);
      const closeDialog = createAsyncWorkloadMessage(WorkloadMessageType$1.closeDialog);
      const openPanel = createAsyncWorkloadMessage(WorkloadMessageType$1.openPanel);
      const closePanel = createAsyncWorkloadMessage(WorkloadMessageType$1.closePanel);
      const logEvent = createWorkloadMessage(WorkloadMessageType$1.logEvent);
      const postLifecycleEvent = createWorkloadMessage(WorkloadMessageType$1.postLifecycleEvent);
      const postDOMEvent = createWorkloadMessage(WorkloadMessageType$1.postDOMEvent);
      const getDOMRect = createAsyncWorkloadMessage(WorkloadMessageType$1.getDOMRect);
      const resetFocus = createWorkloadMessage(WorkloadMessageType$1.resetFocus);
      const getTheme = createAsyncWorkloadMessage(WorkloadMessageType$1.getTheme);
      const onThemeChange = createWorkloadMessage(WorkloadMessageType$1.onThemeChange);
      const openItemRecentRuns = createAsyncWorkloadMessage(WorkloadMessageType$1.openItemRecentRuns);
      const handleRequestFailure = createAsyncWorkloadMessage(WorkloadMessageType$1.handleRequestFailure);
      const handleInvalidRoute = createWorkloadMessage(WorkloadMessageType$1.handleInvalidRoute);
      const openError = createAsyncWorkloadMessage(WorkloadMessageType$1.openError);
      const emitEvent = createWorkloadMessage(WorkloadMessageType$1.emitEvent);
      const checkPermissionsOfItem = createAsyncWorkloadMessage(WorkloadMessageType$1.checkPermissionsOfItem);
      const checkPermissionsOfItems = createAsyncWorkloadMessage(WorkloadMessageType$1.checkPermissionsOfItems);
      const checkPermissionsOfWorkspace = createAsyncWorkloadMessage(WorkloadMessageType$1.checkPermissionsOfWorkspace);
      const getPermissionsOfItem = createAsyncWorkloadMessage(WorkloadMessageType$1.getPermissionsOfItem);
      const getPermissionsOfItemByUser = createAsyncWorkloadMessage(WorkloadMessageType$1.getPermissionsOfItemByUser);
      const getPermissionsOfWorkspace = createAsyncWorkloadMessage(WorkloadMessageType$1.getPermissionsOfWorkspace);
      const getUsersWithAccessToItem = createAsyncWorkloadMessage(WorkloadMessageType$1.getUsersWithAccessToItem);
      const checkItemSharingEnabled = createAsyncWorkloadMessage(WorkloadMessageType$1.checkItemSharingEnabled);
      const getItemTypeShareablePermissions = createAsyncWorkloadMessage(WorkloadMessageType$1.getItemTypeShareablePermissions);
      const openItemSharingDialog = createWorkloadMessage(WorkloadMessageType$1.openItemSharingDialog);
      const openItemSharingDialogWithResult = createAsyncWorkloadMessage(WorkloadMessageType$1.openItemSharingDialogWithResult);
      const openItemSettings = createAsyncWorkloadMessage(WorkloadMessageType$1.openItemSettings);
      const onCloseItemSettings = createWorkloadMessage(WorkloadMessageType$1.onCloseItemSettings);
      const resizeIframeHeight = createAsyncWorkloadMessage(WorkloadMessageType$1.resizeIframeHeight);
      const postCdnFallbackEvent = createWorkloadMessage(WorkloadMessageType$1.postCdnFallbackEvent);
      const postCdnLazyLoadFailureEvent = createWorkloadMessage(WorkloadMessageType$1.postCdnLazyLoadFailureEvent);
      const openSubfolderPickerDialog = createAsyncWorkloadMessage(WorkloadMessageType$1.openSubfolderPickerDialog);
      const favoriteItem = createAsyncWorkloadMessage(WorkloadMessageType$1.favoriteItem);
      const unFavoriteItem = createAsyncWorkloadMessage(WorkloadMessageType$1.unFavoriteItem);
      const getItemFavoriteState = createAsyncWorkloadMessage(WorkloadMessageType$1.getItemFavoriteState);
      const onItemFavoriteStateChange = createWorkloadMessage(WorkloadMessageType$1.onItemFavoriteStateChange);
      const subscribeItemFavoriteStateChange = createAsyncWorkloadMessage(WorkloadMessageType$1.subscribeItemFavoriteStateChange);
      const unSubscribeItemFavoriteStateChange = createWorkloadMessage(WorkloadMessageType$1.unSubscribeItemFavoriteStateChange);
      const getPerformanceItems = createAsyncWorkloadMessage(WorkloadMessageType$1.performanceItemsRequest);
      const reportPackageMetadata = createWorkloadMessage(WorkloadMessageType$1.reportPackageMetadata);
      const logError = createWorkloadMessage(WorkloadMessageType$1.logError);
      const getItemDefinitions = createAsyncWorkloadMessage(WorkloadMessageType$1.getItemDefinitions);
      const reportINPMetric = createWorkloadMessage(WorkloadMessageType$1.reportINPMetric);
      const getPerfSnapshot = createAsyncWorkloadMessage(WorkloadMessageType$1.getPerfSnapshot);
      const Messages$2 = {
        executeAction,
        listenAction,
        onAction,
        navigateAsync,
        navigateWorkloadAsync,
        onNavigate,
        listenLeave,
        onLeave,
        listenLeaveEnd,
        onLeaveEnd,
        getAccessToken,
        getSettings,
        onSettingsChange,
        openNotification,
        hideNotification,
        openPage,
        openDatahubDialog,
        openDatahubWizardDialog,
        openDialog,
        closeDialog,
        openPanel,
        closePanel,
        logEvent,
        postLifecycleEvent,
        postDOMEvent,
        getDOMRect,
        resetFocus,
        getTheme,
        onThemeChange,
        openItemRecentRuns,
        openError,
        emitEvent,
        handleRequestFailure,
        handleInvalidRoute,
        checkPermissionsOfItem,
        checkPermissionsOfItems,
        checkPermissionsOfWorkspace,
        getPermissionsOfItem,
        getPermissionsOfItemByUser,
        getPermissionsOfWorkspace,
        getUsersWithAccessToItem,
        checkItemSharingEnabled,
        getItemTypeShareablePermissions,
        openItemSharingDialog,
        openItemSharingDialogWithResult,
        openItemSettings,
        onCloseItemSettings,
        resizeIframeHeight,
        postCdnFallbackEvent,
        postCdnLazyLoadFailureEvent,
        openSubfolderPickerDialog,
        favoriteItem,
        unFavoriteItem,
        getItemFavoriteState,
        onItemFavoriteStateChange,
        subscribeItemFavoriteStateChange,
        unSubscribeItemFavoriteStateChange,
        getPerformanceItems,
        reportPackageMetadata,
        logError,
        getItemDefinitions,
        reportINPMetric,
        getPerfSnapshot
      };
      class _ErrorHandlingClient {
        constructor(broker) {
          this.broker = broker;
        }
        registerUnhandledExceptionHandler(config) {
          window.addEventListener("unhandledrejection", (event) => {
            event.preventDefault();
            let unhandledErrorMessage = "Unknown Error";
            if (event.reason instanceof Error) {
              unhandledErrorMessage = event.reason.message;
            } else {
              unhandledErrorMessage = `Got unhandled rejection of non Error type. Type: ${typeof event?.reason}, className: ${event?.reason?.constructor?.name || ""}.`;
            }
            this.broker.send(Messages$2.logEvent({
              name: "Unhandled Exception",
              properties: {
                ErrorCategory: "UnhandledRejection",
                ErrorMessage: unhandledErrorMessage,
                IFrame: config.iframe
              }
            }));
          });
          window.addEventListener("error", (event) => {
            this.broker.send(Messages$2.logEvent({
              name: "Unhandled Exception",
              properties: {
                ErrorCategory: "GlobalError",
                ErrorMessage: event?.message || "",
                ErrorSource: event?.filename || "",
                IFrame: config.iframe
              }
            }));
          });
        }
      }
      class _InteractionClient {
        constructor(broker) {
          this.broker = broker;
        }
        postDOMEvent(config) {
          const defaultConfig = {
            eventInitDict: {
              bubbles: true,
              cancelable: true,
              composed: true
            }
          };
          return this.broker.send(Messages$2.postDOMEvent({ ...defaultConfig, ...config }));
        }
        onResetFocus(callback) {
          return this.broker.listenFor(Messages$2.resetFocus, callback);
        }
        onQueryDomRect(callback) {
          this.broker.listenForAsync(Messages$2.getDOMRect, (config) => {
            return callback(config).then((result) => Messages$2.getDOMRect.resolve({ ...result })).catch((error) => Messages$2.getDOMRect.reject({ error }));
          });
        }
      }
      const MAX_CACHE_SIZE = 1e3;
      class _PerformanceItemsClient {
        constructor(broker) {
          this.broker = broker;
          this.cursor = 0;
          this.performanceItems = [];
          this.performanceObserver = window.PerformanceObserver ? new PerformanceObserver((list) => {
            this.pushPerformanceItems(list.getEntries());
          }) : null;
        }
        init() {
          this.pushPerformanceItems(performance.getEntries());
          this.performanceObserver?.observe({
            entryTypes: [
              // mark and measure are usually customized by workloads, which are not meanful to shell, instead, they can be noisy.
              ...PerformanceObserver.supportedEntryTypes.filter((t2) => t2 !== "mark" && t2 !== "measure")
            ],
            buffered: false
            // Ignore the buffered entries.
          });
          this.broker.listenForAsync(Messages$2.getPerformanceItems, (config) => {
            return Messages$2.getPerformanceItems.resolve(this.pickPerformanceItems(config));
          });
        }
        pushPerformanceItems(items) {
          this.performanceItems = this.performanceItems.concat(items);
          this.checkSize();
        }
        checkSize() {
          if (this.performanceItems.length > MAX_CACHE_SIZE) {
            const excess = this.performanceItems.length - MAX_CACHE_SIZE;
            this.performanceItems.splice(0, excess);
            this.cursor += excess;
          }
        }
        pickPerformanceItems(config) {
          const { start, length } = config;
          const startIndex = Math.max(start - this.cursor, 0);
          const endIndex = Math.min(startIndex + Math.max(length, 0), this.performanceItems.length);
          const items = this.performanceItems.slice(startIndex, endIndex);
          this.performanceItems.splice(0, endIndex);
          const originalCursor = this.cursor;
          this.cursor += endIndex;
          if (length === 0) {
            this.performanceObserver?.disconnect();
          }
          return {
            performanceItems: items.map(this.convertPerformanceItem),
            range: [startIndex + originalCursor, endIndex + originalCursor],
            pendingItemsLength: this.performanceItems.length
          };
        }
        convertPerformanceItem(entry) {
          return JSON.parse(JSON.stringify(entry));
        }
      }
      class _TelemetryClient {
        constructor(broker) {
          this.broker = broker;
        }
        logEvent(event, eventOptions) {
          return this.broker.send(Messages$2.logEvent({ ...event, eventOptions }));
        }
        postLifecycleEvent(event) {
          this.broker.send(Messages$2.postLifecycleEvent(event));
        }
        reportPackageMetadata(event) {
          this.broker.send(Messages$2.reportPackageMetadata(event));
        }
      }
      function getWorker(meta, frames) {
        return meta.iframeType === "worker" ? window : Array.prototype.find.call(frames, (frame) => {
          try {
            return isTargetedIFrame(frame, meta.workloadName, "worker");
          } catch {
            return void 0;
          }
        });
      }
      function isTargetedIFrame(target, workloadName, iframeType) {
        const meta = WorkloadMetaLoader.Load(target);
        return meta.iframeType === iframeType && meta.workloadName === workloadName;
      }
      const WORKER_IFRAME_STATE = "WORKER_IFRAME_STATE";
      class _WorkerClient {
        constructor(metaFactory, config) {
          this.metaFactory = metaFactory;
          this.config = config;
        }
        get workIFrameState() {
          if (this._workerIFrameState) {
            return Promise.resolve(this._workerIFrameState);
          }
          const meta = this.metaFactory();
          return this.getState(meta, this.config.workloadHostWindow.frames, WORKER_IFRAME_STATE).then((workerState) => {
            this._workerIFrameState = workerState;
            return workerState;
          });
        }
        sleep(delayInMS) {
          return new Promise((resolve) => setTimeout(resolve, delayInMS));
        }
        async getState(meta, frames, symbolKey) {
          const symbol = Symbol.for(symbolKey);
          const maxRetryCount = 150;
          const delayInMS = 100;
          let worker = void 0;
          let currentRetryCount = 0;
          while (currentRetryCount < maxRetryCount && !worker) {
            worker = getWorker(meta, frames);
            if (!worker) {
              await this.sleep(delayInMS);
              currentRetryCount++;
            }
          }
          if (!worker) {
            throw new Error(`Cannot find the worker frame of ${meta.workloadName}`);
          }
          if (!worker[symbol]) {
            Object.defineProperty(worker, symbol, {
              value: {},
              writable: false,
              enumerable: false,
              configurable: false
            });
          }
          return worker;
        }
      }
      class _CdnClient {
        constructor(broker) {
          this.broker = broker;
        }
        /**
         * @description
         * This API is used to post fallback messages to the shell in eager load scenarios. It is invoked only when eager loading of a static file from the CDN fails, during the workload bootstrap process. Upon receiving this message, the shell updates local storage to temporarily disable CDN usage for the corresponding workload.
         *
         * @param CdnFallbackEvent
         * The event payload includes {workloadName, timestamp}.
         */
        postCdnFallbackEvent(event) {
          this.broker.send(Messages$2.postCdnFallbackEvent(event));
        }
        /**
         * @description
         * This API is used to post fallback messages to the shell in lazy load scenarios. It is triggered when a lazy load chunk fails to load. Upon receiving the message, the shell updates local storage to temporarily disable CDN usage for the corresponding workload.
         *
         * @param CdnLazyLoadFailureEvent
         *  The event payload includes {workloadName, timestamp, iframeType, iframeId}.
         */
        postCdnLazyLoadFailureEvent(event) {
          this.broker.send(Messages$2.postCdnLazyLoadFailureEvent(event));
        }
      }
      class _INPClient {
        constructor(broker) {
          this.broker = broker;
        }
        async init() {
          try {
            const { onINP } = await Promise.resolve().then(function() {
              return webVitals_attribution;
            });
            onINP((metric) => {
              this.reportINPMetric(metric);
            }, {
              reportAllChanges: true
            });
          } catch (e2) {
            this.broker.send(Messages$2.logEvent({
              name: "Perf.INP.OnINPImportFailed",
              properties: { errorName: e2?.name, errorMessage: e2?.message }
            }));
          }
        }
        reportINPMetric(metric) {
          try {
            const memory = performance.memory;
            this.broker.send(Messages$2.reportINPMetric({
              value: metric.value,
              rating: metric.rating,
              delta: metric.delta,
              id: metric.id,
              loadState: metric.attribution.loadState,
              navigationType: metric.navigationType,
              interactionType: metric.attribution.interactionType,
              interactionTarget: metric.attribution.interactionTarget,
              interactionTime: metric.attribution.interactionTime,
              inputDelay: metric.attribution.inputDelay,
              processingDuration: metric.attribution.processingDuration,
              presentationDelay: metric.attribution.presentationDelay,
              usedJSHeapSize: memory?.usedJSHeapSize ?? null,
              jsHeapSizeLimit: memory?.jsHeapSizeLimit ?? null,
              totalJSHeapSize: memory?.totalJSHeapSize ?? null
            }));
          } catch (e2) {
            this.broker.send(Messages$2.logEvent({
              name: "Perf.INP.ReportMetricFailed",
              properties: { errorName: e2?.name, errorMessage: e2?.message }
            }));
          }
        }
      }
      const PERF_SNAPSHOT_KEY = /* @__PURE__ */ Symbol.for("PERF_SNAPSHOT_DATA");
      const EMPTY_PAGE_DATA = {
        longTaskDurations: [],
        lafDurations: [],
        memoryMeasurements: [],
        jsHeapSizeLimit: 0
      };
      const MAX_ENTRIES = 200;
      class _PerfSnapshotClient {
        constructor(broker, getSharedState) {
          this.broker = broker;
          this.getSharedState = getSharedState;
          this.longTaskDurations = [];
          this.lafDurations = [];
          this.memoryMeasurements = [];
          this.memoryIntervalId = null;
          this.longTaskObserver = null;
          this.lafObserver = null;
          this.iframeType = "";
        }
        init(iframeType) {
          this.iframeType = iframeType;
          this.setupObserver("longtask", this.longTaskDurations, "Perf.Snapshot.LongTaskObserverFailed");
          this.setupObserver("long-animation-frame", this.lafDurations, "Perf.Snapshot.LAFObserverFailed");
          this.startMemoryCollection();
          if (this.iframeType === "worker") {
            this.broker.listenForAsync(Messages$2.getPerfSnapshot, () => {
              try {
                const aggregated = {
                  worker: this.getSnapshot(),
                  page: this.getPageSnapshot()
                };
                return Messages$2.getPerfSnapshot.resolve(aggregated);
              } catch (e2) {
                this.broker.send(Messages$2.logEvent({
                  name: "Perf.Snapshot.RequestHandlingFailed",
                  properties: { iframeType: this.iframeType, errorName: e2?.name, errorMessage: e2?.message }
                }));
                return Messages$2.getPerfSnapshot.reject({ error: e2 });
              }
            });
          }
        }
        getPageSnapshot() {
          try {
            if (!this.getSharedState) {
              return EMPTY_PAGE_DATA;
            }
            const sharedState = this.getSharedState();
            const pageData = sharedState[PERF_SNAPSHOT_KEY];
            if (pageData) {
              delete sharedState[PERF_SNAPSHOT_KEY];
              return pageData;
            }
            return EMPTY_PAGE_DATA;
          } catch (e2) {
            this.broker.send(Messages$2.logEvent({
              name: "Perf.Snapshot.GetPageSnapshotFailed",
              properties: { iframeType: this.iframeType, errorName: e2?.name, errorMessage: e2?.message }
            }));
            return EMPTY_PAGE_DATA;
          }
        }
        setupObserver(entryType, durationArray, errorEventName) {
          try {
            if (!("PerformanceObserver" in window)) {
              return;
            }
            if (entryType === "long-animation-frame" && !PerformanceObserver.supportedEntryTypes.includes("long-animation-frame")) {
              return;
            }
            const observer = new PerformanceObserver((list) => {
              for (const entry of list.getEntries()) {
                this.pushWithLimit(durationArray, entry.duration);
              }
              if (this.iframeType === "page" && this.getSharedState) {
                this.storeDataInSharedState();
              }
            });
            observer.observe({ entryTypes: [entryType] });
            if (entryType === "longtask") {
              this.longTaskObserver = observer;
            } else {
              this.lafObserver = observer;
            }
            if (this.iframeType === "page" && this.getSharedState) {
              observer.observe({ entryTypes: [entryType] });
              this.storeDataInSharedState();
            }
          } catch (e2) {
            this.broker.send(Messages$2.logEvent({
              name: errorEventName,
              properties: { iframeType: this.iframeType, errorName: e2?.name, errorMessage: e2?.message }
            }));
          }
        }
        startMemoryCollection() {
          this.collectMemoryMeasurement();
          this.memoryIntervalId = window.setInterval(() => this.collectMemoryMeasurement(), 3e4);
        }
        collectMemoryMeasurement() {
          try {
            const memory = performance.memory;
            if (memory?.usedJSHeapSize != null) {
              this.pushWithLimit(this.memoryMeasurements, memory.usedJSHeapSize);
              if (this.iframeType === "page" && this.getSharedState) {
                this.storeDataInSharedState();
              }
            }
          } catch {
          }
        }
        pushWithLimit(array, value) {
          if (array.length >= MAX_ENTRIES) {
            array.shift();
          }
          array.push(value);
        }
        getSnapshot() {
          const memory = performance.memory;
          const jsHeapSizeLimit = memory?.jsHeapSizeLimit ?? 0;
          const data = {
            longTaskDurations: [...this.longTaskDurations],
            lafDurations: [...this.lafDurations],
            memoryMeasurements: [...this.memoryMeasurements],
            jsHeapSizeLimit
          };
          this.reset();
          return data;
        }
        storeDataInSharedState() {
          if (!this.getSharedState) {
            return;
          }
          try {
            const memory = performance.memory;
            const jsHeapSizeLimit = memory?.jsHeapSizeLimit ?? 0;
            const data = {
              longTaskDurations: [...this.longTaskDurations],
              lafDurations: [...this.lafDurations],
              memoryMeasurements: [...this.memoryMeasurements],
              jsHeapSizeLimit
            };
            this.getSharedState()[PERF_SNAPSHOT_KEY] = data;
          } catch (e2) {
            this.broker.send(Messages$2.logEvent({
              name: "Perf.Snapshot.StoreSharedStateFailed",
              properties: { errorName: e2?.name, errorMessage: e2?.message }
            }));
          }
        }
        reset() {
          this.longTaskDurations = [];
          this.lafDurations = [];
          this.memoryMeasurements = [];
        }
        dispose() {
          if (this.longTaskObserver) {
            this.longTaskObserver.disconnect();
            this.longTaskObserver = null;
          }
          if (this.lafObserver) {
            this.lafObserver.disconnect();
            this.lafObserver = null;
          }
          if (this.memoryIntervalId !== null) {
            window.clearInterval(this.memoryIntervalId);
            this.memoryIntervalId = null;
          }
        }
      }
      class ActionClient {
        constructor(broker) {
          this.broker = broker;
        }
        execute(action) {
          return this.broker.sendAsync(Messages$2.executeAction.start(action));
        }
        onAction(handler) {
          this.broker.sendAsync(Messages$2.listenAction.start({}));
          return this.broker.listenForAsync(Messages$2.onAction, (action) => {
            return handler(action).then((result) => Messages$2.onAction.resolve({ result })).catch((error) => Messages$2.onAction.reject({ error }));
          });
        }
      }
      class ItemRecentRunsClient {
        constructor(broker) {
          this.broker = broker;
        }
        open(config) {
          return this.broker.sendAsync(Messages$2.openItemRecentRuns.start(config));
        }
      }
      class ItemSettingsClient {
        constructor(broker) {
          this.broker = broker;
        }
        open(config) {
          return this.broker.sendAsync(Messages$2.openItemSettings.start(config));
        }
        onClose(callback) {
          return this.broker.listenFor(Messages$2.onCloseItemSettings, callback);
        }
        setIframeDimensions(config) {
          this.broker.sendAsync(Messages$2.resizeIframeHeight.start({ iframeHeight: config.iframeHeight, itemId: config.itemId }));
        }
      }
      let AuthClient$1 = class AuthClient {
        constructor(broker) {
          this.broker = broker;
        }
        getAccessToken(scopes, forceRefresh) {
          return this.broker.sendAsync(Messages$2.getAccessToken.start({ scopes, forceRefresh }));
        }
      };
      class DatahubClient {
        constructor(broker) {
          this.broker = broker;
        }
        openDialog(config) {
          return this.broker.sendAsync(Messages$2.openDatahubDialog.start(config));
        }
        openDatahubWizardDialog(config) {
          return this.broker.sendAsync(Messages$2.openDatahubWizardDialog.start(config));
        }
      }
      async function runWithFocusRestoration(callback, preventFocusRestoration) {
        if (preventFocusRestoration) {
          return await callback();
        }
        const activeElement = getFocusedElementPierceShadowDom();
        try {
          return await callback();
        } finally {
          if (activeElement instanceof HTMLElement && activeElement.isConnected) {
            activeElement.focus();
          }
        }
      }
      function getFocusedElementPierceShadowDom() {
        let activeElement = typeof document !== "undefined" && document ? document.activeElement : null;
        while (activeElement && activeElement.shadowRoot) {
          const newActiveElement = activeElement.shadowRoot.activeElement;
          if (newActiveElement === activeElement) {
            break;
          } else {
            activeElement = newActiveElement;
          }
        }
        return activeElement;
      }
      class DialogClient {
        constructor(broker) {
          this.broker = broker;
        }
        open(config) {
          return runWithFocusRestoration(() => this.broker.sendAsync(Messages$2.openDialog.start(config)), config.preventFocusRestoration);
        }
        close(config) {
          return this.broker.sendAsync(Messages$2.closeDialog.start(config || {}));
        }
      }
      class ErrorHandlingClient {
        constructor(broker) {
          this.broker = broker;
        }
        handleRequestFailure(response) {
          let headers = response.headers;
          if (Headers && response.headers instanceof Headers) {
            headers = {};
            response.headers.forEach((value, key) => {
              headers[key] = value;
            });
          }
          return this.broker.sendAsync(Messages$2.handleRequestFailure.start({ ...response, headers }));
        }
        handleInvalidRoute(config) {
          this.broker.send(Messages$2.handleInvalidRoute(config || {}));
        }
        openErrorDialog(config) {
          function probeErrorMessage(reason) {
            if (reason == null) {
              return "Unknown error";
            }
            if (reason instanceof Error) {
              return `${reason.name}: ${reason.message}`;
            }
            if (typeof reason === "object") {
              try {
                return JSON.stringify(reason);
              } catch (e2) {
                return `Unstructured Error: ${e2 instanceof Error ? e2.message : e2}`;
              }
            }
            return `${reason}`;
          }
          const { errorMsg, errorOptions, kind, featureName, width, autoFocus, ...rest } = config;
          return this.broker.sendAsync(Messages$2.openError.start({
            ...rest,
            errorMsg: probeErrorMessage(errorMsg),
            errorOptions,
            kind,
            featureName,
            width,
            autoFocus
          }));
        }
      }
      class EventClient {
        constructor(broker) {
          this.broker = broker;
        }
        emitEvent(details) {
          return this.broker.send(Messages$2.emitEvent(details));
        }
      }
      let NavigationClient$1 = class NavigationClient {
        constructor(broker) {
          this.broker = broker;
        }
        navigate(target, route) {
          return target === "host" ? this.broker.sendAsync(Messages$2.navigateAsync.start(route)) : this.broker.sendAsync(Messages$2.navigateWorkloadAsync.start(route));
        }
        onNavigate(callback) {
          return this.broker.listenFor(Messages$2.onNavigate, callback);
        }
        onBeforeNavigateAway(callback) {
          this.broker.listenForAsync(Messages$2.onLeave, (leaveData) => {
            return callback(leaveData).then((result) => Messages$2.onLeave.resolve({ ...result })).catch((error) => Messages$2.onLeave.reject({ error }));
          });
          this.broker.sendAsync(Messages$2.listenLeave.start());
        }
        onAfterNavigateAway(callback) {
          this.broker.listenForAsync(Messages$2.onLeaveEnd, (leaveEndData) => {
            return callback(leaveEndData).then((result) => Messages$2.onLeaveEnd.resolve({ result })).catch((error) => Messages$2.onLeaveEnd.reject({ error }));
          });
          this.broker.sendAsync(Messages$2.listenLeaveEnd.start());
        }
      };
      class NotificationClient {
        constructor(broker) {
          this.broker = broker;
        }
        open(config) {
          return this.broker.sendAsync(Messages$2.openNotification.start(config));
        }
        hide(config) {
          return this.broker.send(Messages$2.hideNotification(config));
        }
      }
      class PageClient {
        constructor(broker) {
          this.broker = broker;
        }
        open(config) {
          return this.broker.sendAsync(Messages$2.openPage.start(config));
        }
      }
      class PanelClient {
        constructor(broker) {
          this.broker = broker;
        }
        open(config) {
          return runWithFocusRestoration(() => this.broker.sendAsync(Messages$2.openPanel.start(config)), config.preventFocusRestoration);
        }
        close(config) {
          return this.broker.sendAsync(Messages$2.closePanel.start(config || {}));
        }
      }
      class PermissionClient {
        constructor(broker) {
          this.broker = broker;
        }
        checkPermissionsOfItem(input) {
          return this.broker.sendAsync(Messages$2.checkPermissionsOfItem.start(input));
        }
        checkPermissionsOfItems(input) {
          return this.broker.sendAsync(Messages$2.checkPermissionsOfItems.start(input));
        }
        checkPermissionsOfWorkspace(input) {
          return this.broker.sendAsync(Messages$2.checkPermissionsOfWorkspace.start(input));
        }
        getPermissionsOfItem(input) {
          return this.broker.sendAsync(Messages$2.getPermissionsOfItem.start(input));
        }
        getPermissionsOfItemByUser(input) {
          return this.broker.sendAsync(Messages$2.getPermissionsOfItemByUser.start(input));
        }
        getPermissionsOfWorkspace(input) {
          return this.broker.sendAsync(Messages$2.getPermissionsOfWorkspace.start(input));
        }
        getUsersWithAccessToItem(input) {
          return this.broker.sendAsync(Messages$2.getUsersWithAccessToItem.start(input));
        }
        openItemSharingDialog(config) {
          return this.broker.send(Messages$2.openItemSharingDialog(config));
        }
        openItemSharingDialogWithResult(config) {
          return this.broker.sendAsync(Messages$2.openItemSharingDialogWithResult.start(config));
        }
        checkItemSharingEnabled(input) {
          return this.broker.sendAsync(Messages$2.checkItemSharingEnabled.start(input));
        }
        getItemTypeShareablePermissions(input) {
          return this.broker.sendAsync(Messages$2.getItemTypeShareablePermissions.start(input));
        }
      }
      class SettingsClient {
        constructor(broker) {
          this.broker = broker;
        }
        get() {
          return this.broker.sendAsync(Messages$2.getSettings.start());
        }
        onChange(callback) {
          return this.broker.listenFor(Messages$2.onSettingsChange, callback);
        }
      }
      const SHARED_STATE_KEY = /* @__PURE__ */ Symbol.for("SHARED_STATE");
      class StateClient {
        constructor(metaFactory, config) {
          this.metaFactory = metaFactory;
          this.config = config;
        }
        get sharedState() {
          if (this._sharedState) {
            return this._sharedState;
          }
          const meta = this.metaFactory();
          const worker = getWorker(meta, this.config.workloadHostWindow.frames);
          if (!worker) {
            throw new Error(`Cannot find the worker frame of ${meta.workloadName}`);
          }
          if (!worker[SHARED_STATE_KEY]) {
            Object.defineProperty(worker, SHARED_STATE_KEY, {
              value: {},
              writable: false,
              enumerable: false,
              configurable: false
            });
          }
          return this._sharedState = worker[SHARED_STATE_KEY];
        }
      }
      class SubfolderClient {
        constructor(broker) {
          this.broker = broker;
        }
        openSubfolderPickerDialog(config) {
          return this.broker.sendAsync(Messages$2.openSubfolderPickerDialog.start(config));
        }
      }
      class ThemeClient {
        constructor(broker) {
          this.broker = broker;
        }
        get() {
          return this.broker.sendAsync(Messages$2.getTheme.start());
        }
        onChange(callback) {
          return this.broker.listenFor(Messages$2.onThemeChange, callback);
        }
      }
      class FavoriteClient {
        constructor(broker) {
          this.broker = broker;
        }
        favoriteItem(input) {
          return this.broker.sendAsync(Messages$2.favoriteItem.start(input));
        }
        unFavoriteItem(input) {
          return this.broker.sendAsync(Messages$2.unFavoriteItem.start(input));
        }
        getItemFavoriteState(input) {
          return this.broker.sendAsync(Messages$2.getItemFavoriteState.start(input));
        }
        onItemFavoriteStateChange(input, callback) {
          let subId;
          this.broker.listenFor(Messages$2.onItemFavoriteStateChange, ({ subscriptionId, changes }) => {
            if (subscriptionId === subId) {
              const item = changes.find((change) => change.itemObjectId === input.itemObjectId);
              if (item) {
                callback({ favorited: item.favorited });
              }
            }
          });
          return this.broker.sendAsync(Messages$2.subscribeItemFavoriteStateChange.start(input)).then(({ subscriptionId }) => {
            subId = subscriptionId;
            return {
              unsubscribe: () => {
                subId = void 0;
                this.broker.send(Messages$2.unSubscribeItemFavoriteStateChange({ subscriptionId }));
              }
            };
          });
        }
      }
      class ItemDefinitionsClient {
        constructor(broker) {
          this.broker = broker;
        }
        getItemDefinitions(input) {
          return this.broker.sendAsync(Messages$2.getItemDefinitions.start(input));
        }
      }
      let WorkloadClient$1 = class WorkloadClient {
        constructor(config = DefaultWorkloadClientConfig) {
          this.config = config;
          this.broker = createWorkloadClientMessageBroker({ getIframeId: () => this.meta.iframeId, workloadHostWindow: this.config.workloadHostWindow });
          this._errorHandling = new _ErrorHandlingClient(this.broker);
          this._interaction = new _InteractionClient(this.broker);
          this._performanceItems = new _PerformanceItemsClient(this.broker);
          this._inp = new _INPClient(this.broker);
          this._perfSnapshot = new _PerfSnapshotClient(this.broker, () => this.state.sharedState);
          this._telemetry = new _TelemetryClient(this.broker);
          this._worker = new _WorkerClient(() => this.meta, this.config);
          this._cdn = new _CdnClient(this.broker);
          this.auth = new AuthClient$1(this.broker);
          this.event = new EventClient(this.broker);
          this.action = new ActionClient(this.broker);
          this.itemDefinitions = new ItemDefinitionsClient(this.broker);
          this.itemRecentRuns = new ItemRecentRunsClient(this.broker);
          this.itemSettings = new ItemSettingsClient(this.broker);
          this.dialog = new DialogClient(this.broker);
          this.datahub = new DatahubClient(this.broker);
          this.errorHandling = new ErrorHandlingClient(this.broker);
          this.favorite = new FavoriteClient(this.broker);
          this.navigation = new NavigationClient$1(this.broker);
          this.notification = new NotificationClient(this.broker);
          this.page = new PageClient(this.broker);
          this.panel = new PanelClient(this.broker);
          this.permission = new PermissionClient(this.broker);
          this.settings = new SettingsClient(this.broker);
          this.state = new StateClient(() => this.meta, this.config);
          this.subfolder = new SubfolderClient(this.broker);
          this.theme = new ThemeClient(this.broker);
          if (!config.workloadHostWindow) {
            throw new Error("Create workload client failed: empty workload host window");
          }
        }
        get meta() {
          return WorkloadMetaLoader.Load();
        }
      };
      const PACKAGE_NAME$3 = "@fabric/workload-client-common";
      const CLIENT_VERSION$3 = "1.20.162";
      const PUBLISH_DATE$3 = "2026-02-26T02:04:18.050Z";
      if (window.reportPackageMetadata) {
        window.reportPackageMetadata({
          packageName: PACKAGE_NAME$3,
          version: CLIENT_VERSION$3,
          publishDate: PUBLISH_DATE$3
        });
      } else {
        if (!window.packageMetadata)
          window.packageMetadata = {};
        window.packageMetadata[PACKAGE_NAME$3] = {
          packageName: PACKAGE_NAME$3,
          version: CLIENT_VERSION$3,
          publishDate: PUBLISH_DATE$3
        };
      }
      var ConsumptionMethod;
      (function(ConsumptionMethod2) {
        ConsumptionMethod2["EmbedCustomers"] = "Embed for Customers";
        ConsumptionMethod2["EmbedOrganization"] = "Embed for Organization";
        ConsumptionMethod2["Mobile"] = "Power BI Mobile App";
        ConsumptionMethod2["PublishToWeb"] = "Custom App (Publish to Web)";
        ConsumptionMethod2["SecureEmbed"] = "Custom App (Secure Embed)";
        ConsumptionMethod2["TeamsPersonalApp"] = "Power BI Teams Personal App";
        ConsumptionMethod2["TeamsTabApp"] = "Power BI Teams Tab App";
        ConsumptionMethod2["WebApp"] = "Power BI Web App";
        ConsumptionMethod2["FabricWebApp"] = "Fabric Web App";
        ConsumptionMethod2["DesktopReportView"] = "Power BI Desktop Report View";
        ConsumptionMethod2["Unknown"] = "Unknown";
        ConsumptionMethod2["OneDrive"] = "Power BI OneDrive";
      })(ConsumptionMethod || (ConsumptionMethod = {}));
      var SessionSource;
      (function(SessionSource2) {
        SessionSource2["Fabric"] = "Fabric";
        SessionSource2["PowerBI"] = "PowerBI";
      })(SessionSource || (SessionSource = {}));
      var EmbedType;
      (function(EmbedType2) {
        EmbedType2["AnonymousLiveEmbed"] = "AnonymousLiveEmbed";
        EmbedType2["EmbedToken"] = "EmbedToken";
        EmbedType2["SaaSEmbed"] = "SaaSEmbed";
        EmbedType2["SecurePublishToWebEmbed"] = "SecurePublishToWebEmbed";
        EmbedType2["UnknownEmbed"] = "UnknownEmbed";
      })(EmbedType || (EmbedType = {}));
      var Level;
      (function(Level2) {
        Level2["Informational"] = "Informational";
        Level2["Warning"] = "Warning";
        Level2["Error"] = "Error";
        Level2["Critical"] = "Critical";
      })(Level || (Level = {}));
      var LogAnalyticsCategory;
      (function(LogAnalyticsCategory2) {
        LogAnalyticsCategory2["ReportUserAction"] = "Report User Action";
      })(LogAnalyticsCategory || (LogAnalyticsCategory = {}));
      var Status;
      (function(Status2) {
        Status2["Started"] = "Started";
        Status2["Succeeded"] = "Succeeded";
        Status2["Failed"] = "Failed";
        Status2["Cancelled"] = "Cancelled";
        Status2["Pending"] = "Pending";
        Status2["SucceededWithErrors"] = "SucceededWithErrors";
        Status2["FailedWithRemote"] = "FailedWithRemote";
        Status2["Interrupted"] = "Interrupted";
      })(Status || (Status = {}));
      var Scenario;
      (function(Scenario2) {
        Scenario2["MetricAssignmentStatusUpdateNotification"] = "MetricAssignmentStatusUpdateNotification";
        Scenario2["MissedActivityNotification"] = "MissedActivityNotification";
        Scenario2["RequestAccessNotification"] = "RequestAccessNotification";
      })(Scenario || (Scenario = {}));
      var ItemKind;
      (function(ItemKind2) {
        ItemKind2["InteractiveReport"] = "InteractiveReport";
      })(ItemKind || (ItemKind = {}));
      var DatasetLocation;
      (function(DatasetLocation2) {
        DatasetLocation2["OnPrem"] = "OnPrem";
        DatasetLocation2["AzureAnalysisServices"] = "AzureAnalysisServices";
        DatasetLocation2["Shared"] = "Shared";
        DatasetLocation2["Premium"] = "Premium";
        DatasetLocation2["Unknown"] = "Unknown";
      })(DatasetLocation || (DatasetLocation = {}));
      var DatasetMode;
      (function(DatasetMode2) {
        DatasetMode2["Import"] = "Import";
        DatasetMode2["DirectQuery"] = "DirectQuery";
        DatasetMode2["Composite"] = "Composite";
      })(DatasetMode || (DatasetMode = {}));
      var DataConnectivityFlag;
      (function(DataConnectivityFlag2) {
        DataConnectivityFlag2[DataConnectivityFlag2["None"] = 0] = "None";
        DataConnectivityFlag2[DataConnectivityFlag2["Import"] = 1] = "Import";
        DataConnectivityFlag2[DataConnectivityFlag2["DirectQuery"] = 2] = "DirectQuery";
        DataConnectivityFlag2[DataConnectivityFlag2["DirectLake"] = 4] = "DirectLake";
      })(DataConnectivityFlag || (DataConnectivityFlag = {}));
      var DistributionMethod;
      (function(DistributionMethod2) {
        DistributionMethod2["App"] = "App";
        DistributionMethod2["Workspace"] = "Workspace";
        DistributionMethod2["Shared"] = "Shared";
        DistributionMethod2["Desktop"] = "Desktop";
      })(DistributionMethod || (DistributionMethod = {}));
      var OpenReportInitializationFlags;
      (function(OpenReportInitializationFlags2) {
        OpenReportInitializationFlags2[OpenReportInitializationFlags2["PersistentState"] = 1] = "PersistentState";
        OpenReportInitializationFlags2[OpenReportInitializationFlags2["Bookmark"] = 2] = "Bookmark";
        OpenReportInitializationFlags2[OpenReportInitializationFlags2["DrillthroughFilters"] = 4] = "DrillthroughFilters";
        OpenReportInitializationFlags2[OpenReportInitializationFlags2["CustomVisuals"] = 8] = "CustomVisuals";
      })(OpenReportInitializationFlags || (OpenReportInitializationFlags = {}));
      var PackageTypeName;
      (function(PackageTypeName2) {
        PackageTypeName2["Undefined"] = "Undefined";
        PackageTypeName2["AppTemplate"] = "AppTemplate";
        PackageTypeName2["AppInstance"] = "AppInstance";
        PackageTypeName2["AppCopy"] = "AppCopy";
        PackageTypeName2["UsageMetricsV2"] = "UsageMetricsV2";
        PackageTypeName2["AdminUsageMetrics"] = "AdminUsageMetrics";
        PackageTypeName2["AdminPerformanceMetrics"] = "AdminPerformanceMetrics";
        PackageTypeName2["Sample"] = "Sample";
        PackageTypeName2["Scorecard"] = "Scorecard";
        PackageTypeName2["TeamsAnalytics"] = "TeamsAnalytics";
        PackageTypeName2["Datamart"] = "Datamart";
        PackageTypeName2["AdminMonitoring"] = "AdminMonitoring";
        PackageTypeName2["AuditLogSearchDataflow"] = "AuditLogSearchDataflow";
        PackageTypeName2["AdminInsightsUsageMetrics"] = "AdminInsightsUsageMetrics";
        PackageTypeName2["AdminInsights"] = "AdminInsights";
        PackageTypeName2["SeeThruModel"] = "SeeThruModel";
      })(PackageTypeName || (PackageTypeName = {}));
      var ReportMode;
      (function(ReportMode2) {
        ReportMode2["View"] = "View";
        ReportMode2["Edit"] = "Edit";
        ReportMode2["Create"] = "Create";
        ReportMode2["QuickCreate"] = "Quick Create";
      })(ReportMode || (ReportMode = {}));
      var VisualContainerLifecycleFlags;
      (function(VisualContainerLifecycleFlags2) {
        VisualContainerLifecycleFlags2[VisualContainerLifecycleFlags2["hasPreviewData"] = 1] = "hasPreviewData";
        VisualContainerLifecycleFlags2[VisualContainerLifecycleFlags2["hasQueryResult"] = 2] = "hasQueryResult";
        VisualContainerLifecycleFlags2[VisualContainerLifecycleFlags2["hasEmptyQueryResult"] = 4] = "hasEmptyQueryResult";
        VisualContainerLifecycleFlags2[VisualContainerLifecycleFlags2["hasQueryError"] = 8] = "hasQueryError";
        VisualContainerLifecycleFlags2[VisualContainerLifecycleFlags2["updatedNonQueryVisual"] = 16] = "updatedNonQueryVisual";
        VisualContainerLifecycleFlags2[VisualContainerLifecycleFlags2["gotNextDataSegment"] = 32] = "gotNextDataSegment";
        VisualContainerLifecycleFlags2[VisualContainerLifecycleFlags2["loadedMoreData"] = 64] = "loadedMoreData";
        VisualContainerLifecycleFlags2[VisualContainerLifecycleFlags2["loadedWindow"] = 128] = "loadedWindow";
        VisualContainerLifecycleFlags2[VisualContainerLifecycleFlags2["reloadedDataSegment"] = 256] = "reloadedDataSegment";
        VisualContainerLifecycleFlags2[VisualContainerLifecycleFlags2["appliedUpdate"] = 512] = "appliedUpdate";
        VisualContainerLifecycleFlags2[VisualContainerLifecycleFlags2["tookQueryHandlerFromPrimer"] = 1024] = "tookQueryHandlerFromPrimer";
        VisualContainerLifecycleFlags2[VisualContainerLifecycleFlags2["visualizedDataViewSource"] = 2048] = "visualizedDataViewSource";
      })(VisualContainerLifecycleFlags || (VisualContainerLifecycleFlags = {}));
      var EventName;
      (function(EventName2) {
        EventName2["WorkloadLoad"] = "WorkloadLoad";
        EventName2["ApplicationLoad"] = "ApplicationLoad";
        EventName2["ScriptLoad"] = "ScriptLoad";
        EventName2["DevTrace"] = "DevTrace";
        EventName2["DiagnosticTrace"] = "DiagnosticTrace";
      })(EventName || (EventName = {}));
      var FabricFeatures;
      (function(FabricFeatures2) {
        FabricFeatures2["WorkloadApiUsage"] = "Fabric.WorkloadApiUsage";
        FabricFeatures2["HomePage"] = "Home";
        FabricFeatures2["LandingPage"] = "Landing";
        FabricFeatures2["CreateHub"] = "Create hub";
        FabricFeatures2["CreateWorkspace"] = "Create workspace";
        FabricFeatures2["WorkspaceSettings"] = "Fabric Workspace Settings";
        FabricFeatures2["WorkspaceSettingsAuditEvents"] = "Workspace Settings Audit Events";
        FabricFeatures2["WorkspaceMonitoring"] = "Workspace monitoring";
        FabricFeatures2["CapacitySettings"] = "Capacity settings";
        FabricFeatures2["ItemSettings"] = "Item settings";
        FabricFeatures2["ProductSwitcher"] = "Product switcher";
        FabricFeatures2["Browse"] = "Browse";
        FabricFeatures2["Embed"] = "Embed";
        FabricFeatures2["Workspace"] = "Workspace";
        FabricFeatures2["GlobalSearch"] = "Global search";
        FabricFeatures2["ManageAccessOfWorkspace"] = "Manage access of workspace";
        FabricFeatures2["Header"] = "Header";
        FabricFeatures2["HeaderFlyout"] = "Header flyout";
        FabricFeatures2["Feedback"] = "Feedback";
        FabricFeatures2["DataflowsGen2"] = "Dataflows Gen2";
        FabricFeatures2["DelegatedSettings"] = "Delegated Settings";
        FabricFeatures2["Domains"] = "Domains";
        FabricFeatures2["DomainsConsumption"] = "Domains Consumption";
        FabricFeatures2["DomainsDirectMAU"] = "Domains Direct MAU";
        FabricFeatures2["DomainsManagedMAU"] = "Domains Managed MAU";
        FabricFeatures2["DomainsSettings"] = "Domains Settings";
        FabricFeatures2["DomainsWSManagement"] = "Domains WS Management";
        FabricFeatures2["ItemWithDomainViewed"] = "Item with Domain Viewed";
        FabricFeatures2["InformationProtection"] = "Information protection";
        FabricFeatures2["InformationProtectionSetLabel"] = "Information Protection - Set Label";
        FabricFeatures2["InformationProtectionDeleteLabel"] = "Information Protection - Delete Label";
        FabricFeatures2["Shortcuts"] = "Shortcuts";
        FabricFeatures2["OneSecurity"] = "One security";
        FabricFeatures2["MonitoringHub"] = "Monitoring hub";
        FabricFeatures2["MonitoringHubAlerts"] = "Monitoring hub alerts";
        FabricFeatures2["WorkloadHub"] = "Workload hub";
        FabricFeatures2["HelpPane"] = "Help pane";
        FabricFeatures2["TutorialPane"] = "Tutorial pane";
        FabricFeatures2["PurviewHub"] = "Purview Hub";
        FabricFeatures2["NotificationUX"] = "Notification UX";
        FabricFeatures2["NotificationCenter"] = "Notification center";
        FabricFeatures2["NotificationMessageBar"] = "Notification message bar";
        FabricFeatures2["Workload"] = "Workload";
        FabricFeatures2["ItemSharing"] = "Item sharing";
        FabricFeatures2["ItemPermissionManagement"] = "Item permission management";
        FabricFeatures2["Trial"] = "Trial";
        FabricFeatures2["DeploymentPipelines"] = "DeploymentPipelines";
        FabricFeatures2["QuickCreate"] = "Quick create";
        FabricFeatures2["UserSettings"] = "User settings";
        FabricFeatures2["LeftNav"] = "Left nav";
        FabricFeatures2["ItemDefinition"] = "Item definition";
        FabricFeatures2["Subfolder"] = "Subfolder";
        FabricFeatures2["Taskflow"] = "Taskflow";
        FabricFeatures2["TaskFlowOnboarding"] = "Task flow onboarding";
        FabricFeatures2["TaskFlowService"] = "Task flow service";
        FabricFeatures2["DataSharing"] = "Data Sharing";
        FabricFeatures2["GitIntegration"] = "Git Integration";
        FabricFeatures2["CreateItemPanel"] = "Create Item Panel";
        FabricFeatures2["FabricItemCRUD"] = "Fabric Item CRUD";
        FabricFeatures2["ObjectExplorer"] = "Object Explorer";
        FabricFeatures2["Multitasking"] = "Multitasking";
        FabricFeatures2["Import"] = "Import";
        FabricFeatures2["ItemSchedule"] = "Item schedule";
        FabricFeatures2["BusinessTags"] = "Business Tags";
        FabricFeatures2["BusinessTagsDirectUsage"] = "Business Tags Direct Usage";
        FabricFeatures2["BusinessTagsManagedUsage"] = "Business Tags Managed Usage";
        FabricFeatures2["BusinessTagsConsumption"] = "Business Tags Consumption";
        FabricFeatures2["BusinessTagsWorkspaceLoad"] = "Business Tags Workspace Load";
        FabricFeatures2["BusinessTagsItemLoad"] = "Business Tags Item Load";
        FabricFeatures2["BusinessTagsFilterUsage"] = "Business Tags Filter Usage";
        FabricFeatures2["BusinessTagsIconHover"] = "Business Tags Icon Hover";
        FabricFeatures2["DefaultSensitivityLabel"] = "Default Sensitivity Label";
        FabricFeatures2["UnsupportedBrowserNotification"] = "Unsupported Browser Notification";
        FabricFeatures2["StandardItemCreation"] = "Standard Item Creation";
        FabricFeatures2["SemanticModelRefreshDetailsPage"] = "semantic_model_refresh_details_page";
        FabricFeatures2["CreateShortcutEnableCacheEvent"] = "CreateShortcutEnableCacheEvent";
        FabricFeatures2["InPlaceSemanticModelSharing"] = "InPlace Semantic Model Sharing";
        FabricFeatures2["GovernanceHub"] = "Governance Hub";
        FabricFeatures2["GovernanceHubGetStatus"] = "Governance Hub Get Status";
        FabricFeatures2["GovernanceHubGetInsightsAndActions"] = "Governance Hub Get Insights And Actions";
        FabricFeatures2["GovernanceHubRefreshData"] = "Governance Hub Refresh Data";
        FabricFeatures2["GovHubGetActionsWSR"] = "Get Recommended Actions";
        FabricFeatures2["GovHubGetInsightsWSR"] = "Get Insights";
        FabricFeatures2["GovHubEnsureModelWSR"] = "Ensure Model Installation";
        FabricFeatures2["GovernBaseUsage"] = "Govern Base Usage";
        FabricFeatures2["GovernanceHubViewMoreInsightsClicked"] = "Governance Hub View More Insights Clicked";
        FabricFeatures2["GovernanceHubViewMoreNavigationBack"] = "Governance Hub View More Navigation Back";
        FabricFeatures2["GovernanceHubRefreshClicked"] = "Governance Hub Refresh Clicked";
        FabricFeatures2["GovernanceHubActionClicked"] = "Governance Hub Action Clicked";
        FabricFeatures2["GovernanceHubActionInteraction"] = "Governance Hub Action Interaction";
        FabricFeatures2["GovernanceHubSolutionInteraction"] = "Governance Hub Solution Interaction";
        FabricFeatures2["GovernanceHubEducationInteraction"] = "Governance Hub Education Interaction";
        FabricFeatures2["GovernanceHubPageLoad"] = "Governance Hub Page Load";
        FabricFeatures2["GovernanceHubLandingPageLoad"] = "Governance Hub Landing Page Load";
        FabricFeatures2["GovernanceHubTourDialogInteraction"] = "Governance Hub Tour Dialog Interaction";
        FabricFeatures2["GovernanceHubTourPopupCancel"] = "Governance Hub Tour Popup Cancel";
        FabricFeatures2["GovernanceHubEmbeddedInsightReport"] = "Governance Hub Embedded Insight Report";
        FabricFeatures2["GovernanceShell"] = "Governance Shell";
        FabricFeatures2["RealmSwitcher"] = "Realm Switcher";
        FabricFeatures2["OlcExploreTour"] = "OneLake catalog Explore Tour";
        FabricFeatures2["OcvSurvey"] = "OCV Survey";
        FabricFeatures2["ServiceHealth"] = "Service Health";
        FabricFeatures2["KnownIssues"] = "Known Issues";
        FabricFeatures2["WorkspaceRecycleBin"] = "Workspace Recycle Bin";
      })(FabricFeatures || (FabricFeatures = {}));
      var OriginatingService;
      (function(OriginatingService2) {
        OriginatingService2["DataIntegration"] = "DataIntegration";
        OriginatingService2["FabricWorkloadClientSdk"] = "FabricWorkloadClientSDK";
        OriginatingService2["FabricUX"] = "DataCloudUX";
        OriginatingService2["OneLakeUX"] = "One-lake";
      })(OriginatingService || (OriginatingService = {}));
      function populateWorkloadLoadPerformanceTelemetry(workloadIframePerformance) {
        const { clientVersion, workloadName, iframeId, workloadBootstrapStartTimestamp, workloadBootstrapEndTimestamp } = workloadIframePerformance;
        const navigator = window.navigator;
        const navigatorConnection = window.navigator?.connection;
        const performanceNavigationTiming = window.performance.getEntriesByType("navigation")[0];
        const { connectEnd, connectStart, decodedBodySize, domContentLoadedEventEnd, domContentLoadedEventStart, domInteractive, domainLookupEnd, domainLookupStart, duration, encodedBodySize, entryType, fetchStart, loadEventEnd, nextHopProtocol, redirectCount, redirectEnd, redirectStart, requestStart, responseStart, responseEnd, secureConnectionStart, transferSize, unloadEventEnd, unloadEventStart } = performanceNavigationTiming;
        const browser = bowser__namespace?.getParser ? bowser__namespace.getParser(navigator.userAgent) : void 0;
        const windowPerformanceTimeOrigin = window.performance.timeOrigin;
        return {
          ...buildBaseEvent(clientVersion),
          workloadName,
          eventName: "WorkloadLoad",
          iframeId,
          // cdnEnabled: !!(window as any).useCDN, // Update this with global setting if this doesn't depend on workload specific setting
          compressionSavings: transferSize && decodedBodySize ? Math.round((1 - transferSize / decodedBodySize) * 100) : -1,
          decodedBodySize: decodedBodySize ?? -1,
          deviceMemory: navigator.deviceMemory || 0,
          dnsLookupDuration: Math.ceil(domainLookupEnd - domainLookupStart),
          dnsPersistentConnectionOrCached: fetchStart === domainLookupStart && fetchStart === domainLookupEnd,
          documentLoadDuration: Math.ceil(windowPerformanceTimeOrigin + loadEventEnd - windowPerformanceTimeOrigin + fetchStart),
          documentLoadEndTimestamp: new Date(Math.ceil(windowPerformanceTimeOrigin + loadEventEnd)).toISOString(),
          documentLoadStartTimestamp: new Date(Math.ceil(windowPerformanceTimeOrigin + fetchStart)).toISOString(),
          domContentLoadedDuration: Math.ceil(windowPerformanceTimeOrigin + domContentLoadedEventEnd - windowPerformanceTimeOrigin + domContentLoadedEventStart),
          effectiveBandwidth: navigatorConnection?.downlink,
          effectiveConnectionType: navigatorConnection?.effectiveType,
          effectiveRoundTripTime: navigatorConnection?.rtt,
          encodedBodySize: encodedBodySize ?? -1,
          hardwareConcurrency: navigator.hardwareConcurrency,
          isHttp2: nextHopProtocol === "http/2",
          workloadBootstrapLoadDuration: Math.ceil(workloadBootstrapEndTimestamp - workloadBootstrapStartTimestamp),
          workloadBootstrapLoadEndTimestamp: new Date(Math.ceil(windowPerformanceTimeOrigin + workloadBootstrapEndTimestamp)).toISOString(),
          workloadBootstrapLoadStartTimestamp: new Date(Math.ceil(windowPerformanceTimeOrigin + workloadBootstrapStartTimestamp)).toISOString(),
          navigationType: entryType,
          redirectCount,
          redirectDocumentDuration: Math.ceil(windowPerformanceTimeOrigin + redirectEnd - (windowPerformanceTimeOrigin + redirectStart)),
          requestDuration: Math.ceil(windowPerformanceTimeOrigin + responseStart - (windowPerformanceTimeOrigin + requestStart)),
          responseDuration: Math.ceil(windowPerformanceTimeOrigin + responseEnd - (windowPerformanceTimeOrigin + responseStart)),
          screenHeight: window.screen.height,
          screenWidth: window.screen.width,
          sslNegotiationDuration: Math.ceil(windowPerformanceTimeOrigin + requestStart - (windowPerformanceTimeOrigin + secureConnectionStart)),
          tcpConnectionSetupDuration: Math.ceil(windowPerformanceTimeOrigin + connectEnd - (windowPerformanceTimeOrigin + connectStart)),
          timeToFirstByte: Math.ceil(windowPerformanceTimeOrigin + responseStart - (windowPerformanceTimeOrigin + fetchStart)),
          timeToLastByte: Math.ceil(windowPerformanceTimeOrigin + responseEnd - (windowPerformanceTimeOrigin + fetchStart)),
          timeToInteractiveDom: domInteractive,
          transferSize: transferSize ?? -1,
          unloadDocumentDuration: Math.ceil(unloadEventEnd - unloadEventStart),
          visualViewportHeight: window.outerHeight,
          visualViewportWidth: window.outerWidth
        };
        function buildBaseEvent(clientVersion2) {
          return {
            browserName: browser?.getBrowserName() ?? "",
            browserVersion: browser?.getBrowserVersion() ?? "",
            operatingSystemName: browser?.getOSName() ?? "",
            operatingSystemVersion: browser?.getOSVersion() ?? "",
            userAgent: window.navigator.userAgent,
            durationMs: Math.ceil(duration),
            eventId: uuid__namespace.v4(),
            level: Level.Informational,
            logAnalyticsCategory: LogAnalyticsCategory.ReportUserAction,
            pageHidden: !!window.document.hidden,
            sessionSource: SessionSource.Fabric,
            status: Status.Succeeded,
            timeGenerated: new Date(Math.ceil(windowPerformanceTimeOrigin + fetchStart)).toISOString(),
            clientVersion: clientVersion2,
            consumptionMethod: ConsumptionMethod.FabricWebApp,
            online: true,
            operationEndTime: new Date(Math.floor(windowPerformanceTimeOrigin + loadEventEnd)).toISOString(),
            operationStartTime: new Date(Math.floor(windowPerformanceTimeOrigin + fetchStart)).toISOString(),
            operationName: "WorkloadLoad",
            operationVersion: "1.0.0"
          };
        }
      }
      const maxResoureceTimingsNum = 20;
      function getWorkloadPerformance(workloadIframePerformance) {
        const { workloadBootstrapStart, workloadBootstrapEnd } = workloadIframePerformance;
        const navigator = window.navigator;
        const navigatorConnection = navigator?.connection;
        const performanceNavigationTiming = window.performance.getEntriesByType("navigation")[0];
        const { connectEnd, connectStart, decodedBodySize, domContentLoadedEventEnd, domContentLoadedEventStart, domInteractive, domainLookupEnd, domainLookupStart, encodedBodySize, entryType, fetchStart, loadEventStart, loadEventEnd, nextHopProtocol, redirectCount, redirectEnd, redirectStart, requestStart, responseStart, responseEnd, secureConnectionStart, transferSize, unloadEventEnd, unloadEventStart } = performanceNavigationTiming;
        const performanceResourceTimings = window.performance.getEntriesByType("resource");
        const workloadResourceTimings = performanceResourceTimings.map((performanceResourceTiming) => {
          return {
            fetchStart: String(Math.round(performanceResourceTiming.fetchStart)),
            initiatorType: performanceResourceTiming.initiatorType,
            name: performanceResourceTiming.name,
            requestStart: String(Math.round(performanceResourceTiming.requestStart)),
            responseStart: String(Math.round(performanceResourceTiming.responseStart)),
            responseEnd: String(Math.round(performanceResourceTiming.responseEnd)),
            transferSize: String(Math.round(performanceResourceTiming.transferSize ?? -1))
          };
        });
        const workloadResourceTimingsNum = workloadResourceTimings.length;
        if (workloadResourceTimings.length > maxResoureceTimingsNum) {
          workloadResourceTimings.sort((resourceTiming1, resourceTiming2) => {
            return Number(resourceTiming2.responseEnd) - Number(resourceTiming2.requestStart) - (Number(resourceTiming1.responseEnd) - Number(resourceTiming1.requestStart));
          });
          workloadResourceTimings.splice(maxResoureceTimingsNum);
        }
        const windowPerformanceTimeOrigin = window.performance.timeOrigin;
        const browser = bowser__namespace?.getParser ? bowser__namespace.getParser(navigator.userAgent) : void 0;
        return {
          connectEnd: String(Math.round(connectEnd)),
          connectStart: String(Math.round(connectStart)),
          decodedBodySize: String(decodedBodySize ?? -1),
          domContentLoadedEventEnd: String(Math.round(domContentLoadedEventEnd)),
          domContentLoadedEventStart: String(Math.round(domContentLoadedEventStart)),
          domInteractive: String(Math.round(domInteractive)),
          domainLookupEnd: String(Math.round(domainLookupEnd)),
          domainLookupStart: String(Math.round(domainLookupStart)),
          encodedBodySize: String(encodedBodySize ?? -1),
          entryType,
          fetchStart: String(Math.round(fetchStart)),
          loadEventStart: String(Math.round(loadEventStart)),
          loadEventEnd: String(Math.round(loadEventEnd)),
          nextHopProtocol,
          redirectCount: String(redirectCount),
          redirectEnd: String(Math.round(redirectEnd)),
          redirectStart: String(Math.round(redirectStart)),
          requestStart: String(Math.round(requestStart)),
          responseStart: String(Math.round(responseStart)),
          responseEnd: String(Math.round(responseEnd)),
          secureConnectionStart: String(Math.round(secureConnectionStart)),
          transferSize: String(transferSize ?? -1),
          unloadEventEnd: String(Math.round(unloadEventEnd)),
          unloadEventStart: String(Math.round(unloadEventStart)),
          timeOrigin: String(Math.round(windowPerformanceTimeOrigin)),
          deviceMemory: String(navigator.deviceMemory || 0),
          downlink: String(navigatorConnection?.downlink),
          effectiveType: String(navigatorConnection?.effectiveType),
          hardwareConcurrency: String(navigator.hardwareConcurrency),
          rtt: String(navigatorConnection?.rtt),
          userAgent: navigator.userAgent,
          browserName: browser?.getBrowserName() ?? "",
          browserVersion: browser?.getBrowserVersion() ?? "",
          operatingSystemName: browser?.getOSName() ?? "",
          operatingSystemVersion: browser?.getOSVersion() ?? "",
          workloadBootstrapEnd: String(Math.round(workloadBootstrapEnd)),
          workloadBootstrapStart: String(Math.round(workloadBootstrapStart)),
          performanceResourceTimings: JSON.stringify(workloadResourceTimings),
          performanceResourceTimingsNum: String(workloadResourceTimingsNum)
        };
      }
      async function bootstrap2(config) {
        const { iframeType, environmentName, iframeId, workloadName, bootstrapPath, cdnFallbackTime, parallelLoadingEnabled, errorHandlingEnabled, syncINPEnabled, syncPerfSnapshotEnabled } = WorkloadMetaLoader.Load();
        const client = new WorkloadClient$1({
          workloadHostWindow: config.workloadHostWindow ?? DefaultWorkloadClientConfig.workloadHostWindow
        });
        try {
          flushEventAndInit(client);
          window.postCdnLazyLoadFailureEvent = client._cdn.postCdnLazyLoadFailureEvent.bind(client._telemetry);
          if (errorHandlingEnabled) {
            if (window.detectWorkloadLoadTimeoutID) {
              clearTimeout(window.detectWorkloadLoadTimeoutID);
              window.detectWorkloadLoadTimeoutID = null;
            }
            if (window.onWorkloadLoadError) {
              window.removeEventListener("error", window.onWorkloadLoadError, true);
            }
          }
          const params = {
            environmentName,
            bootstrapPath: bootstrapPath ? bootstrapPath.startsWith("/") ? bootstrapPath : `/${bootstrapPath}` : null
          };
          window.performance.mark("FabricWorkloadBootstrapLoadStartTimestamp");
          client._telemetry.logEvent({
            name: exports2.WorkloadLoadEventType.WorkloadBootstrapStart,
            properties: {
              workloadName,
              iframeType,
              iframeId
            }
          });
          window.reportPackageMetadata = (meta) => {
            if (!window.packageMetadata)
              window.packageMetadata = {};
            window.packageMetadata[meta.packageName] = meta;
            client._telemetry.reportPackageMetadata({
              originIframeId: iframeId,
              iframeType,
              workloadName,
              packageMetadata: window.packageMetadata
            });
          };
          window.reportPackageMetadata({
            packageName: PACKAGE_NAME$3,
            version: CLIENT_VERSION$3,
            publishDate: PUBLISH_DATE$3
          });
          const workIFrameState = await client._worker.workIFrameState;
          if (iframeType === "worker") {
            await config.initializeWorker(params);
            if (parallelLoadingEnabled) {
              workIFrameState["initState"] = "succeeded";
              if (workIFrameState["callbacks"]) {
                Object.values(workIFrameState["callbacks"]).map((iframeCallback) => {
                  if (typeof iframeCallback === "function") {
                    iframeCallback();
                  }
                });
              }
            }
          } else {
            if (!parallelLoadingEnabled || workIFrameState["initState"] === "succeeded") {
              await config.initializeUI(params);
            } else {
              await new Promise((resolve) => {
                if (!workIFrameState["callbacks"]) {
                  workIFrameState["callbacks"] = {};
                }
                workIFrameState["callbacks"][iframeType] = (async () => {
                  await config.initializeUI(params);
                  resolve();
                });
              });
            }
            client._interaction.onResetFocus((config2) => {
              const allTabbable = document.body.querySelectorAll('input, select, textarea, button, [href], [tabindex]:not([tabindex="-1"])');
              if (allTabbable.length > 0) {
                if (config2.index === "first") {
                  allTabbable[0].focus();
                } else {
                  allTabbable[allTabbable.length - 1].focus();
                }
              }
            });
            if (iframeType === "page" || iframeType === "panel") {
              window.performance.mark("FabricWorkloadBootstrapLoadEndTimestamp");
              const workloadBootstrapStartTimeMarker2 = window.performance.getEntriesByName("FabricWorkloadBootstrapLoadStartTimestamp", "mark");
              const workloadBootstrapEndTimeMarker = window.performance.getEntriesByName("FabricWorkloadBootstrapLoadEndTimestamp", "mark");
              const workloadBootstrapStartTimestamp = workloadBootstrapStartTimeMarker2?.length > 0 ? workloadBootstrapStartTimeMarker2[0].startTime : 0;
              const workloadBootstrapEndTimestamp = workloadBootstrapEndTimeMarker?.length > 0 ? workloadBootstrapEndTimeMarker[0].startTime : 0;
              client._telemetry.logEvent({
                name: exports2.WorkloadLoadEventType.WorkloadBootstrap,
                properties: populateWorkloadLoadPerformanceTelemetry({
                  workloadBootstrapStartTimestamp,
                  workloadBootstrapEndTimestamp,
                  clientVersion: CLIENT_VERSION$3,
                  workloadName,
                  iframeId
                })
              });
              client._interaction.onQueryDomRect((config2) => {
                const { selector, setFocus } = config2;
                let target;
                if (selector) {
                  target = document.querySelector(selector);
                }
                if (!target || !selector) {
                  return Promise.resolve({ isSucceed: false });
                } else {
                  const rect = target.getBoundingClientRect();
                  if (setFocus) {
                    target.focus();
                  }
                  return Promise.resolve({
                    isSucceed: true,
                    rect
                  });
                }
              });
            }
            registerDocumentEventListeners(client);
          }
          client._errorHandling.registerUnhandledExceptionHandler({ iframe: iframeType });
          try {
            client._performanceItems.init();
          } catch (e2) {
            client._telemetry.logEvent({
              name: "PerformanceItemsClientInitFailed",
              properties: { errorName: e2?.name, errorMessage: e2?.message }
            });
          }
          try {
            if (iframeType === "page" && syncINPEnabled) {
              client._inp.init();
            }
          } catch (e2) {
            client._telemetry.logEvent({
              name: "Perf.INP.ClientInitFailed",
              properties: { workloadName, iframeId, iframeType, errorName: e2?.name, errorMessage: e2?.message }
            });
          }
          try {
            if ((iframeType === "worker" || iframeType === "page") && syncPerfSnapshotEnabled) {
              client._perfSnapshot.init(iframeType);
            }
          } catch (e2) {
            client._telemetry.logEvent({
              name: "Perf.Snapshot.ClientInitFailed",
              properties: { workloadName, iframeId, iframeType, errorName: e2?.name, errorMessage: e2?.message }
            });
          }
          const workloadBootstrapStartTimeMarker = window.performance.getEntriesByName("FabricWorkloadBootstrapLoadStartTimestamp", "mark");
          const workloadBootstrapStart = workloadBootstrapStartTimeMarker?.length > 0 ? workloadBootstrapStartTimeMarker[0].startTime : 0;
          const workloadBootstrapEnd = Date.now() - window.performance.timeOrigin;
          client._telemetry.postLifecycleEvent({
            name: exports2.LifecycleEventType.InitSucceeded,
            properties: {
              clientVersion: CLIENT_VERSION$3,
              iframeType,
              iframeId,
              workloadName,
              isCDNFallback: cdnFallbackTime != null,
              ...getWorkloadPerformance({ workloadBootstrapStart, workloadBootstrapEnd })
            }
          });
        } catch (error) {
          let errMessage = "";
          let errStack = "";
          if (error instanceof Error) {
            errMessage = error.message || "";
            errStack = error.stack ? error.stack.slice(0, 256) : "";
          } else {
            errMessage = String(error);
          }
          client._telemetry.postLifecycleEvent({
            name: exports2.LifecycleEventType.InitFailed,
            properties: {
              errMessage,
              errStack,
              clientVersion: CLIENT_VERSION$3,
              isCDNFallback: cdnFallbackTime != null
            }
          });
        } finally {
          postCDNFallbackMessage(client, workloadName, cdnFallbackTime);
        }
      }
      function registerDocumentEventListeners(client) {
        document.addEventListener("click", (event) => {
          client._interaction.postDOMEvent({ eventType: event.type });
        });
        document.addEventListener("keydown", (event) => {
          client._interaction.postDOMEvent({
            eventType: event.type,
            eventProps: {
              key: event.key
            }
          });
        });
        document.addEventListener("keyup", (event) => {
          client._interaction.postDOMEvent({
            eventType: event.type,
            eventProps: {
              key: event.key
            }
          });
        });
      }
      function flushEventAndInit(client) {
        try {
          let cachedEvents = [];
          try {
            const cachedEventsJSON = sessionStorage.getItem("cachedEvents");
            if (cachedEventsJSON) {
              cachedEvents = JSON.parse(cachedEventsJSON);
            }
          } catch (exception) {
            client._telemetry.logEvent({
              name: "ParseCachedEventsFailed",
              properties: { error: String(exception) }
            });
          }
          for (const event of cachedEvents) {
            client._telemetry.logEvent(event);
          }
          try {
            sessionStorage.removeItem("cachedEvents");
          } catch (exception) {
            console.error(exception);
          }
          window.logEvent = client._telemetry.logEvent.bind(client._telemetry);
        } catch {
        }
      }
      function postCDNFallbackMessage(client, workloadName, cdnFallbackTime) {
        if (cdnFallbackTime) {
          client._cdn.postCdnFallbackEvent({
            workloadName,
            timestamp: cdnFallbackTime ?? Date.now().toString()
          });
        }
      }
      const THEME_ATTRIBUTE = "data-theme";
      const STYLE_ELEMENT_ID = "theme-styles";
      const defaultOptions = {
        enableThemeGlobally: true
      };
      class CssVariableThemeProvider {
        constructor() {
          this.styleElement = document.createElement("style");
          this.styleElement.id = STYLE_ELEMENT_ID;
          document.head.appendChild(this.styleElement);
        }
        provideTheme(theme, options = defaultOptions) {
          let styles = this.buildCSSVarList(theme.tokens);
          styles += this.buildCSSColorScheme(theme);
          const stylesheetContents = this.createStyleSheet(styles, theme.name);
          this.styleElement.textContent = stylesheetContents;
          if (options.enableThemeGlobally)
            this.enableThemeGlobally(theme.name);
        }
        enableThemeGlobally(themeName) {
          window.document.documentElement.setAttribute(THEME_ATTRIBUTE, themeName);
        }
        createStyleSheet(styles, themeName) {
          return `
[data-theme="${themeName}"] {
    ${styles}
}
`;
        }
        buildCSSVarList(tokens) {
          let styles = "";
          for (const [key, value] of Object.entries(tokens)) {
            styles += `--${key}: ${value};
`;
          }
          return styles;
        }
        buildCSSColorScheme(theme) {
          return `color-scheme: ${theme.colorScheme};
`;
        }
      }
      const PACKAGE_NAME$2 = "@fabric/workload-client-3p-common";
      const CLIENT_VERSION$2 = "0.0.65";
      const PUBLISH_DATE$2 = "2026-02-03T11:56:05.071Z";
      if (window.reportPackageMetadata) {
        window.reportPackageMetadata({
          packageName: PACKAGE_NAME$2,
          version: CLIENT_VERSION$2,
          publishDate: PUBLISH_DATE$2
        });
      } else {
        if (!window.packageMetadata)
          window.packageMetadata = {};
        window.packageMetadata[PACKAGE_NAME$2] = {
          packageName: PACKAGE_NAME$2,
          version: CLIENT_VERSION$2,
          publishDate: PUBLISH_DATE$2
        };
      }
      exports2.WorkloadMessageType = void 0;
      (function(WorkloadMessageType2) {
        WorkloadMessageType2["acquireAADToken"] = "acquireAADToken";
        WorkloadMessageType2["cancelItemJob"] = "cancelItemJob";
        WorkloadMessageType2["createItemScheduledJobs"] = "createItemScheduledJobs";
        WorkloadMessageType2["deleteItemScheduledJobs"] = "deleteItemScheduledJobs";
        WorkloadMessageType2["getItemJobHistory"] = "getItemJobHistory";
        WorkloadMessageType2["getItemScheduledJobs"] = "getItemScheduledJobs";
        WorkloadMessageType2["listItemSchedules"] = "listItemSchedules";
        WorkloadMessageType2["openBrowserTabAsync"] = "OpenBrowserTabAsync";
        WorkloadMessageType2["resolveEndpoint"] = "resolveEndpoint";
        WorkloadMessageType2["runItemJob"] = "runItemJob";
        WorkloadMessageType2["updateItemScheduledJobs"] = "updateItemScheduledJobs";
      })(exports2.WorkloadMessageType || (exports2.WorkloadMessageType = {}));
      const acquireAADToken = createAsyncWorkloadMessage(exports2.WorkloadMessageType.acquireAADToken);
      const cancelItemJob = createAsyncWorkloadMessage(exports2.WorkloadMessageType.cancelItemJob);
      const createItemScheduledJobs = createAsyncWorkloadMessage(exports2.WorkloadMessageType.createItemScheduledJobs);
      const deleteItemScheduledJobs = createAsyncWorkloadMessage(exports2.WorkloadMessageType.deleteItemScheduledJobs);
      const getItemJobHistory = createAsyncWorkloadMessage(exports2.WorkloadMessageType.getItemJobHistory);
      const getItemScheduledJobs = createAsyncWorkloadMessage(exports2.WorkloadMessageType.getItemScheduledJobs);
      const listItemSchedules = createAsyncWorkloadMessage(exports2.WorkloadMessageType.listItemSchedules);
      const openBrowserTabAsync = createAsyncWorkloadMessage(exports2.WorkloadMessageType.openBrowserTabAsync);
      const resolveEndpoint = createAsyncWorkloadMessage(exports2.WorkloadMessageType.resolveEndpoint);
      const runItemJob = createAsyncWorkloadMessage(exports2.WorkloadMessageType.runItemJob);
      const updateItemScheduledJobs = createAsyncWorkloadMessage(exports2.WorkloadMessageType.updateItemScheduledJobs);
      const Messages$1 = {
        ...Messages$2,
        acquireAADToken,
        cancelItemJob,
        createItemScheduledJobs,
        deleteItemScheduledJobs,
        getItemJobHistory,
        getItemScheduledJobs,
        listItemSchedules,
        openBrowserTabAsync,
        resolveEndpoint,
        runItemJob,
        updateItemScheduledJobs
      };
      class ItemScheduleClient {
        constructor(broker) {
          this.broker = broker;
        }
        getItemScheduledJobs(objectId) {
          return this.broker.sendAsync(Messages$1.getItemScheduledJobs.start({ objectId }));
        }
        listItemSchedules(listItemSchedulesParams) {
          return this.broker.sendAsync(Messages$1.listItemSchedules.start(listItemSchedulesParams));
        }
        createItemScheduledJobs(createItemScheduledJobs2) {
          return this.broker.sendAsync(Messages$1.createItemScheduledJobs.start(createItemScheduledJobs2));
        }
        updateItemScheduledJobs(updateItemScheduleParams) {
          return this.broker.sendAsync(Messages$1.updateItemScheduledJobs.start(updateItemScheduleParams));
        }
        deleteItemScheduledJobs(deleteItemScheduledJobs2) {
          return this.broker.sendAsync(Messages$1.deleteItemScheduledJobs.start(deleteItemScheduledJobs2));
        }
        runItemJob(jobParams) {
          return this.broker.sendAsync(Messages$1.runItemJob.start(jobParams));
        }
        cancelItemJob(jobParams) {
          return this.broker.sendAsync(Messages$1.cancelItemJob.start(jobParams));
        }
        getItemJobHistory(getHistoryParams) {
          return this.broker.sendAsync(Messages$1.getItemJobHistory.start(getHistoryParams));
        }
      }
      class EndpointClient {
        constructor(broker) {
          this.broker = broker;
        }
        resolveEndpoint(params) {
          return this.broker.sendAsync(Messages$1.resolveEndpoint.start(params));
        }
      }
      class NavigationClient {
        constructor(workloadClientCommon) {
          this.workloadClientCommon = workloadClientCommon;
        }
        navigate(target, route) {
          return this.workloadClientCommon.navigation.navigate(target, route);
        }
        onNavigate(callback) {
          return this.workloadClientCommon.navigation.onNavigate(callback);
        }
        onBeforeNavigateAway(callback) {
          return this.workloadClientCommon.navigation.onBeforeNavigateAway(callback);
        }
        onAfterNavigateAway(callback) {
          return this.workloadClientCommon.navigation.onAfterNavigateAway(callback);
        }
        openBrowserTab(params) {
          return this.workloadClientCommon.broker.sendAsync(Messages$1.openBrowserTabAsync.start(params));
        }
      }
      exports2.ProvisionStateEnum = void 0;
      (function(ProvisionStateEnum) {
        ProvisionStateEnum[ProvisionStateEnum["InProgress"] = 0] = "InProgress";
        ProvisionStateEnum[ProvisionStateEnum["Active"] = 1] = "Active";
        ProvisionStateEnum[ProvisionStateEnum["Migrating"] = 2] = "Migrating";
        ProvisionStateEnum[ProvisionStateEnum["Recovering"] = 3] = "Recovering";
        ProvisionStateEnum[ProvisionStateEnum["SoftDeletedByUser"] = 18] = "SoftDeletedByUser";
        ProvisionStateEnum[ProvisionStateEnum["SoftDeleted"] = 19] = "SoftDeleted";
        ProvisionStateEnum[ProvisionStateEnum["Failed"] = 20] = "Failed";
        ProvisionStateEnum[ProvisionStateEnum["Deleting"] = 21] = "Deleting";
        ProvisionStateEnum[ProvisionStateEnum["DisabledByDeprovisioning"] = 30] = "DisabledByDeprovisioning";
        ProvisionStateEnum[ProvisionStateEnum["DeprovisioningFailed"] = 31] = "DeprovisioningFailed";
        ProvisionStateEnum[ProvisionStateEnum["DeletedByDeprovision"] = 32] = "DeletedByDeprovision";
        ProvisionStateEnum[ProvisionStateEnum["DeletedByWorkload"] = 34] = "DeletedByWorkload";
      })(exports2.ProvisionStateEnum || (exports2.ProvisionStateEnum = {}));
      exports2.PayloadContentTypeEnum = void 0;
      (function(PayloadContentTypeEnum) {
        PayloadContentTypeEnum[PayloadContentTypeEnum["InlineJson"] = 0] = "InlineJson";
        PayloadContentTypeEnum[PayloadContentTypeEnum["InlinePlainText"] = 1] = "InlinePlainText";
        PayloadContentTypeEnum[PayloadContentTypeEnum["InlineXml"] = 2] = "InlineXml";
        PayloadContentTypeEnum[PayloadContentTypeEnum["InlineBase64"] = 3] = "InlineBase64";
      })(exports2.PayloadContentTypeEnum || (exports2.PayloadContentTypeEnum = {}));
      var RestrictionSources;
      (function(RestrictionSources2) {
        RestrictionSources2[RestrictionSources2["None"] = 0] = "None";
        RestrictionSources2[RestrictionSources2["DLP"] = 1] = "DLP";
        RestrictionSources2[RestrictionSources2["MIP"] = 2] = "MIP";
      })(RestrictionSources || (RestrictionSources = {}));
      exports2.ItemRelationSettings = void 0;
      (function(ItemRelationSettings) {
        ItemRelationSettings[ItemRelationSettings["Association"] = 0] = "Association";
        ItemRelationSettings[ItemRelationSettings["CascadeDelete"] = 1] = "CascadeDelete";
        ItemRelationSettings[ItemRelationSettings["WeakAssociation"] = 2] = "WeakAssociation";
        ItemRelationSettings[ItemRelationSettings["Datasource"] = 3] = "Datasource";
        ItemRelationSettings[ItemRelationSettings["PushData"] = 4] = "PushData";
        ItemRelationSettings[ItemRelationSettings["Orchestration"] = 5] = "Orchestration";
        ItemRelationSettings[ItemRelationSettings["Shortcut"] = 6] = "Shortcut";
        ItemRelationSettings[ItemRelationSettings["HiddenInWorkspace"] = 7] = "HiddenInWorkspace";
      })(exports2.ItemRelationSettings || (exports2.ItemRelationSettings = {}));
      exports2.TriggerType = void 0;
      (function(TriggerType) {
        TriggerType[TriggerType["Manual"] = 1] = "Manual";
        TriggerType[TriggerType["InheritanceUponCreation"] = 2] = "InheritanceUponCreation";
        TriggerType[TriggerType["Publish"] = 3] = "Publish";
        TriggerType[TriggerType["DownstreamInheritanceBySystem"] = 4] = "DownstreamInheritanceBySystem";
        TriggerType[TriggerType["DownstreamInheritanceByUser"] = 5] = "DownstreamInheritanceByUser";
        TriggerType[TriggerType["InheritanceFromDataSource"] = 6] = "InheritanceFromDataSource";
        TriggerType[TriggerType["Alm"] = 7] = "Alm";
        TriggerType[TriggerType["PublicApiPrivileged"] = 8] = "PublicApiPrivileged";
        TriggerType[TriggerType["PublicApiStandard"] = 9] = "PublicApiStandard";
        TriggerType[TriggerType["DefaultLabelPolicy"] = 10] = "DefaultLabelPolicy";
      })(exports2.TriggerType || (exports2.TriggerType = {}));
      var MRUItemType;
      (function(MRUItemType2) {
        MRUItemType2[MRUItemType2["Dashboards"] = 0] = "Dashboards";
        MRUItemType2[MRUItemType2["Reports"] = 1] = "Reports";
        MRUItemType2[MRUItemType2["Workbooks"] = 2] = "Workbooks";
        MRUItemType2[MRUItemType2["AppInstance"] = 3] = "AppInstance";
        MRUItemType2[MRUItemType2["RdlReports"] = 4] = "RdlReports";
        MRUItemType2[MRUItemType2["Workspaces"] = 5] = "Workspaces";
        MRUItemType2[MRUItemType2["Datasets"] = 6] = "Datasets";
        MRUItemType2[MRUItemType2["FabricItem"] = 7] = "FabricItem";
        MRUItemType2[MRUItemType2["Datamarts"] = 8] = "Datamarts";
      })(MRUItemType || (MRUItemType = {}));
      var ScheduleTypeWire;
      (function(ScheduleTypeWire2) {
        ScheduleTypeWire2[ScheduleTypeWire2["None"] = 0] = "None";
        ScheduleTypeWire2[ScheduleTypeWire2["Daily"] = 1] = "Daily";
        ScheduleTypeWire2[ScheduleTypeWire2["Cron"] = 2] = "Cron";
        ScheduleTypeWire2[ScheduleTypeWire2["Weekly"] = 3] = "Weekly";
        ScheduleTypeWire2[ScheduleTypeWire2["CronHours"] = 4] = "CronHours";
        ScheduleTypeWire2[ScheduleTypeWire2["Monthly"] = 5] = "Monthly";
        ScheduleTypeWire2[ScheduleTypeWire2["RelativeMonthly"] = 6] = "RelativeMonthly";
        ScheduleTypeWire2[ScheduleTypeWire2["TumblingWindow"] = 7] = "TumblingWindow";
      })(ScheduleTypeWire || (ScheduleTypeWire = {}));
      var ParameterType;
      (function(ParameterType2) {
        ParameterType2["VariableReference"] = "VariableReference";
        ParameterType2["Integer"] = "Integer";
        ParameterType2["Number"] = "Number";
        ParameterType2["String"] = "String";
        ParameterType2["Boolean"] = "Boolean";
        ParameterType2["DateTime"] = "DateTime";
        ParameterType2["Guid"] = "Guid";
        ParameterType2["Automatic"] = "Automatic";
      })(ParameterType || (ParameterType = {}));
      exports2.ItemJobStatus = void 0;
      (function(ItemJobStatus) {
        ItemJobStatus[ItemJobStatus["NotStarted"] = 0] = "NotStarted";
        ItemJobStatus[ItemJobStatus["InProgress"] = 1] = "InProgress";
        ItemJobStatus[ItemJobStatus["Completed"] = 2] = "Completed";
        ItemJobStatus[ItemJobStatus["Failed"] = 3] = "Failed";
        ItemJobStatus[ItemJobStatus["Cancelled"] = 4] = "Cancelled";
        ItemJobStatus[ItemJobStatus["NotFound"] = 5] = "NotFound";
        ItemJobStatus[ItemJobStatus["Duplicate"] = 6] = "Duplicate";
        ItemJobStatus[ItemJobStatus["OwnerUserMissing"] = 7] = "OwnerUserMissing";
        ItemJobStatus[ItemJobStatus["DeadLettered"] = 8] = "DeadLettered";
        ItemJobStatus[ItemJobStatus["Unknown"] = 9] = "Unknown";
      })(exports2.ItemJobStatus || (exports2.ItemJobStatus = {}));
      const PACKAGE_NAME$1 = "@fabric/data-access-item-common";
      const CLIENT_VERSION$1 = "1.2.70";
      const PUBLISH_DATE$1 = "2026-02-26T02:04:14.598Z";
      if (window.reportPackageMetadata) {
        window.reportPackageMetadata({
          packageName: PACKAGE_NAME$1,
          version: CLIENT_VERSION$1,
          publishDate: PUBLISH_DATE$1
        });
      } else {
        if (!window.packageMetadata)
          window.packageMetadata = {};
        window.packageMetadata[PACKAGE_NAME$1] = {
          packageName: PACKAGE_NAME$1,
          version: CLIENT_VERSION$1,
          publishDate: PUBLISH_DATE$1
        };
      }
      exports2.WorkloadAuthError = void 0;
      (function(WorkloadAuthError) {
        WorkloadAuthError[WorkloadAuthError["UnsupportedError"] = 0] = "UnsupportedError";
        WorkloadAuthError[WorkloadAuthError["UserInteractionFailedError"] = 1] = "UserInteractionFailedError";
        WorkloadAuthError[WorkloadAuthError["WorkloadConfigError"] = 2] = "WorkloadConfigError";
        WorkloadAuthError[WorkloadAuthError["UnknownError"] = 3] = "UnknownError";
        WorkloadAuthError[WorkloadAuthError["ScopesError"] = 4] = "ScopesError";
      })(exports2.WorkloadAuthError || (exports2.WorkloadAuthError = {}));
      exports2.WorkloadErrorSource = void 0;
      (function(WorkloadErrorSource) {
        WorkloadErrorSource[WorkloadErrorSource["System"] = 0] = "System";
        WorkloadErrorSource[WorkloadErrorSource["User"] = 1] = "User";
        WorkloadErrorSource[WorkloadErrorSource["External"] = 2] = "External";
      })(exports2.WorkloadErrorSource || (exports2.WorkloadErrorSource = {}));
      const PACKAGE_NAME = "@fabric/workload-client-3p-v2";
      const CLIENT_VERSION = "0.0.65";
      const PUBLISH_DATE = "2026-02-03T11:56:06.682Z";
      if (window.reportPackageMetadata) {
        window.reportPackageMetadata({
          packageName: PACKAGE_NAME,
          version: CLIENT_VERSION,
          publishDate: PUBLISH_DATE
        });
      } else {
        if (!window.packageMetadata)
          window.packageMetadata = {};
        window.packageMetadata[PACKAGE_NAME] = {
          packageName: PACKAGE_NAME,
          version: CLIENT_VERSION,
          publishDate: PUBLISH_DATE
        };
      }
      var WorkloadMessageType;
      (function(WorkloadMessageType2) {
        WorkloadMessageType2["acquireFrontendAADToken"] = "acquireFrontendAADToken";
        WorkloadMessageType2["getItemDefinition"] = "getItemDefinition";
        WorkloadMessageType2["getItemV2"] = "getItemV2";
        WorkloadMessageType2["updateItemDefinition"] = "updateItemDefinition";
        WorkloadMessageType2["openVariablePickerDialog"] = "openVariablePickerDialog";
        WorkloadMessageType2["resolveVariableReferences"] = "resolveVariableReferences";
      })(WorkloadMessageType || (WorkloadMessageType = {}));
      const acquireFrontendAADToken = createAsyncWorkloadMessage(WorkloadMessageType.acquireFrontendAADToken);
      const getItemDefinition = createAsyncWorkloadMessage(WorkloadMessageType.getItemDefinition);
      const getItemV2 = createAsyncWorkloadMessage(WorkloadMessageType.getItemV2);
      const updateItemDefinition2 = createAsyncWorkloadMessage(WorkloadMessageType.updateItemDefinition);
      const openVariablePickerDialog = createAsyncWorkloadMessage(WorkloadMessageType.openVariablePickerDialog);
      const resolveVariableReferences = createAsyncWorkloadMessage(WorkloadMessageType.resolveVariableReferences);
      const Messages = {
        ...Messages$1,
        acquireFrontendAADToken,
        getItemDefinition,
        getItemV2,
        updateItemDefinition: updateItemDefinition2,
        openVariablePickerDialog,
        resolveVariableReferences
      };
      class ItemCrudClient {
        constructor(broker) {
          this.broker = broker;
        }
        getItem(params) {
          return this.broker.sendAsync(Messages.getItemV2.start(params));
        }
        getItemDefinition(params) {
          return this.broker.sendAsync(Messages.getItemDefinition.start(params));
        }
        updateItemDefinition(params) {
          return this.broker.sendAsync(Messages.updateItemDefinition.start(params));
        }
      }
      class AuthClient {
        constructor(broker) {
          this.broker = broker;
        }
        acquireAccessToken(params) {
          return this.broker.sendAsync(Messages.acquireAADToken.start(params));
        }
        acquireFrontendAccessToken(params) {
          return this.broker.sendAsync(Messages.acquireFrontendAADToken.start(params));
        }
      }
      class VariableLibraryClient {
        constructor(broker) {
          this.broker = broker;
        }
        openVariablePickerDialog(config) {
          return this.broker.sendAsync(Messages.openVariablePickerDialog.start(config));
        }
        resolveVariableReferences(request) {
          return this.broker.sendAsync(Messages.resolveVariableReferences.start(request));
        }
      }
      class WorkloadClient {
        constructor(config = DefaultWorkloadClientConfig) {
          this.config = config;
          this.client = new WorkloadClient$1(this.config);
          this.action = this.client.action;
          this.itemCrud = new ItemCrudClient(this.broker);
          this.itemDefinitions = this.client.itemDefinitions;
          this.itemRecentRuns = this.client.itemRecentRuns;
          this.itemSchedule = new ItemScheduleClient(this.broker);
          this.itemSettings = this.client.itemSettings;
          this.auth = new AuthClient(this.broker);
          this.datahub = this.client.datahub;
          this.dialog = this.client.dialog;
          this.endpoint = new EndpointClient(this.broker);
          this.errorHandling = this.client.errorHandling;
          this.event = this.client.event;
          this.favorite = this.client.favorite;
          this.navigation = new NavigationClient(this.client);
          this.notification = this.client.notification;
          this.page = this.client.page;
          this.panel = this.client.panel;
          this.permission = this.client.permission;
          this.settings = this.client.settings;
          this.state = this.client.state;
          this.subfolder = this.client.subfolder;
          this.theme = this.client.theme;
          this.variableLibrary = new VariableLibraryClient(this.broker);
        }
        get broker() {
          return this.client.broker;
        }
      }
      function createWorkloadClient3(config = DefaultWorkloadClientConfig) {
        return new WorkloadClient(config);
      }
      exports2.PayloadType = void 0;
      (function(PayloadType2) {
        PayloadType2["InlineBase64"] = "InlineBase64";
      })(exports2.PayloadType || (exports2.PayloadType = {}));
      exports2.VariableReferenceResolutionStatus = void 0;
      (function(VariableReferenceResolutionStatus) {
        VariableReferenceResolutionStatus["NotInitialized"] = "NotInitialized";
        VariableReferenceResolutionStatus["VariableLibraryResolved"] = "VariableLibraryResolved";
        VariableReferenceResolutionStatus["Ok"] = "Ok";
        VariableReferenceResolutionStatus["InvalidReferenceFormat"] = "InvalidReferenceFormat";
        VariableReferenceResolutionStatus["VariableLibraryReferenceIsMissing"] = "VariableLibraryReferenceIsMissing";
        VariableReferenceResolutionStatus["VariableLibraryReferenceIsAmbiguous"] = "VariableLibraryReferenceIsAmbiguous";
        VariableReferenceResolutionStatus["InvalidReferenceInlineTypeNotAllowed"] = "InvalidReferenceInlineTypeNotAllowed";
        VariableReferenceResolutionStatus["VariableLibraryNotFound"] = "VariableLibraryNotFound";
        VariableReferenceResolutionStatus["VariableLibraryCorrupted"] = "VariableLibraryCorrupted";
        VariableReferenceResolutionStatus["ActiveValueSetNotFound"] = "ActiveValueSetNotFound";
        VariableReferenceResolutionStatus["InvalidVariableDefinition"] = "InvalidVariableDefinition";
        VariableReferenceResolutionStatus["InvalidVariableOverride"] = "InvalidVariableOverride";
        VariableReferenceResolutionStatus["VariableNotFound"] = "VariableNotFound";
        VariableReferenceResolutionStatus["TypeMismatch"] = "TypeMismatch";
      })(exports2.VariableReferenceResolutionStatus || (exports2.VariableReferenceResolutionStatus = {}));
      class t {
        t;
        o = 0;
        i = [];
        u(t2) {
          if (t2.hadRecentInput) return;
          const e2 = this.i[0], n2 = this.i.at(-1);
          this.o && e2 && n2 && t2.startTime - n2.startTime < 1e3 && t2.startTime - e2.startTime < 5e3 ? (this.o += t2.value, this.i.push(t2)) : (this.o = t2.value, this.i = [t2]), this.t?.(t2);
        }
      }
      const e = () => {
        const t2 = performance.getEntriesByType("navigation")[0];
        if (t2 && t2.responseStart > 0 && t2.responseStart < performance.now()) return t2;
      }, n = (t2) => {
        if ("loading" === document.readyState) return "loading";
        {
          const n2 = e();
          if (n2) {
            if (t2 < n2.domInteractive) return "loading";
            if (0 === n2.domContentLoadedEventStart || t2 < n2.domContentLoadedEventStart) return "dom-interactive";
            if (0 === n2.domComplete || t2 < n2.domComplete) return "dom-content-loaded";
          }
        }
        return "complete";
      }, o = (t2) => {
        const e2 = t2.nodeName;
        return 1 === t2.nodeType ? e2.toLowerCase() : e2.toUpperCase().replace(/^#/, "");
      }, i = (t2) => {
        let e2 = "";
        try {
          for (; 9 !== t2?.nodeType; ) {
            const n2 = t2, i2 = n2.id ? "#" + n2.id : [o(n2), ...Array.from(n2.classList).sort()].join(".");
            if (e2.length + i2.length > 99) return e2 || i2;
            if (e2 = e2 ? i2 + ">" + e2 : i2, n2.id) break;
            t2 = n2.parentNode;
          }
        } catch {
        }
        return e2;
      }, r = /* @__PURE__ */ new WeakMap();
      function s(t2, e2) {
        return r.get(t2) || r.set(t2, new e2()), r.get(t2);
      }
      let a = -1;
      const c = () => a, f2 = (t2) => {
        addEventListener("pageshow", ((e2) => {
          e2.persisted && (a = e2.timeStamp, t2(e2));
        }), true);
      }, u = (t2, e2, n2, o2) => {
        let i2, r2;
        return (s2) => {
          e2.value >= 0 && (s2 || o2) && (r2 = e2.value - (i2 ?? 0), (r2 || void 0 === i2) && (i2 = e2.value, e2.delta = r2, e2.rating = ((t3, e3) => t3 > e3[1] ? "poor" : t3 > e3[0] ? "needs-improvement" : "good")(e2.value, n2), t2(e2)));
        };
      }, d = (t2) => {
        requestAnimationFrame((() => requestAnimationFrame((() => t2()))));
      }, l = () => {
        const t2 = e();
        return t2?.activationStart ?? 0;
      }, h = (t2, n2 = -1) => {
        const o2 = e();
        let i2 = "navigate";
        c() >= 0 ? i2 = "back-forward-cache" : o2 && (document.prerendering || l() > 0 ? i2 = "prerender" : document.wasDiscarded ? i2 = "restore" : o2.type && (i2 = o2.type.replace(/_/g, "-")));
        return { name: t2, value: n2, rating: "good", delta: 0, entries: [], id: `v5-${Date.now()}-${Math.floor(8999999999999 * Math.random()) + 1e12}`, navigationType: i2 };
      }, m = (t2, e2, n2 = {}) => {
        try {
          if (PerformanceObserver.supportedEntryTypes.includes(t2)) {
            const o2 = new PerformanceObserver(((t3) => {
              Promise.resolve().then((() => {
                e2(t3.getEntries());
              }));
            }));
            return o2.observe({ type: t2, buffered: true, ...n2 }), o2;
          }
        } catch {
        }
      }, p = (t2) => {
        let e2 = false;
        return () => {
          e2 || (t2(), e2 = true);
        };
      };
      let g = -1;
      const y = /* @__PURE__ */ new Set(), v = () => "hidden" !== document.visibilityState || document.prerendering ? 1 / 0 : 0, b = (t2) => {
        if ("hidden" === document.visibilityState) {
          if ("visibilitychange" === t2.type) for (const t3 of y) t3();
          isFinite(g) || (g = "visibilitychange" === t2.type ? t2.timeStamp : 0, removeEventListener("prerenderingchange", b, true));
        }
      }, M = () => {
        if (g < 0) {
          const t2 = l(), e2 = document.prerendering ? void 0 : globalThis.performance.getEntriesByType("visibility-state").filter(((e3) => "hidden" === e3.name && e3.startTime > t2))[0]?.startTime;
          g = e2 ?? v(), addEventListener("visibilitychange", b, true), addEventListener("prerenderingchange", b, true), f2((() => {
            setTimeout((() => {
              g = v();
            }));
          }));
        }
        return { get firstHiddenTime() {
          return g;
        }, onHidden(t2) {
          y.add(t2);
        } };
      }, T = (t2) => {
        document.prerendering ? addEventListener("prerenderingchange", (() => t2()), true) : t2();
      }, E = [1800, 3e3], D = (t2, e2 = {}) => {
        T((() => {
          const n2 = M();
          let o2, i2 = h("FCP");
          const r2 = m("paint", ((t3) => {
            for (const e3 of t3) "first-contentful-paint" === e3.name && (r2.disconnect(), e3.startTime < n2.firstHiddenTime && (i2.value = Math.max(e3.startTime - l(), 0), i2.entries.push(e3), o2(true)));
          }));
          r2 && (o2 = u(t2, i2, E, e2.reportAllChanges), f2(((n3) => {
            i2 = h("FCP"), o2 = u(t2, i2, E, e2.reportAllChanges), d((() => {
              i2.value = performance.now() - n3.timeStamp, o2(true);
            }));
          })));
        }));
      }, L = [0.1, 0.25], P = (t2) => t2.find(((t3) => 1 === t3.node?.nodeType)) || t2[0], S = (e2, o2 = {}) => {
        const r2 = s(o2 = Object.assign({}, o2), t), a2 = /* @__PURE__ */ new WeakMap();
        r2.t = (t2) => {
          if (t2?.sources?.length) {
            const e3 = P(t2.sources), n2 = e3?.node;
            if (n2) {
              const t3 = o2.generateTarget?.(n2) ?? i(n2);
              a2.set(e3, t3);
            }
          }
        };
        ((e3, n2 = {}) => {
          const o3 = M();
          D(p((() => {
            let i2, r3 = h("CLS", 0);
            const a3 = s(n2, t), c2 = (t2) => {
              for (const e4 of t2) a3.u(e4);
              a3.o > r3.value && (r3.value = a3.o, r3.entries = a3.i, i2());
            }, l2 = m("layout-shift", c2);
            l2 && (i2 = u(e3, r3, L, n2.reportAllChanges), o3.onHidden((() => {
              c2(l2.takeRecords()), i2(true);
            })), f2((() => {
              a3.o = 0, r3 = h("CLS", 0), i2 = u(e3, r3, L, n2.reportAllChanges), d((() => i2()));
            })), setTimeout(i2));
          })));
        })(((t2) => {
          const o3 = ((t3) => {
            let e3 = {};
            if (t3.entries.length) {
              const o4 = t3.entries.reduce(((t4, e4) => t4.value > e4.value ? t4 : e4));
              if (o4?.sources?.length) {
                const t4 = P(o4.sources);
                t4 && (e3 = { largestShiftTarget: a2.get(t4), largestShiftTime: o4.startTime, largestShiftValue: o4.value, largestShiftSource: t4, largestShiftEntry: o4, loadState: n(o4.startTime) });
              }
            }
            return Object.assign(t3, { attribution: e3 });
          })(t2);
          e2(o3);
        }), o2);
      }, w = (t2, o2 = {}) => {
        D(((o3) => {
          const i2 = ((t3) => {
            let o4 = { timeToFirstByte: 0, firstByteToFCP: t3.value, loadState: n(c()) };
            if (t3.entries.length) {
              const i3 = e(), r2 = t3.entries.at(-1);
              if (i3) {
                const e2 = i3.activationStart || 0, s2 = Math.max(0, i3.responseStart - e2);
                o4 = { timeToFirstByte: s2, firstByteToFCP: t3.value - s2, loadState: n(t3.entries[0].startTime), navigationEntry: i3, fcpEntry: r2 };
              }
            }
            return Object.assign(t3, { attribution: o4 });
          })(o3);
          t2(i2);
        }), o2);
      };
      let _ = 0, F = 1 / 0, k = 0;
      const B = (t2) => {
        for (const e2 of t2) e2.interactionId && (F = Math.min(F, e2.interactionId), k = Math.max(k, e2.interactionId), _ = k ? (k - F) / 7 + 1 : 0);
      };
      let C;
      const O = () => C ? _ : performance.interactionCount ?? 0, j = () => {
        "interactionCount" in performance || C || (C = m("event", B, { type: "event", buffered: true, durationThreshold: 0 }));
      };
      let I = 0;
      class A {
        l = [];
        h = /* @__PURE__ */ new Map();
        m;
        p;
        v() {
          I = O(), this.l.length = 0, this.h.clear();
        }
        M() {
          const t2 = Math.min(this.l.length - 1, Math.floor((O() - I) / 50));
          return this.l[t2];
        }
        u(t2) {
          if (this.m?.(t2), !t2.interactionId && "first-input" !== t2.entryType) return;
          const e2 = this.l.at(-1);
          let n2 = this.h.get(t2.interactionId);
          if (n2 || this.l.length < 10 || t2.duration > e2.T) {
            if (n2 ? t2.duration > n2.T ? (n2.entries = [t2], n2.T = t2.duration) : t2.duration === n2.T && t2.startTime === n2.entries[0].startTime && n2.entries.push(t2) : (n2 = { id: t2.interactionId, entries: [t2], T: t2.duration }, this.h.set(n2.id, n2), this.l.push(n2)), this.l.sort(((t3, e3) => e3.T - t3.T)), this.l.length > 10) {
              const t3 = this.l.splice(10);
              for (const e3 of t3) this.h.delete(e3.id);
            }
            this.p?.(n2);
          }
        }
      }
      const W = (t2) => {
        const e2 = globalThis.requestIdleCallback || setTimeout;
        "hidden" === document.visibilityState ? t2() : (t2 = p(t2), addEventListener("visibilitychange", t2, { once: true, capture: true }), e2((() => {
          t2(), removeEventListener("visibilitychange", t2, { capture: true });
        })));
      }, q = [200, 500], x = (t2, e2 = {}) => {
        const o2 = s(e2 = Object.assign({}, e2), A);
        let r2 = [], a2 = [], c2 = 0;
        const d2 = /* @__PURE__ */ new WeakMap(), l2 = /* @__PURE__ */ new WeakMap();
        let p2 = false;
        const g2 = () => {
          p2 || (W(y2), p2 = true);
        }, y2 = () => {
          const t3 = o2.l.map(((t4) => d2.get(t4.entries[0]))), e3 = a2.length - 50;
          a2 = a2.filter(((n3, o3) => o3 >= e3 || t3.includes(n3)));
          const n2 = /* @__PURE__ */ new Set();
          for (const t4 of a2) {
            const e4 = v2(t4.startTime, t4.processingEnd);
            for (const t5 of e4) n2.add(t5);
          }
          const i2 = r2.length - 1 - 50;
          r2 = r2.filter(((t4, e4) => t4.startTime > c2 && e4 > i2 || n2.has(t4))), p2 = false;
        };
        o2.m = (t3) => {
          const e3 = t3.startTime + t3.duration;
          let n2;
          c2 = Math.max(c2, t3.processingEnd);
          for (let o3 = a2.length - 1; o3 >= 0; o3--) {
            const i2 = a2[o3];
            if (Math.abs(e3 - i2.renderTime) <= 8) {
              n2 = i2, n2.startTime = Math.min(t3.startTime, n2.startTime), n2.processingStart = Math.min(t3.processingStart, n2.processingStart), n2.processingEnd = Math.max(t3.processingEnd, n2.processingEnd), n2.entries.push(t3);
              break;
            }
          }
          n2 || (n2 = { startTime: t3.startTime, processingStart: t3.processingStart, processingEnd: t3.processingEnd, renderTime: e3, entries: [t3] }, a2.push(n2)), (t3.interactionId || "first-input" === t3.entryType) && d2.set(t3, n2), g2();
        }, o2.p = (t3) => {
          if (!l2.get(t3)) {
            const n2 = t3.entries[0].target;
            if (n2) {
              const o3 = e2.generateTarget?.(n2) ?? i(n2);
              l2.set(t3, o3);
            }
          }
        };
        const v2 = (t3, e3) => {
          const n2 = [];
          for (const o3 of r2) if (!(o3.startTime + o3.duration < t3)) {
            if (o3.startTime > e3) break;
            n2.push(o3);
          }
          return n2;
        }, b2 = (t3) => {
          const e3 = t3.entries[0], i2 = d2.get(e3), r3 = e3.processingStart, s2 = Math.max(e3.startTime + e3.duration, r3), a3 = Math.min(i2.processingEnd, s2), c3 = i2.entries.sort(((t4, e4) => t4.processingStart - e4.processingStart)), f3 = v2(e3.startTime, a3), u2 = o2.h.get(e3.interactionId), h2 = { interactionTarget: l2.get(u2), interactionType: e3.name.startsWith("key") ? "keyboard" : "pointer", interactionTime: e3.startTime, nextPaintTime: s2, processedEventEntries: c3, longAnimationFrameEntries: f3, inputDelay: r3 - e3.startTime, processingDuration: a3 - r3, presentationDelay: s2 - a3, loadState: n(e3.startTime), longestScript: void 0, totalScriptDuration: void 0, totalStyleAndLayoutDuration: void 0, totalPaintDuration: void 0, totalUnattributedDuration: void 0 };
          ((t4) => {
            if (!t4.longAnimationFrameEntries?.length) return;
            const e4 = t4.interactionTime, n2 = t4.inputDelay, o3 = t4.processingDuration;
            let i3, r4, s3 = 0, a4 = 0, c4 = 0, f4 = 0;
            for (const c5 of t4.longAnimationFrameEntries) {
              a4 = a4 + c5.startTime + c5.duration - c5.styleAndLayoutStart;
              for (const t5 of c5.scripts) {
                const c6 = t5.startTime + t5.duration;
                if (c6 < e4) continue;
                const u4 = c6 - Math.max(e4, t5.startTime), d4 = t5.duration ? u4 / t5.duration * t5.forcedStyleAndLayoutDuration : 0;
                s3 += u4 - d4, a4 += d4, u4 > f4 && (r4 = t5.startTime < e4 + n2 ? "input-delay" : t5.startTime >= e4 + n2 + o3 ? "presentation-delay" : "processing-duration", i3 = t5, f4 = u4);
              }
            }
            const u3 = t4.longAnimationFrameEntries.at(-1), d3 = u3 ? u3.startTime + u3.duration : 0;
            d3 >= e4 + n2 + o3 && (c4 = t4.nextPaintTime - d3), i3 && r4 && (t4.longestScript = { entry: i3, subpart: r4, intersectingDuration: f4 }), t4.totalScriptDuration = s3, t4.totalStyleAndLayoutDuration = a4, t4.totalPaintDuration = c4, t4.totalUnattributedDuration = t4.nextPaintTime - e4 - s3 - a4 - c4;
          })(h2);
          return Object.assign(t3, { attribution: h2 });
        };
        m("long-animation-frame", ((t3) => {
          r2 = r2.concat(t3), g2();
        })), ((t3, e3 = {}) => {
          if (!globalThis.PerformanceEventTiming || !("interactionId" in PerformanceEventTiming.prototype)) return;
          const n2 = M();
          T((() => {
            j();
            let o3, i2 = h("INP");
            const r3 = s(e3, A), a3 = (t4) => {
              W((() => {
                for (const e5 of t4) r3.u(e5);
                const e4 = r3.M();
                e4 && e4.T !== i2.value && (i2.value = e4.T, i2.entries = e4.entries, o3());
              }));
            }, c3 = m("event", a3, { durationThreshold: e3.durationThreshold ?? 40 });
            o3 = u(t3, i2, q, e3.reportAllChanges), c3 && (c3.observe({ type: "first-input", buffered: true }), n2.onHidden((() => {
              a3(c3.takeRecords()), o3(true);
            })), f2((() => {
              r3.v(), i2 = h("INP"), o3 = u(t3, i2, q, e3.reportAllChanges);
            })));
          }));
        })(((e3) => {
          const n2 = b2(e3);
          t2(n2);
        }), e2);
      };
      class N {
        m;
        u(t2) {
          this.m?.(t2);
        }
      }
      const H = [2500, 4e3], R = (t2, n2 = {}) => {
        const o2 = s(n2 = Object.assign({}, n2), N), r2 = /* @__PURE__ */ new WeakMap();
        o2.m = (t3) => {
          const e2 = t3.element;
          if (e2) {
            const o3 = n2.generateTarget?.(e2) ?? i(e2);
            r2.set(t3, o3);
          }
        };
        ((t3, e2 = {}) => {
          T((() => {
            const n3 = M();
            let o3, i2 = h("LCP");
            const r3 = s(e2, N), a2 = (t4) => {
              e2.reportAllChanges || (t4 = t4.slice(-1));
              for (const e3 of t4) r3.u(e3), e3.startTime < n3.firstHiddenTime && (i2.value = Math.max(e3.startTime - l(), 0), i2.entries = [e3], o3());
            }, c2 = m("largest-contentful-paint", a2);
            if (c2) {
              o3 = u(t3, i2, H, e2.reportAllChanges);
              const n4 = p((() => {
                a2(c2.takeRecords()), c2.disconnect(), o3(true);
              })), r4 = (t4) => {
                t4.isTrusted && (W(n4), removeEventListener(t4.type, r4, { capture: true }));
              };
              for (const t4 of ["keydown", "click", "visibilitychange"]) addEventListener(t4, r4, { capture: true });
              f2(((n5) => {
                i2 = h("LCP"), o3 = u(t3, i2, H, e2.reportAllChanges), d((() => {
                  i2.value = performance.now() - n5.timeStamp, o3(true);
                }));
              }));
            }
          }));
        })(((n3) => {
          const o3 = ((t3) => {
            let n4 = { timeToFirstByte: 0, resourceLoadDelay: 0, resourceLoadDuration: 0, elementRenderDelay: t3.value };
            if (t3.entries.length) {
              const o4 = e();
              if (o4) {
                const e2 = o4.activationStart || 0, i2 = t3.entries.at(-1), s2 = i2.url && performance.getEntriesByType("resource").filter(((t4) => t4.name === i2.url))[0], a2 = Math.max(0, o4.responseStart - e2), c2 = Math.max(a2, s2 ? (s2.requestStart || s2.startTime) - e2 : 0), f3 = Math.min(t3.value, Math.max(c2, s2 ? s2.responseEnd - e2 : 0));
                n4 = { target: r2.get(i2), timeToFirstByte: a2, resourceLoadDelay: c2 - a2, resourceLoadDuration: f3 - c2, elementRenderDelay: t3.value - f3, navigationEntry: o4, lcpEntry: i2 }, i2.url && (n4.url = i2.url), s2 && (n4.lcpResourceEntry = s2);
              }
            }
            return Object.assign(t3, { attribution: n4 });
          })(n3);
          t2(o3);
        }), n2);
      }, U = [800, 1800], V = (t2) => {
        document.prerendering ? T((() => V(t2))) : "complete" !== document.readyState ? addEventListener("load", (() => V(t2)), true) : setTimeout(t2);
      }, $ = (t2, n2 = {}) => {
        ((t3, n3 = {}) => {
          let o2 = h("TTFB"), i2 = u(t3, o2, U, n3.reportAllChanges);
          V((() => {
            const r2 = e();
            r2 && (o2.value = Math.max(r2.responseStart - l(), 0), o2.entries = [r2], i2(true), f2((() => {
              o2 = h("TTFB", 0), i2 = u(t3, o2, U, n3.reportAllChanges), i2(true);
            })));
          }));
        })(((e2) => {
          const n3 = ((t3) => {
            let e3 = { waitingDuration: 0, cacheDuration: 0, dnsDuration: 0, connectionDuration: 0, requestDuration: 0 };
            if (t3.entries.length) {
              const n4 = t3.entries[0], o2 = n4.activationStart || 0, i2 = Math.max((n4.workerStart || n4.fetchStart) - o2, 0), r2 = Math.max(n4.domainLookupStart - o2, 0), s2 = Math.max(n4.connectStart - o2, 0), a2 = Math.max(n4.connectEnd - o2, 0);
              e3 = { waitingDuration: i2, cacheDuration: r2 - i2, dnsDuration: s2 - r2, connectionDuration: a2 - s2, requestDuration: t3.value - a2, navigationEntry: n4 };
            }
            return Object.assign(t3, { attribution: e3 });
          })(e2);
          t2(n3);
        }), n2);
      };
      var webVitals_attribution = /* @__PURE__ */ Object.freeze({
        __proto__: null,
        CLSThresholds: L,
        FCPThresholds: E,
        INPThresholds: q,
        LCPThresholds: H,
        TTFBThresholds: U,
        onCLS: S,
        onFCP: w,
        onINP: x,
        onLCP: R,
        onTTFB: $
      });
      exports2.ItemScheduleClient = ItemScheduleClient;
      exports2.CLIENT_VERSION = CLIENT_VERSION;
      exports2.CssVariableThemeProvider = CssVariableThemeProvider;
      exports2.DefaultWorkloadClientConfig = DefaultWorkloadClientConfig;
      exports2.EndpointClient = EndpointClient;
      exports2.WorkloadClient = WorkloadClient$1;
      exports2.Messages = Messages$1;
      exports2.NavigationClient = NavigationClient;
      exports2.PreDefinedEventName = PreDefinedEventName;
      exports2.STYLE_ELEMENT_ID = STYLE_ELEMENT_ID;
      exports2.THEME_ATTRIBUTE = THEME_ATTRIBUTE;
      exports2.bootstrap = bootstrap2;
      exports2.createWorkloadClient = createWorkloadClient3;
    }));
  }
});

// src/components/pageController.ts
async function callPageOpen(workloadClient, workloadName, path) {
  console.log(workloadClient);
  console.log("in call page open");
  await workloadClient.page.open({
    workloadName,
    route: {
      path
    },
    mode: import_workload_client.OpenMode.ReplaceAll
  });
}
var import_workload_client;
var init_pageController = __esm({
  "src/components/pageController.ts"() {
    import_workload_client = __toESM(require_workload_client(), 1);
  }
});

// src/ui/worker.ts
var worker_exports = {};
__export(worker_exports, {
  initialize: () => initialize
});
async function initialize(params) {
  let workloadClient = (0, import_workload_client2.createWorkloadClient)();
  workloadClient.action.onAction(async (message) => {
    const { action, data } = message;
    switch (action) {
      case "item.onCreationSuccess":
        const { item: createdItem } = data;
        console.log(createdItem);
        const itemTypeName = createdItem.itemType;
        let path = null;
        switch (itemTypeName) {
          case "Org.MyWorkload.Report":
            path = "/report";
            break;
          case "Org.MyWorkload.Workspace":
            path = "/workspace";
            break;
          case "Org.MyWorkload.Integration":
            path = "/integration";
            break;
        }
        console.log(`redirecting to ${path} with item id ${createdItem.objectId}`);
        await callPageOpen(workloadClient, "Org.MyWorkload", `${path}/${createdItem.objectId}`);
        return Promise.resolve({ succeeded: true });
      case "item.onCreationFailure":
        break;
    }
  });
}
var import_workload_client2;
var init_worker = __esm({
  "src/ui/worker.ts"() {
    init_pageController();
    import_workload_client2 = __toESM(require_workload_client(), 1);
  }
});

// src/components/itemController.ts
async function getItem(workloadClient, itemObjectId) {
  try {
    const item = await workloadClient.itemCrud.getItem({ itemId: itemObjectId });
    return item;
  } catch (exception) {
    console.log(`unable to fetch item with id: ${itemObjectId}, error: ${exception}`);
  }
  return null;
}
async function getItemDefintion(workloadClient, itemObjectId) {
  try {
    const itemDefinitionResult = await workloadClient.itemCrud.getItemDefinition({ itemId: itemObjectId });
    return itemDefinitionResult;
  } catch (exception) {
    console.log(`failed to get item definition for item ${itemObjectId}, error: ${exception}`);
  }
}
function convertItemResultToWorkloadItem(itemResult, itemDefinitionResult, defaultDefinition) {
  let payload = null;
  let itemPlatformMetadata = void 0;
  let additionalParts = [];
  if (itemDefinitionResult?.definition?.parts) {
    try {
      for (const part of itemDefinitionResult.definition.parts) {
        if (part.path == "payload.json" /* Default */) {
          payload = JSON.parse(atob(part.payload));
        } else if (part.path == ".platform" /* Platform */) {
          const itemPlatformPayload = JSON.parse(atob(part.payload));
          itemPlatformMetadata = itemPlatformPayload ? itemPlatformPayload.metadata : void 0;
        } else {
          additionalParts.push(part);
        }
      }
    } catch (parseError) {
      console.log(`failed to parse payload for item ${itemResult?.item?.id}, message: ${parseError}`);
    }
  }
  return {
    id: itemResult?.item.id,
    workspaceId: itemResult?.item.workspaceId,
    type: itemPlatformMetadata?.type ?? itemResult?.item.type,
    displayName: itemPlatformMetadata?.displayName ?? itemResult?.item.displayName,
    description: itemPlatformMetadata?.description ?? itemResult?.item.description,
    definition: payload ?? defaultDefinition,
    additionalDefinitionParts: additionalParts
  };
}
async function getWorkloadItem(workloadClient, itemObjectId, defaultDefinition) {
  const getItemResult = await getItem(workloadClient, itemObjectId);
  const getItemDefinitionResult = await getItemDefintion(workloadClient, itemObjectId);
  const item = await convertItemResultToWorkloadItem(getItemResult, getItemDefinitionResult, defaultDefinition);
  return item;
}
function createDefaultDefinitionPart(definition) {
  return {
    path: "payload.json" /* Default */,
    payload: btoa(JSON.stringify(definition, null, 2)),
    payloadType: import_workload_client3.PayloadType.InlineBase64
  };
}
async function updateItemDefinition(workloadClient, itemId, definitionParts, updateMetadata = false) {
  const itemDefinitions = {
    definition: {
      format: void 0,
      parts: definitionParts
    }
  };
  try {
    return await workloadClient.itemCrud.updateItemDefinition({
      itemId,
      payload: itemDefinitions,
      updateMetadata
    });
  } catch (exception) {
    console.log(`failed to update item definition for item: ${itemId}`);
    return void 0;
  }
}
async function saveWorkloadItem(workloadClient, itemWithDefinition) {
  if (!itemWithDefinition.id) {
    throw new Error("no item id provided");
  }
  if (!itemWithDefinition.definition) {
    throw new Error("no item definition provided");
  }
  const defaultDefinitionPart = createDefaultDefinitionPart(itemWithDefinition.definition);
  const definitionParts = [defaultDefinitionPart];
  if (itemWithDefinition.additionalDefinitionParts?.length > 0) {
    for (const additionalDefinitionPart of itemWithDefinition.additionalDefinitionParts) {
      definitionParts.push(additionalDefinitionPart);
    }
  }
  return updateItemDefinition(workloadClient, itemWithDefinition.id, definitionParts, false);
}
var import_workload_client3;
var init_itemController = __esm({
  "src/components/itemController.ts"() {
    import_workload_client3 = __toESM(require_workload_client(), 1);
  }
});

// src/ui/page.ts
var Page;
var init_page = __esm({
  "src/ui/page.ts"() {
    init_itemController();
    Page = class {
      constructor(rootElement, id, client) {
        this.id = null;
        this.appElement = null;
        this.workloadClient = null;
        this.definition = null;
        this.item = null;
        this.itemId = null;
        this.getItemButton = null;
        this.setItemButton = null;
        this.itemDetails = null;
        this.message = null;
        this.error = null;
        this.id = id;
        this.appElement = rootElement;
        this.workloadClient = client;
        this.itemId = document.getElementById("itemId");
        this.itemId.textContent = `Item Id: ${id}`;
        this.getItemButton = document.getElementById("getItemButton");
        this.setItemButton = document.getElementById("setItemButton");
        this.itemDetails = document.getElementById("itemDetails");
        this.message = document.getElementById("message");
        this.error = document.getElementById("error");
      }
      resetMessage() {
        this.message.textContent = "";
        this.error.textContent = "";
      }
      async GetItem() {
        let result = await getWorkloadItem(this.workloadClient, this.id);
        this.item = result;
        return result.definition;
      }
      async SaveItem() {
        await saveWorkloadItem(this.workloadClient, this.item);
      }
      Render() {
      }
    };
  }
});

// src/ui/report.ts
var ReportPage;
var init_report = __esm({
  "src/ui/report.ts"() {
    init_page();
    ReportPage = class extends Page {
      constructor(rootElement, id, workloadClient) {
        super(rootElement, id, workloadClient);
        this.connection = null;
        this.title = null;
        this.connection = this.itemDetails.appendChild(document.createElement("input"));
        this.connection.style.display = "block";
        this.connection.style.marginTop = "8px";
        this.title = this.itemDetails.appendChild(document.createElement("input"));
        this.title.style.display = "block";
        this.title.style.marginTop = "8px";
        this.getItemButton.addEventListener("click", async () => {
          let result = await this.GetItem();
          this.resetMessage();
          if (result) {
            this.message.textContent = "successfully retrieved item";
            this.connection.value = result.connection;
            this.title.value = result.title;
          } else {
            this.error.textContent = "item has not been created yet";
            this.connection.textContent = "";
            this.title.textContent = "";
          }
        });
        this.setItemButton.addEventListener("click", async () => {
          this.resetMessage();
          let newItem = {
            connection: this.connection.value,
            title: this.title.value
          };
          this.item.definition = newItem;
          console.log(`updating item with id ${this.item.id}`);
          console.log(this.item);
          await this.SaveItem();
          this.connection.value = "";
          this.title.value = "";
          this.message.textContent = "successfully saved item";
        });
      }
      Render() {
        console.log("welcome to the jungle baby, we got fun and games");
      }
    };
  }
});

// src/ui/ui.ts
var ui_exports = {};
__export(ui_exports, {
  initialize: () => initialize2
});
async function initialize2(params) {
  const appElement = document.getElementById("app");
  const workloadClient = (0, import_workload_client4.createWorkloadClient)();
  let parts = params.bootstrapPath.split("/");
  let type = parts[1];
  let itemId = parts[2];
  let page = null;
  switch (type) {
    case "report":
      page = new ReportPage(appElement, itemId, workloadClient);
      break;
    case "integration":
      break;
    case "workspace":
      break;
  }
  page.Render();
}
var import_workload_client4;
var init_ui = __esm({
  "src/ui/ui.ts"() {
    import_workload_client4 = __toESM(require_workload_client(), 1);
    init_report();
  }
});

// src/index.ts
var import_workload_client5 = __toESM(require_workload_client(), 1);
var url = new URL(window.location.href);
if (url.pathname?.startsWith("/close")) {
  window.close();
}
(0, import_workload_client5.bootstrap)({
  //@ts-ignore
  initializeWorker: (params) => Promise.resolve().then(() => (init_worker(), worker_exports)).then(({ initialize: initialize3 }) => initialize3(params)),
  //@ts-ignore
  initializeUI: (params) => Promise.resolve().then(() => (init_ui(), ui_exports)).then(({ initialize: initialize3 }) => initialize3(params))
});
//# sourceMappingURL=bundle.mjs.map
