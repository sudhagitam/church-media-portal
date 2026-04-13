const express = require('express');
const multer = require('multer');
const router = express.Router();
const { uploadToDrive, listVideos } = require('../services/googleDriveService');
const authMiddleware = require('../middleware/authMiddleware');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 500 * 1024 * 1024 }
});

router.get('/', async (req, res) => {
  try {
    const videos = await listVideos();
    res.json({ videos });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/upload', authMiddleware, upload.single('video'), async (req, res) => {
  try {
    const { category } = req.body;
    const result = await uploadToDrive(req.file, category || 'Sermons');
    res.json({ success: true, file: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
