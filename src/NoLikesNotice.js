import React from "react";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import Button from "@mui/material/Button";

function NoLikesNotice({ songsOrPlaylists }) {
  return (
    <div className="noLikesNotice">
      <div className="logo">
        <MusicNoteIcon fontSize="large" color="white" />
      </div>
      <div className="description">
        <h2>
          {songsOrPlaylists[0].toUpperCase() + songsOrPlaylists.substring(1)}{" "}
          you like will appear here
        </h2>
        <span>Save {songsOrPlaylists} by tapping the heart icon.</span>
      </div>
      <Button variant="contained" size="medium" color="success">
        Find {songsOrPlaylists}
      </Button>
    </div>
  );
}

export default NoLikesNotice;
