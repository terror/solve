'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const codeforces_1 = require('./platforms/codeforces');
const atcoder_1 = require('./platforms/atcoder');
const kattis_1 = require('./platforms/kattis');
const platforms = ['Codeforces', 'HackerRank', 'CodeChef', 'AtCoder'];
const parser = (platform, id) => {
  if (!platforms.includes(platform))
    throw new Error('Invalid contest platform');
  const match = id.match(/([0-9]+)([A-Z][A-Z0-9]*)$/);
  if (!match) throw new Error('Invalid Codeforces problem ID');
  const contest = match[1],
    problem = match[2];
  switch (platform) {
    case 'Codeforces':
      return codeforces_1.getCodeforcesProblem({ contest, problem });
    case 'AtCoder':
      return atcoder_1.getAtCoderProblem({ contest, problem });
    case 'Kattis':
      return kattis_1.getKattisProblem(problem);
    default:
      return undefined;
  }
};
exports.default = parser;
//# sourceMappingURL=index.js.map
