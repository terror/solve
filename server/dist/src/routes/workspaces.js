'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const index_1 = require('../../index');
const auth_1 = __importDefault(require('../middleware/auth'));
const statusCodes_1 = require('../config/statusCodes');
const router = express_1.default.Router();
router.post('/', auth_1.default, (req, res) => {
  const id = req.params.authId;
  const { editor, problem } = req.body;
  const workspaceObject = {
    userId: id,
    editor: editor,
    problem: problem,
  };
  try {
    index_1.admin.firestore().collection('/workspaces').add(workspaceObject);
    return res
      .status(statusCodes_1.statusCodes.SUCCESS)
      .send('Workspace saved successfully.');
  } catch (err) {
    return res.status(statusCodes_1.statusCodes.SERVER_ERROR).send(err);
  }
});
router.get('/:id', (req, res) => {
  const data = [];
  index_1.db
    .collection('workspaces')
    .where('userId', '==', req.params.id)
    .get()
    .then((snap) => {
      if (snap.empty) {
        res
          .status(statusCodes_1.statusCodes.NOT_FOUND)
          .send('No such document exists.');
        return;
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
router.delete('/:id', auth_1.default, (req, res) => {
  const id = req.params.id;
  index_1.db
    .collection('workspaces')
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
//# sourceMappingURL=workspaces.js.map
