const db = require('./db')


async function getTasks() {

    const result = await db.scheduledTaskModel.find()

    return result
}

async function insertTask(task) {

    let dbTask = db.getScheduledTaskInstance(task)

    const result =
        await dbTask
            .validate()
            .then(_ => dbTask.save())
            .catch(e => {
                console.log(e);
            })

    return result
}

async function updateTask(task) {

    const result =
        await db.scheduledTaskModel
            .updateOne({ _id: task._id }, task)

    return result
}

module.exports = {
    getTasks: getTasks,
    insertTask: insertTask,
    updateTask: updateTask
}
