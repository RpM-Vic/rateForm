import {Router} from 'express'
import path from 'path';
import mime from 'mime-types';
import express from 'express';

const __dirname=process.cwd()

export const pages=Router()

pages.use(express.static(path.join(__dirname, 'dist')));

pages.use(express.static(path.join(__dirname,
  'dist'), {
  setHeaders: (res, path) => {
    res.setHeader('Content-Type', mime.lookup(path) || 'application/octet-stream');
  }
}));

pages.get('/allrates', (req, res) => {
  try {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  } catch (err) {
    res.status(500).send('Error loading application');
  }
});

// pages.get('*', (req, res) => {
//   try {
//     res.sendFile(path.join(__dirname, 'dist', 'index.html'));
//   } catch (err) {
//     res.status(500).send('Error loading application');
//   }
// });

//e\node_modules\path-to-regexp\dist\index.js:73
//throw new TypeError(`Missing parameter name at ${i}: ${DEBUG_URL}`);
// pages.get('*',
//   async(req, res) => {
//     const filePath = path.join(__dirname, 'dist', `index.html`);
//     res.sendFile(filePath) 
//   }
// );