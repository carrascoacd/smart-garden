/**
 * GET /
 * Home page.
 */
exports.getIndex = function(req, res) {
  res.json({"date" : Date.now()});
};

/**
 * POST /
 * Home page.
 */
exports.postIndex = function(req, res) {
  res.json({"date" : Date.now()});
};