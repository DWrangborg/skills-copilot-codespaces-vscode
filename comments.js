// Create web server
// http://localhost:3000/comments
// http://localhost:3000/comments/1

const express = require('express');
const app = express();
const port = 3000;

const comments = [
    { id