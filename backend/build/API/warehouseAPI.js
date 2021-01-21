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
var getJson_1 = __importDefault(require("../utils/getJson"));
var xml2json_1 = __importDefault(require("xml2json"));
var UpdateStatus;
(function (UpdateStatus) {
    UpdateStatus[UpdateStatus["Updated"] = 0] = "Updated";
    UpdateStatus[UpdateStatus["NotUpdated"] = 1] = "NotUpdated";
    UpdateStatus[UpdateStatus["Failed"] = 2] = "Failed";
})(UpdateStatus || (UpdateStatus = {}));
var cachedObjectLifetime = 300;
var baseURL = "https://bad-api-assignment.reaktor.com/v2";
var cache = {
    products: {},
    productUpdateTimes: {},
    availabilityUpdateTimes: {}
};
//#region updating
var updateProducts = function (category) { return __awaiter(void 0, void 0, void 0, function () {
    var path, products, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (cache.products[category]
                    && cache.products[category].length > 0
                    && getSeconds() - cache.productUpdateTimes[category] < cachedObjectLifetime) {
                    return [2 /*return*/, UpdateStatus.NotUpdated];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                path = baseURL + "/products/" + category;
                return [4 /*yield*/, getJson_1.default(path)];
            case 2:
                products = _a.sent();
                products = products.map(function (p) {
                    p.availability = "";
                    return p;
                }).sort(function (a, b) { return a.name.localeCompare(b.name); });
                saveProducts(category, products);
                return [2 /*return*/, UpdateStatus.Updated];
            case 3:
                error_1 = _a.sent();
                return [2 /*return*/, UpdateStatus.Failed];
            case 4: return [2 /*return*/];
        }
    });
}); };
var updateAvailability = function (manufacturer) { return __awaiter(void 0, void 0, void 0, function () {
    var path, data, availability, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (cache.availabilityUpdateTimes[manufacturer] && getSeconds() - cache.availabilityUpdateTimes[manufacturer] < cachedObjectLifetime) {
                    return [2 /*return*/, UpdateStatus.NotUpdated];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                path = baseURL + "/availability/" + manufacturer;
                return [4 /*yield*/, getJson_1.default(path)];
            case 2:
                data = _a.sent();
                availability = data.response.map(function (p) {
                    var productAvailability = {
                        id: p.id,
                        availability: getAvailabilityFromXml(p.DATAPAYLOAD)
                    };
                    return productAvailability;
                });
                saveAvailability(manufacturer, availability);
                return [2 /*return*/, UpdateStatus.Updated];
            case 3:
                error_2 = _a.sent();
                return [2 /*return*/, UpdateStatus.NotUpdated];
            case 4: return [2 /*return*/];
        }
    });
}); };
var getAvailabilityFromXml = function (s) {
    var data = JSON.parse(xml2json_1.default.toJson(s));
    return data["AVAILABILITY"]["INSTOCKVALUE"];
};
//#endregion
//#region saving
var saveProducts = function (category, products) {
    cache.products[category] = products;
};
var saveAvailability = function (manufacturer, availability) {
    var manAvailability = {};
    availability.forEach(function (a) {
        manAvailability[a.id.toLowerCase()] = a.availability;
    });
    for (var category in cache.products) {
        var products = cache.products[category];
        for (var i = 0; i < products.length; i++) {
            var availability_1 = manAvailability[products[i].id];
            if (availability_1) {
                products[i].availability = availability_1;
            }
        }
        cache.products[category] = products;
    }
    cache.availabilityUpdateTimes[manufacturer] = getSeconds();
};
var getSeconds = function () {
    return new Date().getTime() / 1000;
};
//#endregion
//#region API
var getManufacturers = function (category) { return __awaiter(void 0, void 0, void 0, function () {
    var productsResult, products, hs, manufacturers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, updateProducts(category)];
            case 1:
                productsResult = _a.sent();
                console.log("Get products '" + category + "': " + productsResult);
                if (productsResult == UpdateStatus.Failed) {
                    return [2 /*return*/, null];
                }
                products = cache.products[category];
                if (!products) {
                    return [2 /*return*/, []];
                }
                hs = new Set();
                products.forEach(function (p) {
                    hs.add(p.manufacturer);
                });
                manufacturers = [];
                hs.forEach(function (m) {
                    manufacturers.push(m);
                });
                return [2 /*return*/, manufacturers.sort()];
        }
    });
}); };
var getProducts = function (category, manufacturer, page, pageItemCount, filter) {
    if (page === void 0) { page = 0; }
    if (pageItemCount === void 0) { pageItemCount = 20; }
    if (filter === void 0) { filter = ""; }
    return __awaiter(void 0, void 0, void 0, function () {
        var productsResult, availabilityResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Get producst: cat=" + category + " man=" + manufacturer + " page=" + page + " filter=" + filter);
                    return [4 /*yield*/, updateProducts(category)];
                case 1:
                    productsResult = _a.sent();
                    console.log("Get products '" + category + "': " + productsResult);
                    if (productsResult == UpdateStatus.Failed) {
                        return [2 /*return*/, null];
                    }
                    return [4 /*yield*/, updateAvailability(manufacturer)];
                case 2:
                    availabilityResult = _a.sent();
                    console.log("Get availability '" + manufacturer + "': " + availabilityResult);
                    // leave out await for instant return
                    if (availabilityResult == UpdateStatus.Failed) {
                        console.log('Failed to update availability');
                    }
                    return [2 /*return*/, cache.products[category].filter(function (p) {
                            return manufacturer == p.manufacturer && p.name.toLocaleLowerCase().includes(filter.toLowerCase());
                        }).slice(page, page + pageItemCount)];
            }
        });
    });
};
//#endregion
exports.default = {
    getManufacturers: getManufacturers,
    getProducts: getProducts
};
