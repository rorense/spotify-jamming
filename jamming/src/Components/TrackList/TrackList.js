import './TrackList.css';
import React from 'react';
import { Track } from "../Track/Track"

// React component for a TrackList. The track component will be fitted on here
export class TrackList extends React.Component {
    render() {
    return (
        <div className="TrackList">
            {/* Mapping over the tracks and filling in variables */}
             {this.props.tracks.map((song) => {
                return (<Track 
                key={song.id}
                track={song}
                onAdd={this.props.onAdd}
                onRemove={this.props.onRemove}
                isRemoval={this.props.isRemoval} /> );
             })}
        </div>
    );
}
}