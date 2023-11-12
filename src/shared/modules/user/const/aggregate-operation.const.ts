const AGREGATE_USERS_OPERATIONS = {
  ADD_USER_ID: {
    $addFields: {
      id: { $toString: '$_id' }
    }
  }
};

export default AGREGATE_USERS_OPERATIONS;

