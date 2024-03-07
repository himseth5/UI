import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect } from "react";
import { useContext } from "react";
import { appContext } from "../../context/AppContext";
import { useState } from "react";

 function CircleLoader() {
  const { loading } = useContext(appContext);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(loading);
  }, [loading]);
  const handleClose = () => {
    setOpen(loading);
  };

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
export default React.memo(CircleLoader)

