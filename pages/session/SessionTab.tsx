import { Stack, Button, Typography, Box, Card } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import React, { useState } from "react";
import TimeStamp from "./Timestamp";
import { TimeStampType } from "../../utils/types/user";

const StyledPage = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const StyledStack = styled(Stack)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "25px",
  width: "100%",
  [theme.breakpoints.up("md")]: {
    width: "50%",
  },
}));

function SessionTab() {
  const [sessionTimestamps, setSessionTimestamps] = useState<TimeStampType[]>([
    {
      id: "1",
      description: "Test description Test description",
      session_id: "2",
      recording_time: "12:45",
    },
  ]);
  return (
    <StyledPage>
      <StyledStack
        spacing={2}
        sx={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.08)", padding: "25px" }}
      >
        <Stack direction="column" spacing={2} alignItems="center">
          <img
            src="https://sphere-public.s3.eu-west-2.amazonaws.com/sphere_blue.svg"
            alt="logo"
            width="140"
          />
          <Typography style={{ textAlign: "center" }}>
            Timestamps allow you to easily save points in your sessions so that
            you can review them later!
          </Typography>
          <Button
            variant="contained"
            fullWidth
            style={{ backgroundColor: "#101658", borderRadius: "20px" }}
          >
            Save Timestamp
          </Button>
        </Stack>
        <Box
          style={{ border: "1px solid #E2E8F0", width: "300px", height: "0px" }}
        />
        <Typography style={{ color: "#334155", fontWeight: "bold" }}>
          Saved Timestamps
        </Typography>
      </StyledStack>

      <StyledStack spacing={2}>
        {sessionTimestamps &&
          sessionTimestamps.map((timestamp) => {
            return <TimeStamp timeStamp={timestamp} key={timestamp.id} />;
          })}
      </StyledStack>
    </StyledPage>
  );
}

export default SessionTab;
