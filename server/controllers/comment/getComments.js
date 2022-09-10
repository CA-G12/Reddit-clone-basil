const { getCommentsQuery } = require('../../database/queries');

const getComments = (req, res) => {
  const { id } = req.params;
  getCommentsQuery(id)
    .then(({ rows }) => res.json(rows))
    .catch(() => res.status(500).json({ error: 'somthing went wrong' }));
};

module.exports = getComments;
