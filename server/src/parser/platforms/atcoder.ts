import cheerio from 'cheerio';
import axios from 'axios';

const getAtCoderProblem = async ({
    contest,
    problem,
}: {
    contest: string;
    problem: string;
}): Promise<unknown> => {
    const url = `https://atcoder.jp/contests/${contest}/tasks/${problem}`;
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        console.log($);

        return {
            url: url,
        };
    } catch (err) {
        throw new Error(err);
    }
};

export { getAtCoderProblem };
