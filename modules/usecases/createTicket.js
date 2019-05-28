const mongoAdapter = require('../db/mongo_db_adapter')

async function execute(ticket){
    await
        mongoAdapter
            .insertTicket(ticket)
            .then(r => console.log(r))
            .catch(e => {
                for (error in e.errors){
                    console.log(e.errors[error].message);
                }
            })
}

execute({
});
