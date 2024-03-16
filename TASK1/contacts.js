const fs = require("fs").promises
const path = require("path")



 const contactsPath = path.join(__dirname, "./db/contacts.json")



async function listContacts() {
   try{
        const list = await fs.readFile(contactsPath, "utf-8")
        console.table(JSON.parse(list))
        return JSON.parse(list)
   } catch(err){
        console.log(err)
   }
  }
  
async function getContactById(contactId) {
    try{
        const list = await fs.readFile(contactsPath, "utf-8")
        const parsedList = JSON.parse(list)
        const contact = parsedList.find(e => e.id === contactId)
        console.log(contact)
   } catch(err){
        console.log(err)
   }
  }
  
async function removeContact(contactId) {
    try{
        const list = await fs.readFile(contactsPath, "utf-8")
        let parsedList = JSON.parse(list)
        const contactIndex = parsedList.findIndex(e => e.id === contactId)
        if(contactIndex === -1){
            console.log("Contact not found")
            return
        }
        const contactName = parsedList[contactIndex].name
        parsedList = parsedList.filter(e => e.id !== contactId)
        await fs.writeFile(contactsPath, JSON.stringify(parsedList), "utf-8")
        console.log(`Contact ${contactName} with id ${contactId} removed`);
        return parsedList
        
    } catch(err){
        console.log(err)
    }
  }
  
  async function addContact(name, email, phone) {
    try {
      const list = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
      const newContact = {
        id: new Date(),
        name,
        email,
        phone,
      };
      list.push(newContact);
      await fs.writeFile(contactsPath, JSON.stringify(list), "utf-8");
  
      console.log("New contact added",newContact.name);
      return list;
  
    } catch(error) {
      console.log(error)
    }
  };

  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
  }