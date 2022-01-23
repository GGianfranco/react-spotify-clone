import React from "react";
import LikedSongsCard from "./LikedSongsCard";
import PlaylistCard from "./PlaylistCard";
import { useAuth, useUserLikedPlaylists } from "./firebase";

function Library() {
  const currentUser = useAuth();
  const likedPlaylists = useUserLikedPlaylists(currentUser?.uid);

  return (
    <div className="library">
      <div className="libraryDescription">Browse all</div>
      <div className="libraryGrid">
        <LikedSongsCard />
        {likedPlaylists?.length > 0 &&
          likedPlaylists.map((likedPlaylist) => (
            <PlaylistCard
              playlistId={likedPlaylist.playlistId}
              playlistCover={likedPlaylist.playlistImageUrl}
              playlistTitle={likedPlaylist.playlistName}
              playlistDescription={likedPlaylist.playlistDescription}
            />
          ))}
      </div>
    </div>
  );
}

export default Library;
