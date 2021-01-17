import axios from 'axios';
import cheerio from 'cheerio';

const getKattisProblem = async (id: string): Promise<unknown> => {
    const url = `https://open.kattis.com/problems/${id}`;
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        console.log($, data);
        return {
            url: url,
        };
    } catch (err) {
        throw new Error(err);
    }
};

export { getKattisProblem };
