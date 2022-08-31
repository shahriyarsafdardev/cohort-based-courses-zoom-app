import {
  Stack,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@material-ui/core";
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
          setSessionTimestamps([res.data.timestamp, ...sessionTimestamps]);
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
    try {
      axios.get("/session_timestamps/active_session.json").then((res) => {
        setActiveSession(res.data?.active_session || []);
        setSessionTimestamps(res.data?.timestamps);
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  if (typeof activeSession === "undefined") {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <StyledPage>
      {activeSession && activeSession.id ? (
        <>
          <StyledStack
            spacing={2}
            sx={{
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.08)",
              padding: "25px",
            }}
          >
            <Stack direction="column" spacing={2} alignItems="center">
              <img src="/sphere_blue.svg" alt="logo" width="140" />
              <Typography style={{ textAlign: "center" }}>
                Timestamps allow you to easily save points in your sessions so
                that you can review them later!
              </Typography>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#101658",
                  borderRadius: "20px",
                  width: "90%",
                }}
                onClick={handleAddTimestamp}
              >
                Save Timestamp
              </Button>
            </Stack>
            <Box
              style={{
                border: "1px solid #E2E8F0",
                width: "300px",
                height: "0px",
              }}
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
        </>
      ) : (
        <Box>Session is not live</Box>
      )}
    </StyledPage>
  );
}

export default SessionTab;
