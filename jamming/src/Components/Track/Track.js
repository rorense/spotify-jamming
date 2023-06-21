import React from 'react';
import './Track.css';

export class Track extends React.Component {

    renderAction () {
        if (this.props.isRemoval) {
            return <button className='Track-action'>-</button>
        } else {
            return <button className='Track-action' onClick={this.addTrack}>+</button>
        }
    }

    addTrack = () => {
        this.props.onAdd(this.props.track);
    }

    render() {
    return (
        <div className="Track">
            <div className="Track-information">
                <h3>{this.props.track.name}</h3>
                <p>{this.props.track.artist} | {this.props.track.album}</p>
            </div>
        {/* <button className="Track-action">{/*} + or - will go here </button> */}
        {this.renderAction()}
        </div>
    );
}
}