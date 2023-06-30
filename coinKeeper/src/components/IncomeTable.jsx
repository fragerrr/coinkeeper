import React, {useEffect, useState} from 'react'

const data = []


function IncomeTable(props) {
    const [incomes, setIncomes] = useState([])

    useEffect(() => {
        fetch("http://localhost:8080/come/" + props.id) //надо сделать динамическую ссылку, можно пропсами
            .then(response => response.json())
            .then(acc => {
                acc.forEach(account => {
                    if(account.status === false){
                        let response = {
                            id: account.id,
                            date: account.month,
                            account_name: account.account.name,
                            name: account.name,
                            money: account.money
                        }
                        data.push(response)
                    }
                })

                setIncomes(data)
            })
    })

    const deleteRow = (event) => {
        event.preventDefault();
        console.log(event.currentTarget.id);

        fetch('http://localhost:8080/come/delete/' + event.target.id, {method: 'DELETE'})
            .then(r => console.log(r))

        document.location.reload();
    }

    const renderUsers = () => {
        return incomes.map(({id, date, account_name, name, money}) => {
            return <tr key={id}>
                <td>{date}</td>
                <td>{account_name}</td>
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
                <th>MONTH</th>
                <th>ACCOUNT</th>
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

export default IncomeTable;