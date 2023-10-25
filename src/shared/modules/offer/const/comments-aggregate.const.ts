import { SortType } from '../../../types/sort-type.enum.js';

const AGREGATE_OPERATIONS = {
  COMMENTS_LOOKUP: {
    $lookup: {
      from: 'comments',
      localField: '_id',
      foreignField: 'offerId',
      as: 'comments'
    }
  },
  USER_LOOKUP: {
    $lookup: {
      from: 'user',
      localField: 'userId',
      foreignField: '_id',
      as: 'userId',
    }
  },
  ADD_COMMENTS_INFO_FIELDS: {
    $addFields: {
      commentsCount: { $size: '$comments' },
      rating:  { $round: [{ $avg: '$comments.rating' }, 1] }
    }
  },
  DELETE_COMMENTS_FIELD:{
    $unset: 'comments'
  },
  UNWIND_USER: {
    $unwind: {
      path: '$userId',
      preserveNullAndEmptyArrays: true,
    }
  },
  SORT_DOWN: {
    $sort: { createdDate: SortType.Down }
  },
  SORT_UP: {
    $sort: { createdDate: SortType.Up }
  }
};

export default AGREGATE_OPERATIONS;

