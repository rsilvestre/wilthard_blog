// Error handling middleware

exports.errorHandler = function(err, req, res, next) {
    "use strict";
    console.error(err.message);
    console.error(err.stack);
    res.status(500);
    res.render('error_template', { title: "Internal Error", message: 'Internal Error', error: err });
};
