import { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Paper, CardActionArea, CardMedia, Grid, TableContainer, Table, TableBody, TableHead, TableRow, TableCell, Button, CircularProgress, Divider } from "@material-ui/core";
import cblogo from "./cblogo.PNG";
import cblogo2 from "./cblogo2.PNG";
import image from "./bg.png";
// import image2 from "./bg2.png";
import { DropzoneArea } from 'material-ui-dropzone';
import { common } from '@material-ui/core/colors';
import Clear from '@material-ui/icons/Clear';
import { Link } from "react-scroll";

import './aboutpage.css';

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(common.white),
    backgroundColor: common.white,
    '&:hover': {
      backgroundColor: '#ffffff7a',
    },
  },
}))(Button);
const axios = require("axios").default;

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 0.01,
  },
  clearButton: {
    width: "-webkit-fill-available",
    borderRadius: "15px",
    padding: "15px 22px",
    color: "#000000a6",
    fontSize: "20px",
    fontWeight: 900,
  },
  root: {
    maxWidth: 345,
    flexGrow: 1,
  },
  media: {
    height: 400,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  gridContainer: {
    justifyContent: "center",
    padding: "2em 0.5em 0 0.5em",
  },
  //background image dimensions;
  mainContainer: {
    backgroundImage: `url(${image})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: "130vh",
    marginTop: "8px",
  },
  imageCard: {
    margin: "auto",
    padding: 100,
    maxWidth: 400,
    height: 500,
    alignItems: 'center',
    backgroundColor: 'transparent',
    boxShadow: '0px 9px 70px 0px rgb(0 0 0 / 70%) !important',
    borderRadius: '15px',
  },
  imageCardEmpty: {
    height: 'auto',
  },
  noImage: {
    margin: "auto",
    width: 400,
    height: "100 !important",
  },
  input: {
    display: 'none',
    margin: "auto",
    padding: 100,
    maxWidth: 400,
    height: 500,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  uploadIcon: {
    background: 'white',
  },
  tableContainer: {
    backgroundColor: 'transparent !important',
    boxShadow: 'none !important',
  },
  table: {
    backgroundColor: 'transparent !important',
  },
  tableHead: {
    backgroundColor: 'transparent !important',
  },
  tableRow: {
    backgroundColor: 'transparent !important',
  },
  tableCell: {
    fontSize: '22px',
    backgroundColor: 'transparent !important',
    borderColor: 'transparent !important',
    color: '#000000a6 !important',
    fontWeight: 'bolder',
    padding: '1px 24px 1px 16px',
  },
  tableCell1: {
    fontSize: '14px',
    backgroundColor: 'transparent !important',
    borderColor: 'transparent !important',
    color: '#000000a6 !important',
    fontWeight: 'bolder',
    padding: '1px 24px 1px 16px',
  },
  tableBody: {
    backgroundColor: 'transparent !important',
  },
  text: {
    color: 'white !important',
    textAlign: 'center',
  },
  buttonGrid: {
    maxWidth: "416px",
    width: "100%",
  },
  detail: {
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  appbar: {
    background: 'rgb(7, 87, 38)',
    boxShadow: 'none',
    color: 'white'
  },
  loader: {
    color: '#be6a77 !important',
  },
  margin: {
    marginLeft: "35px"
  },
  underlined: {
    textDecoration: 'none',
    color: 'white',
    '&:hover': {
      cursor: 'pointer',
    },
  },

}));
export const ImageUpload = () => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [data, setData] = useState();
  const [image, setImage] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  let confidence = 0;

  const sendFile = async () => {
    if (image) {
      let formData = new FormData();
      formData.append("file", selectedFile);
      let res = await axios({
        method: "post",
        url: process.env.REACT_APP_API_URL,
        data: formData,
      });
      if (res.status === 200) {
        setData(res.data);
      }
      setIsloading(false);
    }
  }

  const clearData = () => {
    setData(null);
    setImage(false);
    setSelectedFile(null);
    setPreview(null);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (!preview) {
      return;
    }
    setIsloading(true);
    sendFile();
  }, [preview]);

  const onSelectFile = (files) => {
    if (!files || files.length === 0) {
      setSelectedFile(undefined);
      setImage(false);
      setData(undefined);
      return;
    }
    setSelectedFile(files[0]);
    setData(undefined);
    setImage(true);
  };


  return (
    <React.Fragment>
      <AppBar position="sticky" className={classes.appbar}>
        <Toolbar>
          <Avatar src={cblogo}></Avatar>
          <div className={classes.grow} />
          <Typography className={classes.title} variant="h5">
          <Link
              to="/"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
              className = {classes.underlined}
            >
              TRAFFIC GUARD
            </Link>
          </Typography>
          {/* <div style={{ marginRight: '700px' }} /> */}
          <div className={classes.margin}  />
          <Typography className={classes.title} variant="h6">
          <Link
              to="About"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
              className = {classes.underlined}
            >
               About Us
             
            </Link>
          </Typography>
<Typography variant="body1" style={{ fontStyle: 'italic' , marginLeft: '520px' }}>
Empowering roads with AI vigilance: A safer journey, one click at a time!
</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth={false} className={classes.mainContainer} disableGutters={true}>
        <Grid
          className={classes.gridContainer}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12}>
            <Card className={`${classes.imageCard} ${!image ? classes.imageCardEmpty : ''}`}>
              {image && <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={preview}
                  component="image"
                  title="Contemplative Reptile"
                />
              </CardActionArea>
              }
              {!image && <CardContent className={classes.content}>
                <DropzoneArea
                  acceptedFiles={['image/*']}
                  dropzoneText={"Drag and drop an image to process"}
                  onChange={onSelectFile}
                />
              </CardContent>}
              {data && <CardContent className={classes.detail}>
                <TableContainer component={Paper} className={classes.tableContainer}>
                  <Table className={classes.table} size="small" aria-label="simple table">
                    <TableHead className={classes.tableHead}>
                      <TableRow className={classes.tableRow}>
                        <TableCell className={classes.tableCell1}>Label:</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className={classes.tableBody}>
                      <TableRow className={classes.tableRow}>
                        <TableCell component="th" scope="row" className={classes.tableCell}>
                          {data.class}
                        </TableCell>
          
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>}
              {isLoading && <CardContent className={classes.detail}>
                <CircularProgress color="secondary" className={classes.loader} />
                <Typography className={classes.title} variant="h6" noWrap>
                  Processing
                </Typography>
              </CardContent>}
            </Card>
          </Grid>
          {data &&
            <Grid item className={classes.buttonGrid} >

              <ColorButton variant="contained" className={classes.clearButton} color="primary" component="span" size="large" onClick={clearData} startIcon={<Clear fontSize="large" />}>
                Clear
              </ColorButton>
            </Grid>}
        </Grid >
      </Container >
      <div id = "About">
        {/* <h1>
          About Traffic Guard
        </h1>

      <h4>Traffic accidents and fires are major problems in urban areas, causing significant loss of life and property. Early detection of these events can help to mitigate their impact by allowing for timely intervention. </h4>
<Divider>

</Divider>
Traffic Guard is trained on a massive dataset of images labeled with the corresponding traffic conditions or incidents and can identify traffic conditions and incidents in real-time.

It can provide early warning of traffic congestion, accidents, and other hazards, allowing motorists and emergency responders to take appropriate action. It can also be used to develop new traffic management systems that can dynamically adjust traffic signals and signage to improve traffic flow. */}
<div className="about-container">
      <div className="about-content">
        <h1 className="about-title">About Traffic Guard</h1>
        <p className="about-details">
        Traffic Guard is trained on a massive dataset of images labeled with the corresponding traffic conditions or incidents and is able to identify traffic conditions and incidents from real world images.
        </p>
        {/* <hr className="divider" /> */}
        <p className="about-details">
        Our system has the potential to revolutionize road safety and traffic efficiency. It can provide early warning of traffic congestion, accidents, and other hazards, allowing motorists and emergency responders to take appropriate action. It can also be used to develop new traffic management systems that can dynamically adjust traffic signals and signage to improve traffic flow.
        </p>
        {/* <p className="about-details">
          It can provide early warning of traffic congestion, accidents, and other hazards, allowing motorists and
          emergency responders to take appropriate action. It can also be used to develop new traffic management
          systems that can dynamically adjust traffic signals and signage to improve traffic flow.
        </p> */}
        <button className="try-now-button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Try Now
          </button>
      </div>
      <div className="image-container">
          <img src={cblogo2} className="about-image" />
        </div>
    </div>

      </div>
    </React.Fragment >
  );
};
