// Remove password field from user object and send response to the user
exports.userObject = (user) => { 
  return {
    name: user.name,
    userId: user.userId,
    email: user.email,
    articlesCreated: user.articlesCreated,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
