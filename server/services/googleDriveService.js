const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');
const path = require('path');
const fs = require('fs');
const { Readable } = require('stream');

const creds = JSON.parse(fs.readFileSync(path.join(__dirname, '../credentials.json')));
const { client_id, client_secret, redirect_uris } = creds.installed ?? creds.web;

const oauth2Client = new OAuth2Client(client_id, client_secret, redirect_uris[0]);
const token = JSON.parse(fs.readFileSync(path.join(__dirname, '../token.json')));
oauth2Client.setCredentials(token);

const drive = google.drive({ version: 'v3', auth: oauth2Client });

async function getOrCreateFolder(name, parentId) {
  const existing = await drive.files.list({
    q: `name='${name}' and mimeType='application/vnd.google-apps.folder' and '${parentId}' in parents`,
    fields: 'files(id, name)'
  });
  if (existing.data.files.length > 0) return existing.data.files[0].id;
  const folder = await drive.files.create({
    requestBody: {
      name,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [parentId]
    },
    fields: 'id'
  });
  return folder.data.id;
}

async function uploadToDrive(file, category = 'Sermons') {
  const folderId = await getOrCreateFolder(category, process.env.GOOGLE_DRIVE_FOLDER_ID);
  const bufferStream = new Readable();
  bufferStream.push(file.buffer);
  bufferStream.push(null);
  const response = await drive.files.create({
    requestBody: {
      name: file.originalname,
      mimeType: file.mimetype,
      parents: [folderId]
    },
    media: { mimeType: file.mimetype, body: bufferStream },
    fields: 'id, name, webViewLink'
  });
  await drive.permissions.create({
    fileId: response.data.id,
    requestBody: { role: 'reader', type: 'anyone' }
  });
  return {
    id: response.data.id,
    name: response.data.name,
    viewLink: response.data.webViewLink,
    category
  };
}

async function listVideos() {
  const response = await drive.files.list({
    q: `'${process.env.GOOGLE_DRIVE_FOLDER_ID}' in parents and trashed=false`,
    fields: 'files(id, name, webViewLink, createdTime, mimeType)',
    orderBy: 'createdTime desc'
  });
  return response.data.files;
}

module.exports = { uploadToDrive, listVideos };
