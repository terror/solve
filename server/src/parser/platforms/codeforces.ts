/* eslint-disable @typescript-eslint/no-explicit-any */
import cheerio from 'cheerio';
import axios from 'axios';

import { ICodeforcesProblem, ICodeforcesTest } from '../interfaces';

const getCodeforcesProblem = async ({
  contest,
  problem,
}: {
  contest: string;
  problem: string;
}): Promise<unknown> => {
  const url = `https://codeforces.com/contest/${contest}/problem/${problem}`;
  const submitUrl = `https://codeforces.com/contest/${contest}/submit/${problem}`;
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const statement = $('.problem-statement');
    const header = statement.find('.header');
    const samples = statement.find('.sample-test').children();

    const tests: ICodeforcesTest[] = [];
    for (let i = 0; i < samples.length; i += 2) {
      const input = samples
        .eq(i)
        .find('pre')
        .html()
        ?.replace(/<br>/g, '\n')
        .replace(/&#xA0;/g, '\xa0');
      const output = samples
        .eq(i + 1)
        .find('pre')
        .html()
        ?.replace(/<br>/g, '\n')
        .replace(/&#xA0;/g, '\xa0');
      tests.push({ input, output });
    }

    const textArray = (obj: any): any[] => {
      return obj
        .map((_: number, item: any) => {
          return $(item).text();
        })
        .toArray();
    };

    const problem: ICodeforcesProblem = {
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
};

export { getCodeforcesProblem };
