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

module.exports = { joinUsers, getCurrentUsers }