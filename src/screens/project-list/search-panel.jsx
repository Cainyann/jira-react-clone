import React from 'react'


const SearchPanel = (props) => {
    const {searchParam,setSearchParam,users} = props


    

    function handleSearch(e) {
        setSearchParam({ ...searchParam, name: e.target.value })
    }
    function handleSelect(e) {
        setSearchParam({ ...searchParam, personId: e.target.value })
    }
    return (
        <div>
            <form action={''}>
                <input type="text" onChange={handleSearch}></input>

                <select value={searchParam.userId} onChange={handleSelect}>
                <option>Leader</option>

                {
                    users.map(user=>
                        <option value={user.id} key={user.id}>{user.name}</option>)
                }
                </select>
            </form>
        </div>
    )
}

export default SearchPanel