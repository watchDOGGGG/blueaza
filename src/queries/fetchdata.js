import { endpoint } from "../passer/key/endpoint/endpoint"
// import { setLoggedInUser } from "../Slices/Navslice"

export const fetchAllOrganizations = async() =>{
    try {
        const initiate = await fetch(`${endpoint}/create/fetchAllOrganizations`)
    return initiate.json()
    } catch (error) {
        console.log(error.message)
    }
}

// fetch logged In user details
 export const getUser = async()=>{
    const initiate = await fetch(`${endpoint}/users/getUserdetails`,{
        headers:{passkey:localStorage.passkey}
    })
    return initiate.json()
}