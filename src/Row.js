import React, { useEffect, useState } from "react";
import PlaylistCard from "./PlaylistCard";
import { getFeaturedPlaylists } from "./firebase";

function Row({ day }) {
  const [featuredPlaylists, setFeaturedPlaylists] = useState(null);

  useEffect(() => {
    (async () => {
      setFeaturedPlaylists(await getFeaturedPlaylists(day));
    })();
  }, []);

  return (
    featuredPlaylists && (
      <div className="row">
        <div className="rowTitle">{featuredPlaylists.message}</div>
        <div className="rowDeck">
          {featuredPlaylists.playlists.slice(6).map((playlist) => (
            <PlaylistCard
              playlistId={playlist.playlistId}
              playlistCover={playlist.playlistImageUrl}
              playlistTitle={playlist.playlistName}
              playlistDescription={playlist.playlistDescription}
            />
          ))}
        </div>
      </div>
    )
  );
}

export default Row;
