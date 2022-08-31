import React, { useState } from "react";
import { TimeStampType } from "../../utils/types/user";
import { Box, Typography, Stack, Button, TextField } from "@material-ui/core";
import axios from "../../utils/axios";

function TimeStamp({
  timeStamp,
  updateTimestamps,
}: {
  timeStamp?: TimeStampType;
  updateTimestamps: Function;
}) {
  const [updateDescription, setUpdateDescription] = useState(false);
  const [description, setDescription] = useState<string>(
    timeStamp?.description || ""
  );

  const handleSubmit = () => {
    setUpdateDescription(!updateDescription);
    if (updateDescription) {
      try {
        axios
          .post(`/session_timestamps/${timeStamp?.id}/update_timestamp.json`, {
            description: description,
          })
          .then((res) => {
            updateTimestamps(res.data);
          });
      } catch (e) {
        console.log(e);
      }
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
            label="Multiline"
            multiline
            rows={4}
            onChange={(e) => setDescription(e.target.value)}
            defaultValue={description}
          />
        ) : (
          <Typography style={{ color: "#454F5B", fontSize: "14px" }}>
            {timeStamp?.timestamp} | {timeStamp?.description}
          </Typography>
        )}
        <Button
          onClick={handleSubmit}
          variant="outlined"
          style={{ borderRadius: "20px", color: "#475569" }}
          fullWidth
        >
          {updateDescription ? "Save Description" : "Edit Description"}
        </Button>
      </Stack>
    </Box>
  );
}

export default TimeStamp;
