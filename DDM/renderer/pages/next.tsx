import React from "react";
import Head from "next/head";
import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "../components/Link";
import Grid from "@mui/material/Grid";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    messagesBackground: {
      background: "#2eafff",
      height: "100vh",
      paddingTop: theme.spacing(4),
    },
    titlesMessagesBackground: {
      paddingTop: theme.spacing(4),
    },
    root: {
      textAlign: "center",
    },
  })
);

function Next() {
  const classes = useStyles({});

  return (
    <React.Fragment>
      <Head>
        <title>Directs Messages</title>
      </Head>
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={3} className={classes.titlesMessagesBackground}>
            Hello bob
          </Grid>
          <Grid item xs={9} className={classes.messagesBackground}>
            <Link href="/home">Go to the home page</Link>
          </Grid>
        </Grid>
        {/* <Typography variant="h4" gutterBottom>
          Material-UI
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          with Nextron
        </Typography>
        <Typography gutterBottom>
        </Typography>
        <Button variant="contained" color="primary">
          Do nothing button
        </Button> */}
      </div>
    </React.Fragment>
  );
}

export default Next;
