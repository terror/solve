'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const auth_1 = __importDefault(require('../middleware/auth'));
const index_1 = require('../../index');
const statusCodes_1 = require('../config/statusCodes');
const router = express_1.default.Router();
router.get('/', (_, res) => {
  index_1.admin
    .auth()
    .listUsers(1000)
    .then((result) => {
      const response = [];
      result.users.forEach((user) => {
        response.push(user.toJSON());
      });
      res.status(statusCodes_1.statusCodes.SUCCESS).send(response);
    })
    .catch((err) => {
      res.status(statusCodes_1.statusCodes.SERVER_ERROR).send(err);
    });
});
router.get('/:id', (req, res) => {
  index_1.admin
    .auth()
    .getUser(req.params.id)
    .then((user) => {
      res.status(statusCodes_1.statusCodes.SUCCESS).send(user.toJSON());
    })
    .catch((err) => {
      res.status(statusCodes_1.statusCodes.SERVER_ERROR).send(err);
    });
});
router.post('/', (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  index_1.admin
    .auth()
    .createUser({
      email: email,
      emailVerified: false,
      password: password,
      displayName: `${firstName} ${lastName}`,
    })
    .then((user) => {
      res.status(statusCodes_1.statusCodes.SUCCESS).send(user);
    })
    .catch((err) => {
      res.status(statusCodes_1.statusCodes.SERVER_ERROR).send(err);
    });
});
router.put('/', auth_1.default, (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  index_1.admin
    .auth()
    .updateUser(req.params.authId, {
      email: email,
      emailVerified: true,
      password: password,
      displayName: `${firstName} ${lastName}`,
    })
    .then((user) => {
      res.status(statusCodes_1.statusCodes.SUCCESS).send(user.toJSON());
    })
    .catch((err) => {
      res.status(statusCodes_1.statusCodes.SERVER_ERROR).send(err);
    });
});
router.delete('/', auth_1.default, (req, res) => {
  index_1.admin
    .auth()
    .deleteUser(req.params.authId)
    .then(() => {
      res
        .status(statusCodes_1.statusCodes.SUCCESS)
        .send(`Successfully deleted user with id: ${req.params.id}`);
    })
    .catch((err) => {
      res.status(statusCodes_1.statusCodes.SERVER_ERROR).send(err);
    });
});
exports.default = router;
//# sourceMappingURL=users.js.map
