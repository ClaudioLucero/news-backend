// middlewares/validateNews.js
import { check, validationResult } from 'express-validator';

export const validateNews = [
    check('title').notEmpty().withMessage('Title is required'),
    check('description').notEmpty().withMessage('Description is required'),
    check('author').notEmpty().withMessage('Author is required'),
    check('category')
        .isIn(process.env.NEWS_CATEGORIES.split(','))
        .withMessage('Invalid category provided'),
    check('imageUrl').optional().isURL().withMessage('Image URL must be a valid URL'),
];

export const validateResults = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array(),
        });
    }
    next();
};
