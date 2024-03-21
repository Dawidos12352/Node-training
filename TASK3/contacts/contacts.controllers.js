const {listContacts, } = require("./contacts.service")

const listContactsHandler = async (_, res) => {
    try{
        const contacts = await listContacts();
        console.log(contacts)
        return res.status(200).json({contacts})
    } catch(error) {
        console.error(error)
        return res.status(500).json({error : "Server error!"})
    }
}


module.exports ={
    listContactsHandler,
    
}