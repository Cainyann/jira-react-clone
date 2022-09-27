import React from "react"

const List = ({ projectList, users }) => {



    return (
        <table>
            <thead>
                <tr>
                    <th>名称</th>
                    <th>负责人</th>
                </tr>
            </thead>

            <tbody>
                {projectList.map((project) => {
                    const { id, name, personId } = project
                    //通过psrsonId获取users中对应的personName
                    //?.:防止出现undefined.name
                    const personName = users.find(user=>user.id === personId)?.name || '未知'

                    return (
                        <tr key={id}>
                            <td>{name}</td>
                            <td>{personName} </td> 
                        </tr>
                    )

                })}

            </tbody>



        </table>

    )
}

export default List