const db = require('../data/db-config');

module.exports = {
    find,
    findBy,
    findById,
    create,
    update,
    remove
}

function find() {
    return db('users')
}

function findBy (filter) {
    return db('users')
    .where(filter)
    .orderBy('id')
}

function findById (id) {
    return db('users')
    .where({ id })
    .first()
}

async function create (user) {
    const [id] = await
    db('users').insert(user)
        return db('users')
        .where({ id })
        .first()
}

async function update (id, changes) {
    const count = await db('users').where({ id }).update(changes)
    if (count) {
        return db('users').where({ id }).first()
    } else {
        return Promise.resolve(null)
    }
}

function remove (id) {
    return db('users').where({ id }).del()
}