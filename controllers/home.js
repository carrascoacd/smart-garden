/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
  res.json({"date" : Date.now()});
};