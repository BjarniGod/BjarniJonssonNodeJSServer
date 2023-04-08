const express = require("express");
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'images')));



app.get('/:filename', (req, res, next) => {
    EventLogs(`Attempted to access ${req.url}`);
    next();
    const filenameWithoutExt = path.basename(req.params.filename, path.extname(req.params.filename));
    const filePathWithoutExt = path.join(__dirname, 'images', `${filenameWithoutExt}${path.extname(req.params.filename)}`);
    const extnameWithoutDot = path.extname(req.params.filename).slice(1);
    let contentTypeWithoutDot = 'image/jpeg';
    switch (extnameWithoutDot) {
        case 'png':
            contentTypeWithoutDot = 'image/png';
            break;
        case 'jpg':
            contentTypeWithoutDot = 'image/jpeg';
            break;
    }
    res.sendFile(filePathWithoutExt, { headers: { 'Content-Type': contentTypeWithoutDot } });
  });



app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

function EventLogs(event) {
  console.log(`Event: ${event}`);
}

EventLogs(`Server started on port ${PORT}`);
