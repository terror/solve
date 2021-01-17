"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middleware/auth"));
const index_1 = require("../../index");
const statusCodes_1 = require("../config/statusCodes");
const router = express_1.default.Router();
router.get('/:id', (req, res) => {
    const data = [];
    index_1.db.collection('templates')
        .where('userId', '==', req.params.id)
        .get()
        .then((snap) => {
        if (snap.empty) {
            return res
                .status(statusCodes_1.statusCodes.NOT_FOUND)
                .send('No such document exists.');
        }
        snap.docs.forEach((doc) => {
            const docData = doc.data();
            docData.id = doc.id;
            data.push(docData);
        });
        return res.status(statusCodes_1.statusCodes.SUCCESS).send(data);
    })
        .catch((err) => {
        return res.status(statusCodes_1.statusCodes.SERVER_ERROR).send(err);
    });
});
router.post('/', auth_1.default, (req, res) => {
    const id = req.params.authId;
    const { name, body, lang, } = req.body;
    index_1.db.collection('templates')
        .add({
        userId: id,
        name: name,
        body: body,
        lang: lang,
    })
        .then((result) => {
        return res.status(statusCodes_1.statusCodes.SUCCESS).send(result);
    })
        .catch((err) => {
        return res.status(statusCodes_1.statusCodes.NOT_FOUND).send(err);
    });
});
router.delete('/:id', auth_1.default, (req, res) => {
    const id = req.params.id;
    index_1.db.collection('templates')
        .doc(id)
        .delete()
        .then((result) => {
        return res.status(statusCodes_1.statusCodes.SUCCESS).send(result);
    })
        .catch((err) => {
        return res.status(statusCodes_1.statusCodes.SERVER_ERROR).send(err);
    });
});
exports.default = router;
//# sourceMappingURL=templates.js.map