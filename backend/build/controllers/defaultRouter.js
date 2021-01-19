"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var axios_1 = __importDefault(require("axios"));
var timer_1 = __importDefault(require("../tools/timer"));
var xml2json_1 = __importDefault(require("xml2json"));
var router = express_1.Router();
var baseURL = "https://bad-api-assignment.reaktor.com/v2/";
var timeout = 250;
router.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log('Get');
        res.json({ success: true });
        return [2 /*return*/];
    });
}); });
router.get('/products/:category', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var path, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                path = apiPath(["products", req.params.category]);
                _b = (_a = res).json;
                return [4 /*yield*/, getJsonResponse(path)];
            case 1:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); });
router.get('/availability/:manufacturer', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var path, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                path = apiPath(["availability", req.params.manufacturer]);
                return [4 /*yield*/, getJsonResponse(path)];
            case 1:
                data = _a.sent();
                console.log("Received availability: ", data);
                try {
                    res.json(data.response.map(function (p) {
                        var productAvailability = {
                            id: p.id,
                            availability: getAvailabilityFromXml(p.DATAPAYLOAD)
                        };
                        console.log("Product availability: ", productAvailability);
                        return productAvailability;
                    }));
                }
                catch (e) {
                    res.status(500).json([]);
                }
                return [2 /*return*/];
        }
    });
}); });
var getAvailabilityFromXml = function (s) {
    var data = JSON.parse(xml2json_1.default.toJson(s));
    return data["AVAILABILITY"]["INSTOCKVALUE"];
};
var getJsonResponse = function (path, retries) {
    if (retries === void 0) { retries = 1; }
    return __awaiter(void 0, void 0, void 0, function () {
        var i, response, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < retries)) return [3 /*break*/, 8];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, axios_1.default.get(path, {
                            headers: {
                                'x-force-error-mode': ''
                            }
                        })];
                case 3:
                    response = _a.sent();
                    return [2 /*return*/, response.data];
                case 4:
                    e_1 = _a.sent();
                    console.log("Error fetching JSON from API: ", e_1.message, e_1);
                    return [3 /*break*/, 5];
                case 5: return [4 /*yield*/, timer_1.default(timeout)];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    i++;
                    return [3 /*break*/, 1];
                case 8: return [2 /*return*/];
            }
        });
    });
};
var apiPath = function (path) {
    return baseURL + path.join("/");
};
exports.default = router;