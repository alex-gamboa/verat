const db = require('./db')


async function getConfigurations() {

    const result = await db.ConfigurationModel.find()

    return result
}

async function insertConfiguration(config) {

    let dbConfig = db.getConfigurationInstance(config)

    const result =
        await dbConfig
            .validate()
            .then(_ => dbConfig.save())
            .catch(e => {
                console.log(e);
            })

    return result
}

async function updateConfiguration(config) {

    const result =
        await db.ConfigurationModel
            .updateOne({ _id: config._id }, config)

    return result
}

module.exports = {
    getConfigurations: getConfigurations,
    insertConfiguration: insertConfiguration,
    updateConfiguration: updateConfiguration
}
