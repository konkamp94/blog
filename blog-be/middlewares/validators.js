const requiredFields = (fields) => (req, res, next) => {
    const errors = [];
    fields.forEach(field => {
        if (!req.body[field]) {
            errors.push(field);
        }
    });
    if (errors.length) {
        return res.status(400).json({
            message: `The following fields are required: ${errors.join(', ')}`
        });
    }
    next();
}

module.exports = requiredFields