import { message } from "antd"
import { endpoint } from "../passer/key/endpoint/endpoint"

// Update School
export const Update_school = async(data) =>{
   
    try {
        const initiate = await fetch(`${endpoint}/update/updateSchool`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json',passkey: localStorage.passkey},
            body: JSON.stringify({
                school_name: data.name,
                school_faculty: data.faculty,
                school_department: data.department,
                school_level: data.level,
            })
        })
         return initiate.json()
    } catch (error) {
        console.log(error.message)
    }
}

//Update organization
export const Update_Organization = async(data) =>{
    
    try {
        const initiate = await fetch(`${endpoint}/update/updateOrganization`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json',passkey: localStorage.passkey},
            body: JSON.stringify({
                organization: data,
            })
        })
         const response = await initiate.json()
         if(response.error){
            return message.error(response.error)
         }
         return message.success(response.success)
    } catch (error) {
        console.log(error.message)
    }
}

// createOrganization
export const createOrganization = async (data) =>{    
    try{
        const formData = new FormData();
        formData.set('name', data.name);
        formData.set('desc', data.desc);
        formData.set('estb', data.estb);
        formData.set('loca', data.loca);
        formData.set('phone', data.phone);
        const initiate = await fetch(`${endpoint}/create/createOrganization`,{
            method:'POST',
            headers:{passkey: localStorage.passkey},
            body: formData
        })
         return initiate.json()
    }catch(error){
        console.log(error.message)
    }
}

//Update Address
export const UpdateAddress = async(data)=>{
    try {
        const initiate = await fetch(`${endpoint}/update/updateAddress`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json',passkey: localStorage.passkey},
            body: JSON.stringify({
                address: data,
            })
        })
         const response = await initiate.json()
         if(response.error){
            return message.error(response.error)
         }
         return message.success(response.success)
    } catch (error) {
        console.log(error.message)
    }
}

//Update about

export const UpdateAbout = async(data)=>{
 
    try {
        const initiate = await fetch(`${endpoint}/update/updateAbout`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json',passkey: localStorage.passkey},
            body: JSON.stringify({
                about: data,
            })
        })
         const response = await initiate.json()
         if(response.error){
            return message.error(response.error)
         }
         return message.success(response.success)

    } catch (error) {
        console.log(error.message)
    }
} 