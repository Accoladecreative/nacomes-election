import { deleteDoc, doc, getDoc, getDocs, increment, setDoc, collectionName, addDoc, collection, query, where, updateDoc } from "firebase/firestore"
import { db } from "../firebase-config"
import { db_candidate, db_student } from "./StorageConstants"



export const createStudent = ({

}) => createDoc({ collectionName: 'student' })

export const updateStudent = ({

}) => {

}


export const deleteStudent = ({

}) => {

}

export const getStudent = ({

}) => {

}


export const voteCandidate = async (
    candidateName
) => {

    if (candidateName !== undefined && candidateName !== null) {
        const docRef = doc(db, db_candidate, candidateName)
        const update = updateDoc(docRef, {
            vote: increment(1)
        })
        console.log(update)
        return update
    }
}




export const createDoc = async ({ collectionName, documentName, data }) => {
    // const docRef = await addDoc(collection(db, "cities"),
    const docRef = await addDoc(collection(db, collectionName, documentName), data)
    return docRef()
}

export const updateRecord = async (collectionName, documentName, newData) => {
    const docRef = await updateDoc(doc(db, collectionName, documentName), newData)
    return docRef
}


export const getDocument = async ({ collectionName, documentName }) => {
    const docRef = await getDoc(doc(db, collectionName, documentName))
    console.log(docRef());
    if (docRef.exists()) {
        return { success: true, data: docRef.data() }
    } else
        return { success: false, data: docRef.data() }

    // return docRef()
}

export const getAllDocument2 = async (collectionName) => {
    const q = query(collection(db, collectionName)//, where(collectionName == db_student ? 'matricNo' :
        // 'username', "==", username));
    )

    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
    // if (querySnapshot.empty) {
    //     console.log('user not found');
    //     return false
    // }
    // else
    // querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    // if (doc.data().password == password) {
    //     console.log('true');
    //     return true
    // }
    //         else {
    // console.log('false');
    // return false
    // }
    // });


    return querySnapshot

}
export const getAllDocument = async (collectionName) => {
    const docRef = await getDocs(collection(db, collectionName))
    // return docRef

    const q = query(collection(db, collectionName))//, where("capital", "==", true));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
    });
    return (querySnapshot)
    // console.log(docRef)
    // if (docRef.exists()) {

    // return docRef()
}
export const getDocumentWithCondition = async ({ collectionName, documentName }) => {
    const docRef = await getDoc(doc(db, collectionName, documentName))
    if (docRef.exists()) {
        return { success: true, data: docRef.data() }
    } else
        return { success: false, data: docRef.data() }

    // return docRef()
}

export const delDoc = async ({ collectionName, documentName, data }) => {
    const docRef = await deleteDoc(doc(db, collectionName, documentName))
    return docRef()
}

export async function exist(collectionName, documentName,) {
    const docRef = doc(db, collectionName, documentName,);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        return true
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        return false
    }

    // return docSnap.exists()
}


export async function login(collectionName, username, password) {
    const q = query(collection(db, collectionName), where(collectionName == db_student ? 'matricNo' :
        'username', "==", username));

    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
    if (querySnapshot.empty) {
        console.log('user not found');
        return false
    }
    else
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            if (doc.data().password == password) {
                console.log('true');
                return true
            }
            else {
                console.log('false');
                return false
            }
        });


    return querySnapshot
}