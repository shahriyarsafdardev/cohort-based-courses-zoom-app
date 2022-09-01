import React, { useState } from "react";
import { TimeStampType } from "../../utils/types/user";
import { Box, Typography, Stack, Button, TextField } from "@material-ui/core";
import axios from "../../utils/axios";

function TimeStamp({
  timeStamp,
  updateTimestamps,
  setActiveSession,
}: {
  timeStamp?: TimeStampType;
  updateTimestamps: Function;
  setActiveSession: Function;
}) {
  const [updateDescription, setUpdateDescription] = useState(false);
  const [description, setDescription] = useState<string>(
    timeStamp?.description || ""
  );

  function secondsToHms(d: any) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var hDisplay = h > 0 ? (m > 0 ? `${h}:` : `${h}`) : "";
    var mDisplay = m > 0 ? (s > 0 ? `${m}:` : `${m}`) : "";
    var sDisplay = s > 0 ? `${s}` : ":00";
    return hDisplay + mDisplay + sDisplay;
  }

  const handleSubmit = () => {
    setUpdateDescription(!updateDescription);
    if (updateDescription) {
      axios
        .post(`/session_timestamps/${timeStamp?.id}/update_timestamp.json`, {
          description: description,
        })
        .then((res) => {
          updateTimestamps(res.data);
        });
    }
  };

  return (
    <Box
      style={{
        padding: "24px",
        margin: "16px",
        border: "1px solid #C4CDD5",
        background: "#F9FAFB",
        borderRadius: "8px",
        width: "100%",
      }}
    >
      <Stack direction="column" spacing={1}>
        {updateDescription ? (
          <TextField
            id="outlined-multiline-static"
            label="Enter description"
            multiline
            rows={4}
            onChange={(e) => setDescription(e.target.value)}
            defaultValue={description}
          />
        ) : (
          <Typography style={{ color: "#454F5B", fontSize: "14px" }}>
            {secondsToHms(timeStamp?.timestamp || 0)}
            {` | ${timeStamp?.description || "New Timestamp"}`}
          </Typography>
        )}
        <Button
          onClick={handleSubmit}
          variant="outlined"
          style={{ borderRadius: "20px", color: "#475569" }}
          fullWidth
        >
          {updateDescription
            ? "Save Description"
            : !timeStamp?.description
            ? "Add Description"
            : "Edit Description"}
        </Button>
      </Stack>
    </Box>
  );
}

export default TimeStamp;
