import express from 'express';

const app = express();

app.get('/',async (req, res, next) => {

});

app.listen(4000, () => console.log('Server started.'));
