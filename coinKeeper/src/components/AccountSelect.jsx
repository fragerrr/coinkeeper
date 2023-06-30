import React from 'react';


class AccountSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: []
        };
    }

    componentDidMount() {
        const data = []

        fetch("http://localhost:8080/account/" + this.props.id) //надо сделать динамическую ссылку, можно пропсами
            .then(response => response.json())
            .then(acc => {
                acc.forEach(account => {
                    let res = {
                        id: "",
                        name: "",
                    }

                    res.id = account.id;
                    res.name = account.name;
                    data.push(res)
                })
            });

        this.setState({
            accounts: data
        })

    }

    render () {
        const { accounts } = this.state;

        let accountsList = accounts.length > 0
            && accounts.map((account, i) => {
                return (
                    <option key={i} value={account.id}>{account.name}</option>
                )
            }, this);

        return (
            <div>
                <select>
                    {accountsList}
                </select>
            </div>
        );
    }
}

export default AccountSelect;