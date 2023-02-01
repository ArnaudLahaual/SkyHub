/* eslint-disable import/prefer-default-export */
/* eslint-disable arrow-body-style */

/**
 *  on trouve le session voulu dans la liste des sesssions
 * @param {Array} sessions - toutes les sessions
 * @param {string} searchId - l'id du session recherché
 * @return {Object} - La session trouvée
 */
 export function findSession(sessions, searchId) {
  const session = sessions.find((testedSession) => {
    return testedSession.id == searchId;
  });
  return session;
}
