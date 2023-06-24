import { DocumentSnapshot, doc, getDoc } from "firebase/firestore"
import { db } from "../firebase"

let users = new Map<string, Promise<DocumentSnapshot>>()

export class User {
    name: string
    email: string
    profile_pic: string
    id: string

    constructor (userDoc: DocumentSnapshot) {
        this.name = userDoc.get('name')
        this.email = userDoc.get('email')
        this.profile_pic = userDoc.get('profile_pic')
        this.id = userDoc.id
    }
}

export default async function getUser (id: string) : Promise<User> {
    if (users.has(id)) return new User(await users.get(id)!)


    console.log("fetched " + id)
    let userDoc = getDoc(doc(db, 'users', id))
    users.set(id, userDoc)
    return new User(await userDoc)
}