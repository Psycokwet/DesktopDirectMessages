import Head from "next/head";
import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import VisibilityIcon from "@mui/icons-material/Visibility";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import Link from "../components/Link";
import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Keychain from "../lib/shared/Keychain";

import electron from "electron";
const ipcRenderer = electron.ipcRenderer;
import { useRouter } from "next/router";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      //   backgroundColor: "LIGHTSKYBLUE",
      textAlign: "center",
      paddingTop: theme.spacing(4),
    },
    grid: {
      item: {
        width: "80%",
      },
      margin: "0",
      width: "100%",
    },
    form: {
      top: "30px",
      width: "100%",
    },
  })
);

function Home() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isPwdProtected, setIsPwdProtected] = useState(false);
  const [isHiddenPwd, setisHiddenPwd] = useState(true);
  const classes = useStyles({});
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleClick = () => setOpen(true);

  function clickConnect(e) {
    e.preventDefault();
    // setLoading(() => true);
    ipcRenderer.send(Keychain.connection, {
      userName: userName,
      password: password,
    });
  }

  return (
    <React.Fragment>
      <Head>
        <title>Sign in Twitter DDM</title>
      </Head>
      <div className={classes.root}>
        <form onSubmit={clickConnect} className={classes.form}>
          <Grid
            className={classes.grid}
            container
            direction="column"
            justifyContent="center"
            spacing={3} // alignItems="stretch"
          >
            <Grid item xs={12}>
              <TextField
                style={{ width: 212 }}
                placeholder="Username"
                // variant="outlined"
                value={userName}
                onChange={(e) =>
                  setUserName(() => {
                    return e.target.value;
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                placeholder="Password"
                type={isHiddenPwd === true ? "password" : "text"}
                value={password}
                onChange={(e) => {
                  if (!isPwdProtected) setPassword(e.target.value);
                  else {
                    setIsPwdProtected(false);
                    setPassword("");
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <div
                    // className={{
                    //   backgroundColor: "white",
                    // }}
                    >
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          if (!isPwdProtected)
                            setisHiddenPwd((current) => !current);
                        }}
                      >
                        <VisibilityIcon
                          style={{
                            filter: `invert(${
                              isHiddenPwd === true ? 50 : 100
                            }%)`,
                          }}
                        />
                      </IconButton>
                    </div>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                autoFocus
              >
                Sign in
              </Button>
            </Grid>
            {/* <Grid>
              <IsLoading loading={loading}></IsLoading>
            </Grid> */}
          </Grid>
        </form>

        {/* <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Super Secret Password</DialogTitle>
          <DialogContent>
            <DialogContentText>1-2-3-4-5</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={handleClose}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Typography variant="h4" gutterBottom>
          Material-UI
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          with Nextron
        </Typography>
        <img src="/images/logo.png" />
        <Typography gutterBottom>
          <Link href="/next">Go to the next page</Link>
        </Typography>
        <Button variant="contained" color="secondary" onClick={handleClick}>
          Super Secret Password
        </Button> */}
      </div>
    </React.Fragment>
  );
}

export default Home;
