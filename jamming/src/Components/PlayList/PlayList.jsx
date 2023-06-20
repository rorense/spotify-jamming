import React from "react";
import "./PlayList.css";

export default function PlayList() {
    return (
    <div className="Playlist">
        <input defaultValue={'New Playlist'}/>
        {/* Add a TrackList component */}
        <button className="Playlist-save">SAVE TO SPOTIFY</button>
    </div>
    )
}

