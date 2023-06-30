import React from 'react'
import '../styles/modal.css'
import AccountSelect from "./AccountSelect";
import {useSearchParams} from "react-router-dom";


const OutcomeModal = ({active, setActive}) => {
    let name = ""
    let money = 0

    let nameInput = document.getElementById("name");
    let moneyInput = document.getElementById("money");

    const [searchParams] = useSearchParams()
    const id = searchParams.get("id")

    function clear() {
        nameInput.value = "";
        moneyInput.value = "";
        setActive(false)
    }

    function handleClick(event) {
        event.preventDefault();

        const account = document.getElementsByTagName('select')[0]

        const come = {
            account: {
                id: account.value
            },
            name: name,
            money: money,
            status: true
        }

        fetch('http://localhost:8080/come/new', {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(come)
        })
            .then(response => response.json())
            .then(data => {
                    console.log(data)
                }
            )
            .catch(err => {
                console.log(err)
            })

        clear();
    }

    function handleChange(event) {
        name = event.target.value
    }

    function handleChange2(event) {
        money = event.target.value

    }


    return (
        <div className={active ? "modal active" : "modal"} onClick={clear}>
            <div className="content" onClick={e => e.stopPropagation()}>
                <form onSubmit={handleClick}>
                    <h2>ADD OUTCOME</h2>
                    <label>ACCOUNT NAME</label>
                    <AccountSelect id={id}/>
                    <label>NAME</label>
                    <input placeholder="Enter income name" type="text" onChange={handleChange} id={"name"}/>
                    <label>MONEY</label>
                    <input placeholder="Enter quantity of money" type="number" onChange={handleChange2} id={"money"}/>
                    <button>ADD</button>
                </form>
            </div>
        </div>
    )
}

export default OutcomeModal;