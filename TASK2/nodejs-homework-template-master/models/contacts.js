const fs = require('fs').promises
const path = require("path")
// const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./contacts.json")

const listContacts = async () => {
  try{
    const list = JSON.parse( await fs.readFile(contactsPath, "utf-8"))
    console.table(list)
    return list
  } catch (error){
    console.log(error.message)
  }
}

const getContactById = async (contactId) => {
  try{
    const list = JSON.parse( await fs.readFile(contactsPath, "utf-8"))
    const user = list.find(e => e.id === contactId)
    console.table(user)
    return user
  } catch (error){
    console.log(error.message)
  }
}

const removeContact = async (contactId) => {
  try{
    const list = JSON.parse( await fs.readFile(contactsPath, "utf-8"))
    const userIndex = list.findIndex( e => e.id === contactId)
    if(userIndex === -1){
      return  "This user doesn`t exist"
    } 
      const filteredList = list.filter(e => e.id !== contactId)
      await fs.writeFile(contactsPath, JSON.stringify(filteredList), "utf-8")
      console.log(filteredList)
      return filteredList
   
  } catch (error){
    console.log(error.message)
  }
}

const addContact = async (body) => {
  try{
    const list = JSON.parse( await fs.readFile(contactsPath, "utf-8"))
   const newContact = {
    id : new Date(),
    name : body.name,
    phone : body.phone,
    email : body.email,
   }
   list.push(...list, newContact)
   await fs.writeFile(contactsPath, JSON.stringify(list), "utf-8")
   console.log(`Added new Contact ${newContact.name}`)
   return list
   
  } catch (error){
    console.log(error.message)
  }
}

const updateContact = async (contactId, body) => {
  try {
    const list = JSON.parse( await fs.readFile(contactsPath, "utf-8"))
    const updateContactIndex = list.findIndex(e => e.id === contactId)
    const contactToUpdate = list[updateContactIndex]
    const {name, email, phone} = body
    if(name) {
      contactToUpdate.name = name
    }
    if(email) {
      contactToUpdate.email = email
    }
    if(phone) {
      contactToUpdate.phone = phone
    }

    await fs.writeFile(contactsPath, JSON.stringify(list), "utf-8")
    console.log(`Updated contact ${contactToUpdate.name}`)
    return contactToUpdate
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
