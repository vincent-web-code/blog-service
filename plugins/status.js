module.exports = (status = 200, data = null, message = '') => {
    return {
        code: status,
        message: message,
        data: data
    }
}