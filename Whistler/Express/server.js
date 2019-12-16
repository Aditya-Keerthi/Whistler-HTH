const express = require('express');
const app = express();
PORT = '3001'
lstOfPosts = {
    file: 'https://google.com'
}

app.post('/', (req, res, next) => {
    let link = (`https://gateway.ipfs.io/ipfs/${req.body}`);
    const methodName = 'file';
    let currentPost = object.size(lstOfPosts);
    let postNumber = currentPost + 1; 
    keyName = (`${methodName}${postNumber}`);
    lstOfPosts.keyName = link;
    res.json(lstOfPosts);
});

app.listen(PORT,() => {
    console.log('Listening...')
})