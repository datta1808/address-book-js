const prompt = require('prompt-sync')();
const Contact = require('./Contact.js')

let addressBookArr = new Array();

let getContact = () => {
    let firstName = prompt("Enter First Name : ");
    let lastName = prompt("Enter Last Name : ");
    let address = prompt("Enter Address : ");
    let city = prompt("Enter City : ");
    let state = prompt("Enter State : ");
    let zip = prompt("Enter Zip : ");
    let phoneNumber = prompt("Enter Phone Number : ");
    let email = prompt("Enter Email : ");
    let contactInput = null;

    try {
        contactInput = new Contact(firstName, lastName, address, city, state, zip, phoneNumber, email);
    } catch (error) {
        console.error(error);
    }
    return contactInput;
};

let countContacts = (contactsArray) => contactsArray.reduce((total, contact) => total + 1, 0);


let viewContacts = () => {
    console.log("Number of contacts in this addressbook : " + countContacts(addressBookArr));
    addressBookArr.forEach(contact => console.log(contact.toString()));
}


let addContact = (contact) => {
    let index = getindexByName(contact.firstName, contact.lastName);
    if (index == -1) {
        addressBookArr.push(contact);
        console.log("Contact Added Successfully!!");
    }
    else
        console.log("Could not add contact as Name already exists!!");
}

let getindexByName = (frstName, lstName) => {
    return addressBookArr.findIndex(contact => contact.firstName == frstName && contact.lastName == lstName);
}

let editContact = () => {
    let frstName = prompt("Enter First Name : ");
    let lstName = prompt("Enter Lastt Name : ");
    let index = addressBookArr.findIndex(contact => contact.firstName == frstName && contact.lastName == lstName);
    if (index == -1)
        console.log("Could not find the contact!!")
    else {
        addressBookArr[index] = getContact();
        console.log("Contact edited successfully!!");
    }
}

let deleteContact = () => {
    let frstName = prompt("Enter First Name : ");
    let lstName = prompt("Enter Lastt Name : ");
    let index = getindexByName(frstName, lstName);
    if (index == -1)
        console.log("Could not find the contact!!")
    else {
        console.log("Contact deleted successfully!!");
        return addressBookArr.splice(index, 1);
    }
}

let searchByCityState = (item) => {
    let contactsByItemArr = new Array();
    let itemName = prompt("Enter the " + item + " name ");
    if (item == "City")
        contactsByItemArr = addressBookArr.filter(contact => contact.city == itemName);
    else if (item == "State")
        contactsByItemArr = addressBookArr.filter(contact => contact.state == itemName);
    console.log("Number of contacts " + countContacts(contactsByItemArr));
    contactsByItemArr.forEach(contact => console.log(contact.toString()))

}

let sortContacts = () => {
    console.log("Sort By\n1. Person Name\n2. City\n3. State\n4. Zip")
    let choice = prompt("Enter your choice ");
    switch (choice) {
        case "1":
            addressBookArr.sort((c1, c2) => ((c1.firstName + c1.lastName) > (c2.firstName + c2.lastName)) ? 1 : (((c1.firstName + c1.lastName) < (c2.firstName + c2.lastName) ? -1 : 0)));
            break;
        case "2":
            addressBookArr.sort((c1, c2) => (c1.city > c2.city) ? 1 : ((c1.city < c2.city) ? -1 : 0));
            break;
        case "3":
            addressBookArr.sort((c1, c2) => (c1.state > c2.state) ? 1 : ((c1.state < c2.state) ? -1 : 0));
            break;
        case "4":
            addressBookArr.sort((c1, c2) => (c1.zip > c2.zip) ? 1 : ((c1.zip < c2.zip) ? -1 : 0));
            break;
        default: console.log("Invalid Choice !!");
    }
    viewContacts();
}


console.log("Welcome to AddressBook Program!!");
let choice = 0;
do {
    console.log("Enter your Choice \n1. View Contacts \n2. Add Contact \n3. Edit Contact By name \n4. Delete Contact \n5. Search Contacts By City \n6. Search Contacts By State \n7. Sort contacts by person name \n8. Exit");
    choice = prompt("Enter Your Choice ");
    switch (choice) {
        case "1": viewContacts();
            break;
        case "2": addContact(getContact());
            break;
        case "3": editContact();
            break;
        case "4": console.log(deleteContact().toString());
            break;
        case "5": searchByCityState("City");
            break;
        case "6": searchByCityState("State");
            break;
        case "7": sortContacts();
            break;
        case "8": console.log("Bye!!");
            break;
        default: console.log("Invalid Choice !!");
    }

} while (choice != 8)