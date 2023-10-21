import { SortType } from '../../../types/sort-type.enum.js';

export const COMMENTS_AGGREGATE = [
  {
    $lookup: {
      from: 'comments',
      localField: '_id',
      foreignField: 'offerId',
      as: 'comments'
    }
  },

  {
    $addFields: {
      rating:  { $round: [{ $avg: '$comments.rating' }, 1] }
    }
  },

  {
    $addFields: {
      commentsCount: { $size: '$comments' }
    }
  }
];

export const SORT_DOWN = {
  $sort: { createdDate: SortType.Down }
};

export const SORT_UP = {
  $sort: { createdDate: SortType.Up }
};

export const DELETE_COMMENTS_FIELD = {
  $unset: 'comments'
};

