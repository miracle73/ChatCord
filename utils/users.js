const users = []

const joinUsers = (id, username, room) => {
    const user = { id, username, room }
    users.push(user)

    return user

}

const getCurrentUsers = (id) => {
    console.log(id)
    const user = users.find((user) => user.id === id)
    if (!user) {
        return "it is not here"
    }
    return user
}
const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)
    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}
const getRoomUsers = (room) => {
    const roomUsers = users.filter((user) => user.room === room)
    return roomUsers
}

module.exports = { joinUsers, getCurrentUsers, removeUser, getRoomUsers }