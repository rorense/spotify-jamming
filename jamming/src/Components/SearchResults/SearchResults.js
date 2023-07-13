import React from "react";
import "./SearchResults.css";
import { TrackList } from "../TrackList/TrackList";

// React component to display the search results.
export class SearchResults extends React.Component {
        render() {
                return (
                <div className="SearchResults">
                <h2>Results</h2>
                {/* Tracks added here as populated */}
                <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} isRemoval={false}/>
                </div>
                )   
}}