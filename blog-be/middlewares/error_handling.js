const errorLogger = (err, req, res, next) => {
    console.log( `error ${err.message}`) 
    next(err)
  }

const errorHandling = (err, req, res, next) => {
    if(err.message && err.status) {
        res.status(err.status).json({
            message: err.message
        })
    } else 
        res.status(500).json({
            message: 'Internal server error'
        })
}

module.exports = { errorLogger, errorHandling }