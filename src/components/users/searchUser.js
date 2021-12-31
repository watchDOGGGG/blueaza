import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid} from '@fortawesome/fontawesome-svg-core/import.macro' 
import { useSelector,useDispatch } from 'react-redux'
import {SetSearch} from '../../Slices/SearchSlice'

export default function SearchUser() {
    const searchInput = useSelector(state => state.search.searchInput)
    const dispatch = useDispatch()
    return (
        <div className="search_user_area">
            {/* search area */}
            <div className="search_area">
                {/* search area inputs */}
                <div className="search_area_input flex justify-center">
                    <div className="search_input ba b--black-70 mt3 br4 flex">
                        <div>
                        <input
                        value={searchInput}
                        type="text" placeholder="Search users" className="f6 ml2"
                        onChange={e=>dispatch(SetSearch(e.target.value))}
                        />
                        </div>
                        <FontAwesomeIcon icon={solid("magnifying-glass")}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
