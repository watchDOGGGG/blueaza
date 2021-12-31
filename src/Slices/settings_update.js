import {createSlice} from '@reduxjs/toolkit'

const initialState ={
    school:{
        name:null,
        faculty:null,
        department:null,
        level:null,
    },
    organization:null,
    address:null

}
export const SettingsSlice = createSlice({
    name: 'setting',
    initialState,
    reducers:{
        setSchoolName: (state,action) =>{
            state.school.name = action.payload
        },
        setSchoolFaculty: (state,action) =>{
            state.school.faculty = action.payload
        },
        setSchoolDepartment: (state,action) =>{
            state.school.department = action.payload
        },
        setSchoollevel: (state,action) =>{
            state.school.level = action.payload
        },
        setOrganization: (state,action) =>{
            state.organization = action.payload
        },
        setAddress: (state,action) =>{
            state.address = action.payload
        },
    }
})

export const {setAddress,setSchoolName,setSchoolFaculty,setSchoolDepartment,setSchoollevel,setOrganization} = SettingsSlice.actions

export default SettingsSlice.reducer