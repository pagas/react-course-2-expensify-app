const express = require('express')
const path = require('path');
const app = express()
const port = 3000
const publicPath = path.join(__dirname, '..', 'public');

// serve all assets from the public directory
app.use(express.static(publicPath));

// process all of unhandled requests, and redirect to index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
