const auth = async (req, res, next) => {
    console.log('Auth work')
    next()
}

module.exports = auth
