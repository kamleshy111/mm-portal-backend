import mongoose from 'mongoose';
import { ApiError } from '../../utils/apiError.js';

export const validateObjectId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next(new ApiError(400, 'Invalid ID format.'));
    }
    next();
};
