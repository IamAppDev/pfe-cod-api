/*
module.exports = (err, req, res, next) => {

    winston.error(err.message, err);
    res.status(500).send('Something failed.');

};*/

module.exports = (logger) => {
    return (err, req, res, next) => {
        logger.error(err.message, err);
        res.sendStatus(500);
    };
};