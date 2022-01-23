import React from "react";
import Track from "./Track";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

function TracksTable({ playlistId, tracks }) {
  return (
    <div class="tracksTable">
      <div class="tableHeader">
        <div class="index">
          <span>#</span>
        </div>
        <div class="title">
          <span>TITLE</span>
        </div>
        <div class="album">
          <span>ALBUM</span>
        </div>
        <div class="dateAdded">
          <span>DATE ADDED</span>
        </div>
        <div class="duration">
          <AccessTimeIcon style={{ width: "18px", height: "18px" }} />
        </div>
      </div>
      <div class="tracks">
        {tracks.map((track, trackIndex) => (
          <Track
            playlistId={playlistId}
            trackIndex={trackIndex + 1}
            track={track}
          />
        ))}
      </div>
    </div>
  );
}

export default TracksTable;
