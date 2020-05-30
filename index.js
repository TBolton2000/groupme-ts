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
exports.__esModule = true;
var group_1 = require("./group");
var user_1 = require("./user");
var got = require("got");
var groupme_api = got.extend({
    prefixUrl: "https://api.groupme.com/v3"
});
var token = process.env.GM_TOKEN;
console.log(token);
function getGroups() {
    return __awaiter(this, void 0, void 0, function () {
        var response, responseObj, groups;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, groupme_api("groups?token=" + token)];
                case 1:
                    response = _a.sent();
                    responseObj = JSON.parse(response.body);
                    groups = responseObj.response.map(function (group) {
                        var meta = {
                            phone_number: group.phone_number,
                            type: group.type,
                            description: group.description,
                            image_url: group.image_url,
                            creator: null,
                            created_at: new Date(group.created_at),
                            updated_at: new Date(group.updated_at),
                            muted_until: group.muted_until,
                            office_mode: group.office_mode,
                            share_url: group.share_url ? new URL(group.share_url) : null,
                            share_qr_code_url: group.share_qr_code_url ? new URL(group.share_qr_code_url) : null,
                            message_count: group.messages.count
                        };
                        var members = group.members.map(function (member) {
                            return new user_1.User(member.name, member.id, member.image_url);
                        });
                        return new group_1.Group(group.name, group.id, members, meta);
                    });
                    return [2 /*return*/, groups];
            }
        });
    });
}
;
// async function getUserFromID(user_id: number): Promise<User> {
//     const response = await groupme_api(`users/${user_id}?token=${token}`)
//     const user = new User()
//     return user;
// }
var groups;
getGroups().then(function (_groups) {
    groups = _groups;
    groups.forEach(function (value) {
        console.log(value.name);
    });
});
