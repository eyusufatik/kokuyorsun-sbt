import "./MintForm.css"

import React from 'react';




class MintForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {value: '', mintFunction: props.mintFunction};

        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleAddressChange(event){
        console.log(event.target.value);
        this.setState({value: event.target.value});
    }

    async handleSubmit(event){
        event.preventDefault();
        this.state.mintFunction(this.state.value);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Address: </label>
                <input name="address" type="text" value={this.state.value} onChange={this.handleAddressChange} />
                <button type="submit">Mint</button>
            </form>
        )
    }

}

export default MintForm;