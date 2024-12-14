import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Flex } from "@radix-ui/themes";

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

export default function Tables({
  setIsDrawerOpen,
  tabRowIndex,
  setTabRowIndex,
  rows,
}: any) {
  return (
    <TableContainer component={Paper} elevation={0}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell align="right">QS</StyledTableCell>
            <StyledTableCell align="right">CTR</StyledTableCell>
            <StyledTableCell align="right">CVR</StyledTableCell>
            <StyledTableCell align="right">Leads</StyledTableCell>
            <StyledTableCell align="right">CPA</StyledTableCell>
            <StyledTableCell align="right">Costs</StyledTableCell>
            <StyledTableCell align="right">Revenue</StyledTableCell>
            <StyledTableCell align="right">ROAS</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any, index: any) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                <Flex gap="2" align="center">
                  {index === tabRowIndex ? (
                    <img
                      onClick={() => {
                        setIsDrawerOpen(false);
                        setTabRowIndex("");
                      }}
                      style={{ cursor: "pointer" }}
                      src="https://i.ibb.co.com/1bcQq8n/Panel-Opener-1.png"
                      alt=""
                    />
                  ) : (
                    <img
                      onClick={() => {
                        setIsDrawerOpen(true);
                        setTabRowIndex(index);
                      }}
                      style={{ cursor: "pointer" }}
                      src="https://i.ibb.co.com/swmRFh5/Panel-Opener.png"
                      alt=""
                    />
                  )}
                  {row.name}
                </Flex>
              </StyledTableCell>
              <StyledTableCell align="right">{row.QS}/10</StyledTableCell>
              <StyledTableCell align="right">{row.CTR}%</StyledTableCell>
              <StyledTableCell align="right">{row.CVR}%</StyledTableCell>
              <StyledTableCell align="right">{row.Leads}</StyledTableCell>
              <StyledTableCell align="right">${row.CPA}</StyledTableCell>
              <StyledTableCell align="right">${row.Costs}</StyledTableCell>
              <StyledTableCell align="right">${row.Revenue}</StyledTableCell>
              <StyledTableCell align="right">{row.ROAS}x</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
