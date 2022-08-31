import { Stack, Button, Typography, Box } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import TimeStamp from "./Timestamp";
import { TimeStampType, ActiveSession } from "../../utils/types/user";
import axios from "../../utils/axios";

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
  const [activeSession, setActiveSession] = useState<ActiveSession>();
  console.log(activeSession);
  const [sessionTimestamps, setSessionTimestamps] = useState<TimeStampType[]>(
    []
  );

  const handleAddTimestamp = () => {
    try {
      axios
        .post("/session_timestamps/add_timestamp.json", {
          session_id: activeSession?.id,
          session_time: activeSession?.session_time,
        })
        .then((res) => {
          setSessionTimestamps([...sessionTimestamps, res.data.timestamp]);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdateTimestamp = (res: TimeStampType) => {
    const index = sessionTimestamps.findIndex(
      (timestamp) => timestamp.id === res.id
    );
    if (index > -1) {
      const updatedTimestamp = [...sessionTimestamps];
      updatedTimestamp[index] = res;
      setSessionTimestamps(updatedTimestamp);
    }
  };

  useEffect(() => {
    console.log("test");
    try {
      axios.get("/session_timestamps/active_session.json").then((res) => {
        setActiveSession(res.data.active_session);
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

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
            onClick={handleAddTimestamp}
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

      <StyledStack spacing={2} key={sessionTimestamps.length}>
        {sessionTimestamps &&
          sessionTimestamps.map((timestamp) => {
            return (
              <TimeStamp
                timeStamp={timestamp}
                key={timestamp.id}
                updateTimestamps={handleUpdateTimestamp}
              />
            );
          })}
      </StyledStack>
    </StyledPage>
  );
}

export default SessionTab;
