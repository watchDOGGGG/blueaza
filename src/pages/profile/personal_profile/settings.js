import React, { useState } from 'react'
import Avatar from '../../../components/avatar/avatar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid} from '@fortawesome/fontawesome-svg-core/import.macro' 
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Image, message, Select } from 'antd';
import { useDispatch,useSelector } from 'react-redux';
import { Navigation } from '../../../Slices/Navslice';
import { Spin, } from 'antd';
import {setSchoolDepartment, setSchoolFaculty, setSchoolName,setOrganization,setAddress} from '../../../Slices/settings_update'
import {useMutation} from 'react-query'
import {Update_school,Update_Organization, UpdateAddress,UpdateAbout} from '../../../queries/send'
import { useQuery } from 'react-query'
import { fetchAllOrganizations } from '../../../queries/fetchdata'; 
import ProfileImageUpdate from './profile_img_update';

const { Option } = Select;


export default function Settings() {
    const dispatch = useDispatch()
    const loggedInUser = useSelector(state => state.nav.loggedInUser)
    const school = useSelector(state => state.setting.school)
    const organiza = useSelector(state => state.setting.organization)
    const address = useSelector(state => state.setting.address)
    

    const [expanded, setExpanded] = React.useState('');
    const {data, status} = useQuery('fetchOrganization',fetchAllOrganizations)
    const [about, setabout] = useState(loggedInUser?.about)
    const [aboutEdit, setAboutEdit] = useState(false)
    
   

    const navigateroute = (page) =>{
        dispatch(Navigation({page:page}))
    }

    const {mutate, isLoading} = useMutation(Update_school, {
        onSuccess: (success) =>{
            message.success(success.success)
        }
    })

    const handleChange = (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };
  
    function onChangeOrganization(value) {
        dispatch(setOrganization(value))
      }

      const update_org = () =>{
        Update_Organization(organiza)
      }
     
      const update_address = () =>{
          UpdateAddress(address)
      }
      const update_about = () =>{
        UpdateAbout(about)
        setAboutEdit(false)
      }
      const setAboutOnchange = (e) =>{
        setabout(e.target.value)
        setAboutEdit(true)
      }
    return (
        <div className=" w-100 s_pa">
            {/* image */}
            <div className="flex justify-center align-center p_n_i">
                <div>
                    {/* image */}
                    <div className="flex">
                    <div className="br-100 bg-near-white pa2">
                        
                        <Avatar name={loggedInUser?.username} src={loggedInUser?.profileimg ? <Image src={loggedInUser?.profileimg}/>:null} size={100}/>
                    </div>
                    <div className="flex items-center pointer">
                        <ProfileImageUpdate/>
                    </div>
                    </div>
                    {/* name */}
                    <div className="justify-center tc b f4 align-center">
                        {loggedInUser?.username}
                    </div>
                </div>
            </div>
            
            {/* status info */}
            <div className="flex justify-center align-center p_s">
                <div className="flex w-80">
                    {
                        aboutEdit === false &&
                        <div className="w-80 center tc" style={{ height: 'auto' }} onClick={e => setAboutEdit(true)} >{about}</div>
                    }


                    {
                        aboutEdit === true &&
                        <>
                            <input value={about} className="w-100 pa2 center ba b--black-10" type="text" placeholder={"say something about you!"} onChange={e => setAboutOnchange(e)} />
                            <div className="flex ml2">
                                <FontAwesomeIcon icon={solid("pencil")} /><span className="pointer" onClick={update_about} > save...</span>
                            </div>
                        </>
                    }
                </div>
            </div>

            {/* profile content */}
            <div className="p_p center w-80">
                <div className="p_p_h">
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<FontAwesomeIcon icon={solid("pencil")} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography><FontAwesomeIcon icon={solid("graduation-cap")} /> Education</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                                {/* school details */}
                                <div className="e_c">
                                    {/* school */}
                                    <label className="">school : {school?.name === null ?loggedInUser?.school[0]?.school:school.name}</label>
                                    <div>
                                        <Select
                                            showSearch
                                            style={{ width: 300 }}
                                            placeholder={"Select your school"}
                                            optionFilterProp="children"
                                            onChange={e=>dispatch(setSchoolName(e))}
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            <Option value="crutech">Crutech</Option>
                                        </Select>
                                    </div>
                                    {/* faculty */}
                                    <label className="">faculty : {school?.faculty === null ?loggedInUser?.school[0]?.faculty:school.faculty}</label>
                                    <div>
                                    <Select
                                            showSearch 
                                            style={{ width: 300 }}
                                            placeholder="Select your falculty"
                                            optionFilterProp="children"
                                            onChange={e=>dispatch(setSchoolFaculty(e))}
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            <Option value="physical science">Physical science</Option>
                                        </Select>
                                    </div>
                                    {/* department */}
                                    <label className="">department : {school?.department === null ?loggedInUser?.school[0]?.department:school.department}</label>
                                    <div>
                                    <Select
                                            showSearch
                                            style={{ width: 300 }}
                                            placeholder="Select your department"
                                            optionFilterProp="children"
                                            onChange={e=>dispatch(setSchoolDepartment(e))}
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            <Option value="computer science">Computer Science</Option>
                                            <Option value="mathmatics">Mathmatics</Option>
                                        </Select>
                                    </div>
                                    <div className="bg-blue pa2 br1 w-30 pv1 mt2 flex pointer grow" onClick={() => mutate({
                                        name: school.name,
                                        faculty: school.faculty,
                                        department: school.department,
                                    })}>
                                        <span className="grow-1" >save</span>
                                        {
                                            !isLoading && 
                                            <span><FontAwesomeIcon icon={solid("arrow-right")}/></span>
                                        }
                                       
                                        {
                                            isLoading && 
                                            <span className="white bg-white pa1 br-100 w-20 tc"><Spin size="small" /></span>
                                        }
                                        
                                    </div>
                                </div>
                            </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary
                        expandIcon={<FontAwesomeIcon icon={solid("pencil")} />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography><FontAwesomeIcon icon={solid("briefcase")} /> Work <span className="font-sm gray">{organiza}</span></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                        <label className="f6">Enter organization, work or company</label>
                                    <div>
                                    <Select
                                            showSearch
                                            style={{ width: 300 }}
                                            placeholder="Select your department"
                                            optionFilterProp="children"
                                            onChange={onChangeOrganization}
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            {status === 'loading' &&
                                            <Spin/>
                                            }
                                            {
                                                status === 'error' &&
                                                <span>Error loading data</span>
                                        }
                                        {
                                            status === 'success' &&
                                            data.success.length > 0 &&
                                            data.success.map((item) => {
                                                return (
                                                    <Option value={item.name}>{item.name}</Option>
                                                )
                                                

                                            })
                                        }
                                        
                                        </Select>
                                    </div>
                                    <div className="gray font-sm pa2 pointer hover-blue" onClick={e=>navigateroute("register organization")}><span>Can't find your organization register one here</span></div>
                                    <div className="bg-blue pa2 br1 w-30 pv1 mt2 flex pointer grow" onClick={update_org}>
                                        <span className="grow-1 tc" >save</span>
                                    </div>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary
                        expandIcon={<FontAwesomeIcon icon={solid("pencil")} />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography ><FontAwesomeIcon icon={solid("location-dot")} /> Address <span className="font-sm gray">{address}</span></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                            <Typography>
                                <div>
                                    <input value={address} onChange={e=>dispatch(setAddress(e.target.value))} type="text" className="w-80 ba b--black-10 pa2 br2" placeholder="location" />
                                    <div className="bg-blue pa2 br1 w-30 pv1 mt2 flex pointer grow" onClick={update_address}>
                                        <span className="grow-1 tc" >save</span>
                                    </div>
                                </div>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>  
            </div>

        </div>
    )
}

