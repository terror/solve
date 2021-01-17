"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.admin = exports.db = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const admin = __importStar(require("firebase-admin"));
exports.admin = admin;
const users_1 = __importDefault(require("./src/routes/users"));
const problems_1 = __importDefault(require("./src/routes/problems"));
const workspaces_1 = __importDefault(require("./src/routes/workspaces"));
const templates_1 = __importDefault(require("./src/routes/templates"));
const app = express_1.default();
const port = process.env.PORT || 5000;
const params = {
    type: process.env.TYPE,
    projectId: process.env.PROJECT_ID,
    privateKeyId: process.env.PROJECT_KEY_ID,
    privateKey: (_a = process.env.PRIVATE_KEY) === null || _a === void 0 ? void 0 : _a.replace(/\\n/g, '\n'),
    clientEmail: process.env.CLIENT_EMAIL,
    clientId: process.env.CLIENT_ID,
    authUri: process.env.AUTH_ID,
    tokenUri: process.env.TOKEN_URI,
    authProviderX509CertUrl: process.env.AUTH_PROVIDER_X509_CERT_URL,
    clientC509CertUrl: process.env.CLIENT_X509_CERT_URL,
};
admin.initializeApp({
    credential: admin.credential.cert(params),
});
const db = admin.firestore();
exports.db = db;
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, '../../client/build')));
app.use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});
app.use('/api/users', users_1.default);
app.use('/api/problems', problems_1.default);
app.use('/api/workspaces', workspaces_1.default);
app.use('/api/templates', templates_1.default);
app.get('*', function (_, response) {
    response.sendFile(path_1.default.resolve(__dirname, '../../client/build', 'index.html'));
});
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
//# sourceMappingURL=index.js.map