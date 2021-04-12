import { getCodeforcesProblem } from './platforms/codeforces';
import { getAtCoderProblem } from './platforms/atcoder';
import { getKattisProblem } from './platforms/kattis';

const platforms = ['Codeforces', 'HackerRank', 'CodeChef', 'AtCoder'];

const parser = (platform: string, id: string): Promise<unknown> | undefined => {
  if (!platforms.includes(platform))
    throw new Error('Invalid contest platform');

  const match = id.match(/([0-9]+)([A-Z][A-Z0-9]*)$/);

  if (!match) throw new Error('Invalid Codeforces problem ID');

  const contest = match[1],
    problem = match[2];

  switch (platform) {
    case 'Codeforces':
      return getCodeforcesProblem({ contest, problem });
    case 'AtCoder':
      return getAtCoderProblem({ contest, problem });
    case 'Kattis':
      return getKattisProblem(problem);
    default:
      return undefined;
  }
};

export default parser;
