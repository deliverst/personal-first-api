const logger = (err, req, res, next) => {
    console.log(req.method)
    console.log(req.body)
    console.log(req.path)
    next()
};

module.exports = logger