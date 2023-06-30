import React from 'react'
import '../styles/modal.css'
import {useSearchParams} from "react-router-dom";

const AccountModal = ({active, setActive}) => {
    const name = document.getElementsByTagName('input')[0]
    const money = document.getElementsByTagName('input')[1]

    const [searchParams] = useSearchParams()

    const param = {
         id: searchParams.get("id")
    }
    function clear() {
        name.value = "";
        money.value = "";
        setActive(false);
    }


    function handleClick(event){
        event.preventDefault();

        const acc = {
            name: name.value,
            money: money.value,
            user_id: param.id
        }


        fetch('http://localhost:8080/account/new',{
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(acc)
        })
            .then(response => response.json())
            .then(data => {
                    console.log(data)
                }
            )
            .catch(err => {
                console.log(err)
            })

        clear()
    }

    return(
        <div className={active ? "modal active" : "modal"} onClick={clear}>
            <div className="content" onClick={e => e.stopPropagation()}>
                <form onSubmit={handleClick}>
                    <h2>ADD ACCOUNT</h2>
                    <label>ACCOUNT NAME</label>
                    <input placeholder="Enter account name" type="text"/>
                    <label>MONEY</label>
                    <input placeholder="Enter quantity of money" type="number" min="0"/>
                    <button>ADD</button>
                    {/*Добавить функционал форме, чтоб она добавляла счет и деньги на него.*/}
                    {/*Если такой счет уже есть, добавить деньги на него.*/}
                </form>
            </div>
        </div>
    )
}

export default AccountModal;