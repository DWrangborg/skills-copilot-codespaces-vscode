// Create web server
// Create routes
// Create comment model
// Create comment controller
// Create comment service

// Path: comment.js
const express = require('express');
const router = express.Router();

const CommentController = require('../controllers/comment');

router.get('/', CommentController.getAllComments);
router.post('/', CommentController.createComment);
router.put('/:commentId', CommentController.updateComment);
router.delete('/:commentId', CommentController.deleteComment);

module.exports = router;

// Path: comment.js
const mongoose = require('mongoose');
const Comment = require('../models/comment');

const CommentService = {
  getAllComments: async () => {
    try {
      const comments = await Comment.find();
      return comments;
    } catch (error) {
      throw new Error(error);
    }
  },

  createComment: async (comment) => {
    try {
      const newComment = new Comment(comment);
      await newComment.save();
      return newComment;
    } catch (error) {
      throw new Error(error);
    }
  },

  updateComment: async (commentId, updatedComment) => {
    try {
      const updatedComment = await Comment.findByIdAndUpdate(commentId, updatedComment, { new: true });
      return updatedComment;
    } catch (error) {
      throw new Error(error);
    }
  },

  deleteComment: async (commentId) => {
    try {
      await Comment.findByIdAndDelete(commentId);
    } catch (error) {
      throw new Error(error);
    }
  }
};

module.exports = CommentService;

// Path: comment.js
const CommentService = require('../services/comment');

const CommentController = {
  getAllComments: async (req, res) => {
    try {
      const comments = await CommentService.getAllComments();
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createComment: async (req, res) => {
    try {
      const newComment = await CommentService.createComment(req.body);
      res.status(201).json(newComment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateComment: async (req, res) => {
    try {
      const updatedComment = await CommentService.updateComment(req.params.commentId, req.body);
      res.status(200).json(updatedComment);
    } catch (