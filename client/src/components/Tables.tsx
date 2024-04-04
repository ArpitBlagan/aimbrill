import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { useGetTablesQuery } from "../services/Table";
import { useState } from "react";
const Tables = () => {
  const { data, isLoading, error } = useGetTablesQuery();
  const [response, setRes] = useState<any[] | null>(null);
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          justifyItems: "center",
          margin: "10px 0px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <div style={{ margin: "10px 5px" }}>
      {data &&
        data.map((ele: any, index: any) => {
          const ff = JSON.parse(ele.data);
          console.log(ff);
          const keys = Object.keys(ff[0]);
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
              </div>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      {keys.map((e: any) => {
                        return <TableCell>{e}</TableCell>;
                      })}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {ff.map((ee: any) => {
                      return (
                        <TableRow>
                          {keys.map((kk, indexx) => {
                            return <TableCell key={indexx}>{ee[kk]}</TableCell>;
                          })}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          );
        })}
    </div>
  );
};

export default Tables;
