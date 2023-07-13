// Importing necessary files
import React from "react";
import "./PlayList.css";
import { TrackList } from "../TrackList/TrackList";

// React component for the plalist section.
export class PlayList extends React.Component {

    // Super props so we can use "this" and binding methods as done before.
    constructor (props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    // Method to allow name change of a playlist name to user input.
    handleNameChange(e) {
        this.props.onNameChange(e.target.value);
    }

    // What will be rendered in "PlayList section"
    render() {
    return (
    <div className="Playlist">
        {/*Setting Default value for PlayList name unless changed.
        Calling handleNameChange when playlist name is changed*/}
        <input defaultValue={'New Playlist'} onChange={this.handleNameChange}/>
        {/* The tracklist will be renderd here */}
        <TrackList 
        tracks={this.props.playlistTracks} 
        onRemove={this.props.onRemove} 
        isRemoval={true}
        />
        {/* Button to save Playlist. 
        Feature is implemented in the main app.js file */}
        <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
    </div>
    )
}}

