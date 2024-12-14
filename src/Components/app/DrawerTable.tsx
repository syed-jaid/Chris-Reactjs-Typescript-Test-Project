import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.common.white,
  },

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function DrawerTable({ rows }: any) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">QS</StyledTableCell>
            <StyledTableCell align="left">CTR</StyledTableCell>
            <StyledTableCell align="left">CVR</StyledTableCell>
            <StyledTableCell align="left">Leads</StyledTableCell>
            <StyledTableCell align="left">CPA</StyledTableCell>
            <StyledTableCell align="left">Costs</StyledTableCell>
            <StyledTableCell align="left">Revenue</StyledTableCell>
            <StyledTableCell align="left">ROAS</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow key={rows?.name}>
            <StyledTableCell align="left">{rows?.QS}/10</StyledTableCell>
            <StyledTableCell align="left">{rows?.CTR}%</StyledTableCell>
            <StyledTableCell align="left">{rows?.CVR}%</StyledTableCell>
            <StyledTableCell align="left">{rows?.Leads}</StyledTableCell>
            <StyledTableCell align="left">${rows?.CPA}</StyledTableCell>
            <StyledTableCell align="left">${rows?.Costs}</StyledTableCell>
            <StyledTableCell align="left">${rows?.Revenue}</StyledTableCell>
            <StyledTableCell align="left">{rows?.ROAS}x</StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
