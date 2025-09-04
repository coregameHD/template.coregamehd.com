'use strict';

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

// View engine setup
app.set('views', path.join(ROOT, 'views'));
app.set('view engine', 'ejs');

// Serve static files from the public directory
app.use(express.static(path.join(ROOT, 'public')));

// Serve assets from node_modules via a vendor path
app.use('/vendor/tom-select', express.static(path.join(ROOT, 'node_modules', 'tom-select', 'dist')));
app.use('/vendor/tabler', express.static(path.join(ROOT, 'node_modules', '@tabler', 'core', 'dist')));
app.use('/vendor/flatpickr', express.static(path.join(ROOT, 'node_modules', 'flatpickr', 'dist')));
app.use('/vendor/fontawesome', express.static(path.join(ROOT, 'node_modules', '@fortawesome', 'fontawesome-free')));

// Serve static files (CSS/JS/assets if any). Also resolves .html by path when requested directly.
app.use(express.static(ROOT, { extensions: ['html'] }));

// Top-level routes rendered via EJS
app.get('/', (req, res) => res.render('index'));
app.get('/blog', (req, res) => res.render(path.join('blog', 'index')));
app.get('/visualnovel', (req, res) => res.render(path.join('visualnovel', 'index')));
app.get('/nihongo', (req, res) => res.render(path.join('nihongo', 'index')));
app.get('/nihongo/grammar', (req, res) => res.render(path.join('nihongo', 'grammar')));
app.get('/nihongo/katakana', (req, res) => res.render(path.join('nihongo', 'katakana')));
app.get('/nihongo/idioms', (req, res) => res.render(path.join('nihongo', 'idioms')));
app.get('/nihongo/yojijukugo', (req, res) => res.render(path.join('nihongo', 'yojijukugo')));
app.get('/nihongo/jlpt', (req, res) => res.render(path.join('nihongo', 'jlpt')));
app.get('/nihongo/jtest', (req, res) => res.render(path.join('nihongo', 'jtest')));

// 404 handler
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

app.listen(PORT, () => {
  console.log(`Kagami Template site running at http://localhost:${PORT}`);
});