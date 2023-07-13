const multer = require('multer');
const express = require('express');
const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}-${file.originalname}`);
  },
});

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed.'));
  }
};

const upload = multer({ storage: storage, fileFilter: imageFilter });

app.post('/uploadCategoryImage', upload.single('categoryImg'), (req, res) => {
  if (!req.file) {
    
    res.status(400).json({ error: 'No file uploaded' });
  } else {
    console.log(req.file);
    const imageUrl = `${req.protocol}://${req.get('host')}/${req.file.originalname}`;
    res.status(200).json({ imageUrl });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
