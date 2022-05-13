import express from 'express';
import fs from 'fs';

const router = express.Router();

const pathRouter = `${__dirname}`;

const removeExtension = (fileName: string) => fileName.split('.').shift() ?? '';

fs.readdirSync(pathRouter).filter(file => {
    const fileWithoutExtension = removeExtension(file);
    const skipped = ['routes', 'index', 'schemas'].includes(fileWithoutExtension);
    if(!skipped){
        router.use(`/${fileWithoutExtension}`, require(`./${fileWithoutExtension}/routes.ts`)); // api_url:5000/[]
    }
})

router.get('*', (req, res) => {
    res.status(404);
    res.send({ error: 'Not found'})
})

export { router };