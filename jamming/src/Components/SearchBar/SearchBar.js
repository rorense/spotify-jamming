import React from "react";
import "./SearchBar.css"

// Adding search bar component
export class SearchBar extends React.Component {

    // Constructor method required to initialse variables and be able to access them.
    constructor (props) {
        super(props);
        // Initial value in search bar is a blank string. Will be filled in handleTermChange method.
        this.state = { term: "" };
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
    }

    // Search method referenced here from main app.js file.
    search() {
        this.props.onSearch(this.state.term);
    }

    // Input change method referenced here from main app.js file.
    handleTermChange(e) {
        this.setState({ term: e.target.value });
    }

    // What will be rendered as the SearchBar component.
    render() {
    return (
        <div className="SearchBar">
            {/* Place holder text */}
            <input placeholder="Enter A Song, Album, or Artist"
                onChange={this.handleTermChange} />
            <button className="SearchButton" onClick={ this.search }>SEARCH</button>
        </div>
)
}}