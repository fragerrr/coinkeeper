import React, {useEffect, useState} from 'react'

const data = []

function AccountTable(props) {
    const [accounts, setAccounts] = useState([])


    useEffect(() => {
        fetch("http://localhost:8080/account/" + props.id) //надо сделать динамическую ссылку, можно пропсами
            .then(response => response.json())
            .then(acc => {
                acc.forEach(account => data.push(account))

                setAccounts(data)
            })
    })


    const deleteRow = (event) => {
        event.preventDefault();

        fetch('http://localhost:8080/account/delete/' + event.target.id, {method: 'DELETE'})
            .then(r => console.log(r));

        document.location.reload();
    }

    const renderUsers = () => {
        return accounts.map(({id, name, money}) => {
            return <tr key={id}>
                <td>{name}</td>
                <td>{money}</td>
                <td>
                    <button className="x" onClick={deleteRow} id={id}>❌</button>
                </td>
            </tr>
        })
    }

    const renderHeader = () => {
        return (
            <thead>
            <tr>
                <th>NAME</th>
                <th>MONEY</th>
                <th>DELETE</th>
            </tr>
            </thead>
        )
    }

    const renderTable = () => {
        return (
            <table>
                {renderHeader()}
                <tbody>
                {renderUsers()}
                </tbody>
            </table>
        )
    }

    return (
        renderTable()
    );
}

export default AccountTable;