import * as SecureStore from 'expo-secure-store';

//GET
export const getContacts = async (limit = 1) => {
    let contacts = JSON.parse(await SecureStore.getItemAsync('contacts'));

    if(contacts != null)
        return contacts.slice(0, limit);
        
    return null;
}

export const getMessagesContact = async (contactId) => {
    return JSON.parse(await SecureStore.getItemAsync(contactId)).Messages;
}

//INSERT
export const addContact = async (contact) => {
    let contacts = JSON.parse(await SecureStore.getItemAsync('contacts'));


    if(contacts != null) {
        if(contacts.filter(c => c.ContactId == contact.ContactId) != []) {
            let tmp = [];

            tmp = contacts.filter(c => c.ContactId != contact.ContactId);
    
            tmp.unshift(contact);

            contacts = tmp;
        } else {
            if(contacts.length >= 9) {
                contacts.shift();
            }
            
            contacts.unshift(contact);
        }
    } else {
        contacts = [];
        contacts.unshift(contact);
    }

    await SecureStore.setItemAsync("contacts", JSON.stringify(contacts));
}

export const addMessage = async (message, contact) => {
    let contactMessages = await SecureStore.getItemAsync(contact.ContactId);

    if(contactMessages == null) {
        contactMessages = {Pseudo: contact.Pseudo, Image: contact.Image, Messages: [{Message: message.Message, ExpediteurId: message.ExpediteurId, CreatedDate: message.CreatedDate}]}
    } else {
        let limitMessageSize = 2000 - contactMessages.length - JSON.stringify(JSON.parse(contactMessages).Messages).length;
        
        contactMessages = JSON.parse(contactMessages)
        let messages = contactMessages.Messages;
        
        messages.push({Message: message.Message, ExpediteurId: message.ExpediteurId, CreatedDate: message.CreatedDate});

        while(JSON.stringify(messages).length >= limitMessageSize) {
            messages.splice(-1);
        }

        contactMessages.Messages = messages;
    }

    await SecureStore.setItemAsync(contact.ContactId, JSON.stringify(contactMessages));
    updateLastMessageContact(message.Message, message.CreatedDate, contact.ContactId);
}


//UPDATE
export const updateLastMessageContact = async (message, createdDate, contactId) => {

    let contacts = JSON.parse(await SecureStore.getItemAsync('contacts'));

    if(contacts != null) {
        let newContacts = contacts.filter(c => c.ContactId != contactId);

        let newContact = contacts.filter(c => c.ContactId == contactId).shift();
    
        newContact.Message = message;
        newContact.CreatedDate = createdDate;
    
        newContacts.unshift(newContact);
        await SecureStore.setItemAsync('contacts', JSON.stringify(newContacts));
    }
}

export const updateMessagesContact = async (messages, contactId) => {
    let limit = 2000;

    let _messages = messages.Messages;

    while(JSON.stringify(_messages).length >= limit) {
        _messages.splice(-1);
    }

    messages.Messages = _messages;
    
    await SecureStore.setItemAsync(contactId, JSON.stringify(messages));
}