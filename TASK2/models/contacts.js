const fs = require('fs').promises
const path = require("path")
// const { nanoid } = require("nanoid");

const contactPath = path.join(__dirname, "./contacts.json")

const listContacts = async () => {
  try{
    const list = JSON.parse( await fs.readFile(contactPath, "utf-8"))
    console.log(list)
    return list
  } catch(error) {
    console.log(error.message)
  }
}

const getContactById = async (contactId) => {
  try{
    const list = JSON.parse( await fs.readFile(contactPath, "utf-8"))
    const contact = list.find(({id}) => id === contactId)
    console.log(contact)
    return contact
  } catch(error) {
    console.log(error.message)
  }
}

const removeContact = async (contactId) => {
  try{
    const list = JSON.parse( await fs.readFile(contactPath, "utf-8"))
    const contactIndex = list.findIndex(({id}) => id === contactId)
    if(contactIndex === -1){
      console.log("Contact doesn`t exist")
      return
    }
    const contact = list[contactIndex].name
    const filteredList = list.filter(({id}) => id !== contactId)
    await fs.writeFile(contactPath, JSON.stringify(filteredList), "utf-8")

    console.log("Deleted contact : ", contact)
    return filteredList
  } catch(error) {
    console.log(error.message)
  }
}

const addContact = async (body) => {
  try{
    const list = JSON.parse( await fs.readFile(contactPath, "utf-8"))
    const { email, name ,phone} = body
    const newContact = {
      id : new Date(),
      name : name,
      email : email,
      phone : phone
    }
    list.push(newContact)
    await fs.writeFile(contactPath, JSON.stringify(list), "utf-8")
    console.log("Added contact : ", newContact )
    return list
  } catch(error) {
    console.log(error.message)
  }
}

const updateContact = async (contactId, body) => {
  try{
    const list = JSON.parse( await fs.readFile(contactPath, "utf-8"))
    const contactIndex = list.findIndex(({id}) => id === contactId)
    if(contactIndex === -1){
      console.log("Contact doesn`t exist")
      return
    }
    const contact = list[contactIndex]
    const { email, name , phone} = body
    if(email) contact.email = email
    if(name) contact.name = name
    if(phone) contact.phone = phone

    await fs.writeFile(contactPath, JSON.stringify(list), "utf-8")
    console.log("Updated contact : ", contact)
    return list
  } catch(error) {
    console.log(error.message)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
