import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import firebase from './firebase.js'
import Modal from '@material-ui/core/Modal';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';


import {
  Box,
  Button,
  CardContent,
  Card,
  TextField,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  makeStyles
} from '@material-ui/core';
import axios from 'axios';


function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  table: {
    minWidth: 650,
    widht: 800
  },
}));

function getRandom(length) {

  return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));

}
const data = [
  {
    id: 50 + rand(),
    question: 'What is the name of the crop?',
    askedBy: 'Jafar',
    askedOn: "23-Nov-2021",
    attachements: "link",
    answer: "",
    answeredBy: "",
    status: "",
    answerPics: ""
  },
  {
    id: 50 + rand(),
    question: 'What is the name of crop?',
    askedBy: 'Jafar',
    askedOn: "23-Nov-2021",
    attachements: "link",
    answer: "",
    answeredBy: "",
    status: "",
    answerPics: ""
  }
];



function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const QuestionTable = ({ className, ...rest }) => {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [files, setFiles] = useState("")
  const [usersData, setUsersData] = useState({})
  const [answers, setAnswer] = useState("")
  const handleChanges = (event) => {
    setAnswer(
      event.target.value
    );
  };

  const handleClose = () => {
    console.log("On Close")
    setOpen(false);
    setUsersData("")
  };


  const handleChange = (files) => {
    setFiles(files)
  }


  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2>Farmer's Query</h2>
      <p>
        Write your answer below. Share your contact info on your own risk. You can also attach pictures if you want.
    </p>
      <form
        className={clsx(classes.root, className)}
        {...rest}
      >
        <Card>
          <CardHeader
            subheader=""
            title="Answer"
          />

          <Divider />

          <CardContent>
            <TextField
              fullWidth
              label="Question"
              margin="normal"
              name="question"
              type="question"
              variant="outlined"
              disabled
              value={usersData.question}
            />
            <TextField
              fullWidth
              label="Answer"
              margin="normal"
              name="answer"
              type="answer"
              variant="outlined"
              onChange={handleChanges}
            />
            <input type="file" name="file" multiple="multiple" onChange={(event) => {
              handleChange(event.target.files)
            }} />
          </CardContent>
          <Divider />
          <Box
            display="flex"
            justifyContent="flex-end"
            p={2}
          >
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                var index
                let bucketName = "default"
                var fileLinks = []

                for (index = 0; index < files.length; index++) {
                  let file = files[index]
                  var add = getRandom(10)
                  console.log((file.name))
                  let storageRef = firebase.storage().ref(`${add}${file.name}`)
                  let uploadTask = storageRef.put(file)
                  uploadTask.on('state_changed',
                    (snapshot) => {
                      // Observe state change events such as progress, pause, and resume
                      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                      console.log('Upload is ' + progress + '% done');
                      switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED: // or 'paused'
                          // console.log('Upload is paused');
                          break;
                        case firebase.storage.TaskState.RUNNING: // or 'running'
                          // console.log('Upload is running');
                          break;
                      }

                    },
                    (error) => {
                    },
                    () => {
                      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        fileLinks.push(downloadURL);
                        var ids = usersData.id
                        console.log(usersData.id)
                        firebase.database().ref('UserQueriesAnswered/' + `${ids}`).set({
                          ...usersData,
                          answer: answers,
                          status: "Uploaded",
                          answerPics: fileLinks.join(),
                          answeredBy: JSON.parse(localStorage.getItem("userinfo")).displayName
                        })
                        firebase.database().ref('UserQueries/' + `${ids}`).set({})
                        window.location.reload()
                        setOpen(false);

                      });
                    }
                  );
                  if (index == files.length - 1) {
                    console.log(fileLinks)


                  }
                }

              }}
            >
              Submit Answer
        </Button>
            <Button
              onClick={handleClose}
              variant="contained"
            >
              Cancel
        </Button>
          </Box>
        </Card>
      </form>

    </div>
  );
  useEffect(() => {
    const itemsRef = firebase.database().ref('UserQueries');
    // itemsRef.set(data)
    var datas = []
    itemsRef.on('value', (snapshot) => {
      datas.push(snapshot.val());
      // console.log(snapshot.val())

      if (datas[0] == null) {
        setOrders([])
        console.log(orders)
      }
      else {
        setOrders(datas[0])
      }
    })
  }, [])

  return (
    <div>
      <Card
        className={clsx(classes.root, className)}
        {...rest}
      >
        <Box
          display="flex"

          style={{ marginLeft: 20 }}
        ><CardHeader title="Question / Answers" />
          <div style={{ margin: 10 }}>
            <Box
              display="flex"
              justifyContent="flex-end"
              style={{ marginLeft: 20 }}
            ></Box>

            <Button
              color="primary"
              variant="contained"
              
            >
              History
        </Button>
          </div>

        </Box>


        <Divider />

        <PerfectScrollbar>

          <Box minWidth={800}>

            <Table>

              <TableHead>
                <TableRow>
                  <TableCell>
                    Question
                </TableCell>
                  <TableCell>
                    Asked By
                </TableCell>
                  <TableCell sortDirection="desc">
                    <Tooltip
                      enterDelay={300}
                      title="Sort"
                    >
                      <TableSortLabel
                        active
                        direction="desc"
                      >
                        Date
                    </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    Attachments
                </TableCell>
                  <TableCell>
                    Answer
                </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {orders.length > 0 && orders.map((order, index) => (
                  <TableRow
                    hover
                  >
                    <TableCell>
                      {order.question}
                    </TableCell>
                    <TableCell>
                      {order.askedBy}
                    </TableCell>
                    <TableCell>
                      {order.askedOn}
                    </TableCell>
                    <TableCell>
                      {order.attachments}
                    </TableCell>
                    <TableCell>
                      <Button onClick={(() => {
                        setOpen(true);
                        setUsersData({
                          ...order,
                          id: index
                        })
                        {
                          console.log({
                            ...order,
                            id: index
                          })
                        }
                      })} style={{ backgroundColor: '#61A979', color: 'white' }}>
                        Answer
                    </Button>
                    </TableCell>
                  </TableRow>
                )
                )}

              </TableBody>

            </Table>
          </Box>
        </PerfectScrollbar>
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
        </Box>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>

    </div>
  );
};

QuestionTable.propTypes = {
  className: PropTypes.string
};

export default QuestionTable;
