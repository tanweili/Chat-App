const users = []

addUser = (id, username, roomname) => {
    const user = {id, username, roomname}
    users.push(user)
    return user
}

getUser = (id) => {
    return users.find(user => user.id === id)
}

getRoomUsers = (roomname) => {
    return users.filter(user => user.roomname === roomname)
}

module.exports = {
    users,
    addUser,
    getUser,
    getRoomUsers
}