'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.getCodeforcesProblem = void 0;
const cheerio_1 = __importDefault(require('cheerio'));
const axios_1 = __importDefault(require('axios'));
const getCodeforcesProblem = ({ contest, problem }) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const url = `https://codeforces.com/contest/${contest}/problem/${problem}`;
    const submitUrl = `https://codeforces.com/contest/${contest}/submit/${problem}`;
    try {
      const { data } = yield axios_1.default.get(url);
      const $ = cheerio_1.default.load(data);
      const statement = $('.problem-statement');
      const header = statement.find('.header');
      const samples = statement.find('.sample-test').children();
      const tests = [];
      for (let i = 0; i < samples.length; i += 2) {
        const input =
          (_a = samples.eq(i).find('pre').html()) === null || _a === void 0
            ? void 0
            : _a.replace(/<br>/g, '\n').replace(/&#xA0;/g, '\xa0');
        const output =
          (_b = samples
            .eq(i + 1)
            .find('pre')
            .html()) === null || _b === void 0
            ? void 0
            : _b.replace(/<br>/g, '\n').replace(/&#xA0;/g, '\xa0');
        tests.push({ input, output });
      }
      const textArray = (obj) => {
        return obj
          .map((_, item) => {
            return $(item).text();
          })
          .toArray();
      };
      const problem = {
        title: header.find('.title').text().trim(),
        timeLimit: header.find('.time-limit').contents().last().text(),
        memoryLimit: header.find('.memory-limit').contents().last().text(),
        inputFile: header.find('.input-file').contents().last().text(),
        outputFile: header.find('.output-file').contents().last().text(),
        statement: {
          text: textArray(statement.children().eq(1).children()),
          inputSpec: textArray(statement.find('.input-specification > p')),
          outputSpec: textArray(statement.find('.output-specification > p')),
          tests,
          notes: textArray(statement.find('.note > p')),
        },
        url: url,
        submitUrl: submitUrl,
      };
      return problem;
    } catch (e) {
      throw new Error(e);
    }
  });
exports.getCodeforcesProblem = getCodeforcesProblem;
//# sourceMappingURL=codeforces.js.map
