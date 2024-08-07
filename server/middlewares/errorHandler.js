function errorHandler(err, req, res, next) {
    // console.log(err, 'error di error handler');

    let status = err.status || 500;
    let message = err.message || "Internal server error"

    switch (err.name) {
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            status = 400
            message = err.errors[0].message
            break;
        case "Unauthenticated":
        case "JsonWebTokenError":
            status = 401
            message = "Invalid Token"
            break;
        case "Forbidden":
            status = 403
            message = "You are not authorized"
            break;
        case "Recipe not found":
            status = 404
            message = `Recipe not found`
            break;
        case "Saved Recipe not found":
            status = 404
            message = `Saved Recipe not found`
            break;
        case "Already_subscribe":
            status = 400
            message = `You already subscribed`
            break;
    }
    console.log(status);
    res.status(status).json({ message: message });
}

module.exports = errorHandler