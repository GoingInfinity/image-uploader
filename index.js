const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const app = express();

const PORT = 3000;

app.use(express.static('dist'));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());
app.use('/public', express.static(path.join(__dirname, '/public')));

app.post('/upload', (req, res) => {
  const imageFile = req.files.imgFile;

  imageFile.mv(`${__dirname}/public/${req.body.imgName}`, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.json({ file: `public/${req.body.imgName}` });
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));

module.exports = app;
