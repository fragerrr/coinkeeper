import React from "react";
import {useState} from "react";
import logo from '../img/logo.png'
import exit from '../img/exit.png'
import "../styles/home.css"
import Chart from "../components/Chart"
import AccountTable from "../components/AccountTable";
import IncomeTable from "../components/IncomeTable";
import OutcomeTable from "../components/OutcomeTable";
import AccountModal from "../components/AccountModal";
import IncomeModal from "../components/IncomeModal";
import OutcomeModal from "../components/OutcomeModal";
import {useParams, useSearchParams} from "react-router-dom";

const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const param = {
        id: searchParams.get("id")
    };

    // при нажатии на кнопки add, то данные удваиваются, нужно исправить
    // и есть баг с вводимыми данными:
    const [accountActive, setAccountActive] = useState(false);
    const [incomeActive, setIncomeActive] = useState(false);
    const [outcomeActive, setOutcomeActive] = useState(false);

    if (param.id === null) {
        window.open("/login", "_self")
    } else {
        return (
            <>
                <header>
                    <a href="/" className="header-link"><img src={logo} alt="logo" className="logo"/></a>
                    <a href="/login" className="header-link"><img src={exit} alt="exit" className="exit"/></a>
                </header>
                <main>
                    <div className="container">
                        <div className="element account">
                            <div className="element-header">
                                <h2>ACCOUNTS:</h2>
                                <h4>MONEY AVAILABLE:</h4>
                            </div>
                            <hr/>
                            <div className="element-data">
                                <AccountTable id={param.id}/>
                                <button className="add" onClick={() => setAccountActive(true)}>ADD</button>
                            </div>
                        </div>
                        <div className="element hist"><Chart id={param.id}/></div>
                    </div>
                    <div className="container">
                        <div className="element">
                            <div className="element-header">
                                <h2>INCOME:</h2>
                                <h4>TOTAL INCOME:</h4>
                            </div>
                            <hr/>
                            <div className="element-data">
                                <IncomeTable id={param.id}/>
                                <button className="add" onClick={() => setIncomeActive(true)}>ADD</button>
                            </div>
                        </div>
                        <div className="element">
                            <div className="element-header">
                                <h2>OUTCOME:</h2>
                                <h4>TOTAL OUTCOME:</h4>
                            </div>
                            <hr/>
                            <div className="element-data">
                                <OutcomeTable id={param.id}/>
                                <button className="add" onClick={() => setOutcomeActive(true)}>ADD</button>
                            </div>
                        </div>
                    </div>
                </main>
                <AccountModal active={accountActive} setActive={setAccountActive}/>
                <IncomeModal active={incomeActive} setActive={setIncomeActive}/>
                <OutcomeModal active={outcomeActive} setActive={setOutcomeActive}/>
            </>
        );
    }
}

export default Home;