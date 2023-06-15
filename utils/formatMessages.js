const moment = require('moment')

const formatMessages = (username, text, roomUsers) => {
    return {
        username,
        text,
        time: moment().format("h:mm a"),
        roomUsers
    }
}

module.exports = formatMessages