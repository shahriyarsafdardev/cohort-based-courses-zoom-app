import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";

type ConfirmationAlertProps = {
  title: string;
  alertText: JSX.Element | string;
  open: boolean;
  onCancel: Function;
  onConfirm: Function;
};

const StyledButtonCancel = styled(Button)(({ theme }) => ({
  borderRadius: "20px",
  width: "90%",
  fontSize: "14px",
  textTransform: "none",
  margin: 0,
  color: "#000000",
}));

const StyledButtonConfirm = styled(Button)(({ theme }) => ({
  borderRadius: "20px",
  backgroundColor: "#101658",
  width: "90%",
  fontSize: "14px",
  textTransform: "none",
  margin: 0,
  "&:hover": { backgroundColor: "#101658" },
}));

const ConfirmationAlert = ({
  title,
  alertText,
  onCancel,
  onConfirm,
  open,
}: ConfirmationAlertProps) => (
  <Dialog open={open} maxWidth="xs" fullWidth>
    <Box style={{ padding: "16px" }}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        <Typography
          sx={{ fontWeight: 400, textAlign: "center", color: "#334155" }}
        >
          {alertText}
        </Typography>
      </DialogContent>
      <DialogActions>
        <StyledButtonCancel
          variant="outlined"
          onClick={() => onCancel()}
          style={{ width: "-webkit-fill-available" }}
        >
          Cancel
        </StyledButtonCancel>
        <StyledButtonConfirm
          variant="contained"
          onClick={() => onConfirm()}
          style={{ width: "-webkit-fill-available" }}
        >
          Confirm
        </StyledButtonConfirm>
      </DialogActions>
    </Box>
  </Dialog>
);

export default ConfirmationAlert;
