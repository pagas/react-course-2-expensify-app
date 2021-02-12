import React from 'react';
import moment from 'moment';

import {SingleDatePicker} from "react-dates";


export default class ExpenseForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            description: props.expense ? props.expense.description : '',
            amount: props.expense ? (props.expense.amount / 100).toString() : '',
            note: props.expense ? props.expense.note : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: ''
        }
    }

    onSubmit = (e) => {
        e.preventDefault();

        if (!this.state.description || !this.state.amount) {
            this.setState(()=>({error: 'Please provide description and amount!'}))
        } else {
            this.setState(()=>({error: ''}));
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100, // in cents format
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            });
        }
    }

    onDescriptionChange = (e) => {
        this.setState(() => ({description: e.target.value}))
    }

    onAmountChange = (e) => {
        const amount = e.target.value;
        // only numbers, that might have 0-2 decimals
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({amount}))
        }
    }

    onNoteChange = (e) => {
        this.setState(() => ({note: e.target.value}))
    }

    onDateChange = (createdAt) => {
        if (createdAt) {
            this.setState(() => ({createdAt}))
        }
    }

    onCalendarFocusChange = (calendarFocused) => {
        this.setState(() => ({calendarFocused}))
    }

    render() {
        return <div>
            {this.state.error && <p>{this.state.error}</p>}
            <form onSubmit={this.onSubmit}>
                <input type="text"
                       name="description"
                       placeholder="Description"
                       autoFocus
                       value={this.state.description}
                       onChange={this.onDescriptionChange}
                />

                <input type="text"
                       name="amount"
                       placeholder="Amount"
                       value={this.state.amount}
                       onChange={this.onAmountChange}
                />

                <SingleDatePicker
                    date={this.state.createdAt} // momentPropTypes.momentObj or null
                    onDateChange={this.onDateChange} // PropTypes.func.isRequired
                    focused={this.state.calendarFocused} // PropTypes.bool
                    onFocusChange={this.onCalendarFocusChange} // PropTypes.func.isRequired
                    id="createdAt" // PropTypes.string.isRequired,
                    numberOfMonths={1}
                    isOutsideRange={(day) => false}
                />

                <textarea
                    placeholder="Add a note for your expense (optional)"
                    name="note"
                    value={this.state.note}
                    onChange={this.onNoteChange}
                ></textarea>


                <button>Add expense</button>
            </form>
        </div>
    }
}


