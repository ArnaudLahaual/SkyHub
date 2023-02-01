/* eslint-disable import/prefer-default-export */
/* eslint-disable arrow-body-style */

/**
 *  on trouve le post voulu dans la liste des posts
 * @param {Array} posts - tous les posts
 * @param {string} searchId - l'id du post recherché
 * @return {Object} - Le post trouvé
 */
 export function findPost(posts, searchId) {
  const post = posts.find((testedPost) => {
    return testedPost.id == searchId;
  });
  return post;
}
