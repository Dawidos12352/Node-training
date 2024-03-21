const fs = require("fs").promises
const path = require("path")

const contactsPath = path.join(__dirname, "./db/contacts.json")

async function listContacts() {
   try{
    const list = JSON.parse(await fs.readFile(contactsPath, "utf-8"))
    console.table(list)
    return list

   } catch(error) {
    console.log(error)
   }
  }
  
async function getContactById(contactId) {
    try{
        const list = JSON.parse( await fs.readFile(contactsPath, "utf-8"))
        const contact = list.find(e => e.id === contactId)
        console.log(contact)
        return contact
      
       } catch(error) {
        console.log(error)
       }
  }
  
async function removeContact(contactId) {
    try{
        const list = JSON.parse( await fs.readFile(contactsPath, "utf-8"))
        const contactIndex = list.findIndex(e => e.id === contactId)
        if(contactIndex === -1){
            console.log("Contact doesn`t exist")
            return 
        }

        const contactName = list[contactIndex].name
        const parsedList = list.filter(e => e.id !== contactId)
        await fs.writeFile(contactsPath, JSON.stringify(parsedList), "utf-8")
        console.log(`Deleted contact ${contactName}`)
        return parsedList
        
        
      
       } catch(error) {
        console.log(error)
       }
  }
  
async function addContact(name, email, phone) {
    try{
        const list = JSON.parse( await fs.readFile(contactsPath, "utf-8"))
        const newContact = {
            id: new Date(),
            name,
            phone,
            email,
        }
        list.push(newContact)
        const addedContact = list[list.length - 1]
        await fs.writeFile(contactsPath, JSON.stringify(list), "utf-8")
        
        console.log(`Added contact : ${JSON.stringify(addedContact)}`)
        return list
        
       } catch(error) {
        console.log(error)
       }
  }

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
  }