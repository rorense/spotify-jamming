import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { PlayList } from '../PlayList/PlayList';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchResults: [
      {
        name: "Example Track Name",
        artist: "Example Track Artist",
        album: "Example Track Album",
        id: 1,
      },
      {
        name: "Example Track Name 2",
        artist: "Example Track Artist 2",
        album: "Example Track Album 2",
        id: 2,
      },
    ],

    playlistName: "Example Playlist",
    playlistTracks: [
      {
        name: "Example Playlist Name",
        artist: "Example Playlist Artist",
        album: "Example Playlist Album",
        id: 3,
      },
      {
        name: "Example Playlist Name2",
        artist: "Example Playlist Artist2",
        album: "Example Playlist Album2",
        id: 4,
      },
    ]
  };
  this.addTrack = this.addTrack.bind(this);
  this.removeTrack = this.removeTrack.bind(this)
  }; 

  addTrack(track) {
    const foundTrack = this.state.playlistTracks.find(
      (playlistTrack) => playlistTrack.id === track.id);

    const newTrack = this.state.playlistTracks.concat(track);
    if (foundTrack) {
      console.log("Track already Exists")
    } else {
      this.setState({ playlistTracks: newTrack })
    }
  }

  removeTrack(track) {
   const isPresent = this.state.playlistTracks.filter((playlistTrack) => playlistTrack.id !== track.id);
   this.setState({ playlistTracks: isPresent});

  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name })
  }
    
  render() {
    return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar />
        <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/> 
          <PlayList playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack}/>
        </div>
      </div>
    </div>
  );
    }
}