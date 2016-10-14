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
  if (!req.body) return res.sendStatus(400)
  res.json({"date" : Date.now(), "name": req.body.name || "unnamed"});
};