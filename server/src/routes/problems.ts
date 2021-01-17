import express, { Request, Response } from 'express';
import parser from '../parser';

const router = express.Router();

// @type GET
// @desc Fetch problem information from a contest website
// @route /api/problems
// @access public
router.get('/', async (req: Request, res: Response) => {
    const platform: string = req.query.platform as string,
        pid: string = req.query.pid as string;

    if (!platform || !pid)
        return res
            .status(500)
            .send('Must provide a valid platform and problem ID.');

    try {
        const data = await parser(platform, pid);
        return res.status(200).send(data);
    } catch (err) {
        return res.status(500).send('Error fetching problem data.');
    }
});

export default router;
