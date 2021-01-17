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
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
const getAuthToken = (req, _, next) => {
    if (req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer')
        req.params.authToken = req.headers.authorization.split(' ')[1];
    else
        req.params.authToken = '';
    next();
};
const isAuthenticated = (req, res, next) => {
    getAuthToken(req, res, () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { authToken } = req.params;
            const userInfo = yield index_1.admin.auth().verifyIdToken(authToken);
            req.params.authId = userInfo.uid;
            return next();
        }
        catch (e) {
            return res
                .status(401)
                .send({ error: 'You are not authorized to make this request' });
        }
    }));
};
exports.default = isAuthenticated;
//# sourceMappingURL=auth.js.map