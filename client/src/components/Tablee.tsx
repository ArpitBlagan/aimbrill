import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableCell } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import toast from "react-hot-toast";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Chart from "./Chart";
const charts = ["Pie Chart", "Line Chart", "Bar Chart"];
const Tablee = () => {
  const [file, setF] = useState<string | null>(null);
  const [response, setResponse] = useState<any[] | null>(null);
  const [loading, setL] = useState(false);
  const [open, setOpen] = useState(false);
  const [chartType, setCT] = useState<null | string>(null);
  const [field, setField] = useState<null | string>(null);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div style={{ margin: "20px 10px" }}>
      <h2>Add Table.</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          justifyItems: "center",
        }}
      >
        <input
          type="file"
          onChange={(e) => {
            //@ts-ignore
            setF(e.target.files[0]);
          }}
          style={{ borderRadius: "20px", padding: "10px", borderColor: "gray" }}
        />
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          onClick={async (e) => {
            e.preventDefault();
            console.log(file);
            if (!file) {
              return;
            }
            toast("uploading file wait a second");
            try {
              setL(true);
              const formData = new FormData();
              formData.append("file", file);
              const res = await axios.post(
                "http://localhost:4000/add/file",
                formData
              );
              console.log(res.data);

              if (response) {
                setResponse((prev) => {
                  //@ts-ignore
                  return [...prev, JSON.parse(res.data.data)];
                });
              } else {
                setResponse([JSON.parse(res.data.data)]);
              }
              toast.success(
                "uploaded successfully you can see the table below!"
              );
              setF(null);
              setL(false);
            } catch (err) {
              console.log(err);
              toast.error("something went wrong!");
              setL(false);
            }
          }}
        >
          Upload
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "10px 25px",
          gap: "10px",
        }}
      >
        {response &&
          response.map((ele, index) => {
            console.log(ele);
            const keys = Object.keys(ele[index]);
            console.log(keys);
            return (
              <div key={index}>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    justifyItems: "center",
                    marginBottom: "15px",
                  }}
                >
                  <h3>{index + 1}.</h3>
                  <Button variant="outlined" onClick={handleClickOpen}>
                    Chart
                  </Button>
                  <Dialog
                    open={open}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                  >
                    <DialogTitle>{"Chart"}</DialogTitle>
                    <DialogContent
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "10px",
                      }}
                    >
                      <select
                        style={{ padding: "5px 5px" }}
                        onChange={(e) => {
                          setCT(e.target.value);
                        }}
                      >
                        <option>Select the Chart Type</option>
                        {charts.map((el, index) => {
                          return (
                            <option key={index} value={el}>
                              {el}
                            </option>
                          );
                        })}
                      </select>
                      <select
                        style={{ padding: "5px 5px" }}
                        onChange={(e) => {
                          setField(e.target.value);
                        }}
                      >
                        <option>Select the filed</option>
                        {keys.map((el, index) => {
                          return (
                            <option key={index} value={el}>
                              {el}
                            </option>
                          );
                        })}
                      </select>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Show Chart</Button>
                    </DialogActions>
                  </Dialog>
                </div>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        {keys.map((ele: any) => {
                          return <TableCell>{ele}</TableCell>;
                        })}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {ele.map((ee: any) => {
                        return (
                          <TableRow>
                            {keys.map((kk, indexx) => {
                              return (
                                <TableCell key={indexx}>{ee[kk]}</TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
                {field && chartType && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      justifyItems: "center",
                    }}
                  >
                    <Chart field={field} chartType={chartType} data={ele} />

                    <h1 style={{ textAlign: "center" }}>No Preview</h1>
                  </div>
                )}
              </div>
            );
          })}
      </div>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            justifyItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <h5 style={{ textAlign: "center" }}>No Record !</h5>
      )}
    </div>
  );
};

export default Tablee;
