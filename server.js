const express = require('express');
const { getLinkPreview, getPreviewFromContent } = require('link-preview-js');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/link-preview', async (req, res) => {
  try {
    const { content } = req.query;
    console.log(content);

    const result = await getLinkPreview(content, {
      imagesPropertyType: 'og', // fetches only open-graph images
      headers: {
        'user-agent': 'googlebot', // fetches with googlebot crawler user agent
      },
      timeout: 1000,
    });
    console.log('getLinkPreview', result);

    res.send(result);
  } catch (error) {
    console.log('error', error);
    res.send(error);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
