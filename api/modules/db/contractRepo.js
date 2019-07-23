const db = require('./db')


async function getContracts() {

    const result = await db.ContractModel.find()

    return result
}

async function getContractContacts(contractId) {

    const result = await db.ContractContactModel.find({contract: {$eq: contractId}})

    return result
}

async function insertContract(contract) {

    let dbContract = db.getContractInstance(contract)

    const result =
        await dbContract
            .validate()
            .then(_ => dbContract.save())
            .catch(e => {
                console.log(e);
            })

    return result
}

async function insertContractContact(contact) {

    let dbContact = db.getContractContactInstance(contact)

    const result =
        await dbContact
            .validate()
            .then(_ => dbContact.save())
            .catch(e => {
                console.log(e);
            })

    return result
}

async function updateContract(contract) {

    const result =
        await db.ContractModel
            .updateOne({ _id: contract._id }, contract)

    return result
}

async function updateContractContact(contact) {

    const result =
        await db.ContractContactModel
            .updateOne({ _id: contact._id }, contact)

    return result
}

module.exports = {
    getContracts: getContracts,
    getContractContacts: getContractContacts,
    insertContract: insertContract,
    insertContractContact: insertContractContact,
    updateContract: updateContract,
    updateContractContact: updateContractContact
}
