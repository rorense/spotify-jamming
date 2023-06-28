let accessToken = "";
const clientID = "0d8fe520136844b4aaf6fa9e4ebf8877";
const redirectURI = "http://localhost:3000/";
const Spotify = {

    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }
        const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
        const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);

        if (urlAccessToken && urlExpiresIn) {
            accessToken = urlAccessToken[1];
            const expires_in = Number(urlExpiresIn[1]);
            window.setTimeout(() => accessToken = '', expires_in * 1000);
            window.history.pushState('Access Token', null, '/');

        } else {
            const redirect = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location = redirect;
        }
    },

    search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: { Authorization: `Bearer ${accessToken}`}
        })
        .then((response) => {
            return response.json();
        })
        .then((jsonResponse) => {
            if(!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map(tracks => ({
                id: tracks.id,
                name: tracks.name,
                artist: tracks.artists[0].name,
                album: tracks.album.name,
                uri: tracks.uri,
            }));
        });
    },

    savePlaylistName(name, trackURIs) {
        if (name || trackURIs) {
            return;
        }
        let accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        let userID = "";
        return fetch("https://api.spotify.com/v1/me", {
            headers: headers,
        })
        .then((response) => response.json())
        .then((jsonResponse) => {
            userID = jsonResponse.id;
            return fetch()
        })
    } 


}
export {Spotify}