import React from 'react';
import './Track.css';

// React component for the individual track components.
export class Track extends React.Component {

    // Constructor method for initialising and binding methods.
    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }

    // Method to see if track should be added to a playlist or not. Depends on the "isRemoval"
    // variable which will be associated with every track.
    renderAction () {
        if (this.props.isRemoval) {
            return <button className='Track-action' onClick={this.removeTrack}>-</button>
        } else {
            return <button className='Track-action' onClick={this.addTrack}>+</button>
        }
    }

    // addTrack component which will only appear to tracklist tracks.
    addTrack() {
        this.props.onAdd(this.props.track);
    }

    // removeTrack component which will only appear on playlist tracks.
    // referenced back in app.js
    removeTrack = () => {
        this.props.onRemove(this.props.track)
    }

    // What will be rendered as Track component.
    render() {
    return (
        <div className="Track">
            <div className="Track-information">
                <h3>{this.props.track.name}</h3>
                <p>{this.props.track.artist} | {this.props.track.album}</p>
            </div>
        {/* Will display button depending on the condition */}
        {this.renderAction()}
        </div>
    );
}
}