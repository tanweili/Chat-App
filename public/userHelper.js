const users = []

addUser = (id, username, roomname) => {
    const user = {id, username, roomname}
    users.push(user)
}

getUser = (id) => {
    return users.find(user => user.id === id)
}

deleteUser = (id) => {
    const index = users.findIndex(user => user.id === id)
    if (index !== -1) {
        users.splice(index, 1)[0]
        //console.log("USER DELETED")
    }
}

getRoomUsers = (roomname) => {
    return users.filter(user => user.roomname === roomname)
}

module.exports = {
    users,
    addUser,
    getUser,
    deleteUser,
    getRoomUsers
}