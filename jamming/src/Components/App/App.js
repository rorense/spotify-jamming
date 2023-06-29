import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { PlayList } from '../PlayList/PlayList';
import { Spotify } from '../../util/spotify';

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
  this.removeTrack = this.removeTrack.bind(this);
  this.updatePlaylistName = this.updatePlaylistName.bind(this);
  this.savePlaylist = this.savePlaylist.bind(this);
  this.search = this.search.bind(this);
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
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map((track) => track.uri);
    const name = this.state.playlistName;
    Spotify.savePlaylistName(name, trackURIs).then(() => {
      this.setState({
        playlistName: "New Playlist",
        playlistTracks: [],
      })
    })
  }

  search (term) {
    Spotify.search(term)
      .then((result) => {
        this.setState({ searchResults: result });
        console.log(term);
      })
  } 
    
  render() {
    return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={this.search} />
        <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/> 
          <PlayList 
          playlistName={this.state.playlistName} 
          playlistTracks={this.state.playlistTracks} 
          onRemove={this.removeTrack}
          onNameChange={this.updatePlaylistName}
          onSave={this.savePlaylist}/>
        </div>
      </div>
    </div>
  );
    }
}