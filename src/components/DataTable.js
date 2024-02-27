import React from "react";
import { styled } from '@mui/material/styles';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#FAFAFA",
    color:'#cccccc'
    // color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    fontWeight:550,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.common.white,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const DataTable = (props) => {
  const {rows,page,rowsPerPage,handleIdentifierClick,handleFilePathClick}=props;
  

  const identifierClickHandler=(id)=>{
     handleIdentifierClick(id);
  }

  const filePathClickHandler=()=>{
    handleFilePathClick();
  }

  return (
    <div>
      <TableContainer  sx={{padding:"1.5rem", width:"100%" }}>
        <Table sx={{ width: "100%" }} aria-label="simple table">
          <TableHead>
            <StyledTableRow sx={{borderBottom:"0.01rem solid #cccccc"}}>
              <StyledTableCell >Document Identifier</StyledTableCell>
              <StyledTableCell align="center">Document Name</StyledTableCell>
              {/* <StyledTableCell align="center">File Path</StyledTableCell> */}
              <StyledTableCell align="center">Evaluation Date</StyledTableCell>
              <StyledTableCell align="right">Review Status</StyledTableCell>
           
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {rows?.slice(rowsPerPage*(page-1),(rowsPerPage*(page-1))+rowsPerPage)
            .map((row) => (
              <StyledTableRow
                key={row.identifier}
                sx={{ "&:last-child td, &:last-child th": {borderBottom:"0.01rem solid #cccccc"} }}
              >
            
                <StyledTableCell sx={{color:'blue', cursor:'pointer'}} component="th" scope="row" onClick={()=>identifierClickHandler(row.Identifier)}>
                  {row.Identifier}
                </StyledTableCell>
                <StyledTableCell sx={{color:'blue', cursor:'pointer'}} align="center" onClick={filePathClickHandler}>{row.Document_Name}</StyledTableCell>
                {/* <StyledTableCell align="center" >{row.Document_Path}</StyledTableCell> */}
                <StyledTableCell align="center">{row.Document_Evaluation_dts}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.Document_Review_Status}
                </StyledTableCell>
              </StyledTableRow>
            ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DataTable;
