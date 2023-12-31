/* eslint-disable no-lone-blocks */
// Importing necesary files and extensions required for the app to work.
import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { PlayList } from '../PlayList/PlayList';
import { Spotify } from '../../util/spotify';

/* The main App component which will fit the other crucial components.
Exported to be used in other files */
export class App extends React.Component {

  constructor(props) {
    /* Initial values of the tracklist components for testing purposes. 
    In order to use the "this." prperty, we have to use super(prop) which is passed down from the
    React component class.
    */
   super(props);
    this.state = {searchResults: [
      // These are purely for testing purposes.
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

  /*Binding methods in constructor allows for binding the context to event handlers
  so it does not lose context.
  Binding can also be done using arrow functions in the method definition or 
  in the render statement.*/
  this.addTrack = this.addTrack.bind(this);
  this.removeTrack = this.removeTrack.bind(this);
  this.updatePlaylistName = this.updatePlaylistName.bind(this);
  this.savePlaylist = this.savePlaylist.bind(this);
  this.search = this.search.bind(this);
  }; 

  // Method to add tracks to the playlist.
  addTrack(track) {
    // foundTrack variable determines whether the targetted track already exists in the playlist.
    const foundTrack = this.state.playlistTracks.find(
      (playlistTrack) => playlistTrack.id === track.id);
    
    // using concat() function to merge the track with existing playlist. Can also use push().
    const newTrack = this.state.playlistTracks.concat(track);
    if (foundTrack) {
      console.log("Track already Exists")
    } else {
      // Updating state.
      this.setState({ playlistTracks: newTrack })
    }
  }

  // Method to remove track from the playlist
  removeTrack(track) {
    // Using filter to remove track that the id does match in the current playlist and outputs an object without that track.id.
   const isPresent = this.state.playlistTracks.filter((playlistTrack) => playlistTrack.id !== track.id);
   // Updating state.
   this.setState({ playlistTracks: isPresent });
  }

  // Method to update the playlistname. More details will be covered in playlist.js.
  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  // Method to save the playlist onto user's Spotify account.
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

  // Method to search for a keywork to find corresponding songs with related name.
  search (term) {
    Spotify.search(term)
      .then((result) => {
        // Updating state.
        this.setState({ searchResults: result });
      })
  } 
  
  // What will be rendered on the HTML file.
  render() {
    return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        {/*SearchBar component from SearchBar.js with an "onSearch" prop property*/}
        <SearchBar onSearch={this.search} />
        <div className="App-playlist">
          {/*SearchResults component from SearchResults.js with multiple prop properties*/}
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/> 
          {/*PlayList component from PlayList.js with multiple prop properties*/}
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