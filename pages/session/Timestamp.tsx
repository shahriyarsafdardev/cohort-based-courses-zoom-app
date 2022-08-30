import React, { useState } from "react";
import { TimeStampType } from "../../utils/types/user";
import { Box, Typography, Stack, Button, TextField } from "@material-ui/core";

function TimeStamp({ timeStamp }: { timeStamp?: TimeStampType }) {
  const handleSubmit = () => {
    setUpdateDescription(!updateDescription);
  };
  const [updateDescription, setUpdateDescription] = useState(false);
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
            defaultValue={timeStamp?.description || ""}
          />
        ) : (
          <Typography style={{ color: "#454F5B", fontSize: "14px" }}>
            {timeStamp?.recording_time} | {timeStamp?.description}
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
