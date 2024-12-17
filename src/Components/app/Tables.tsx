import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Flex } from "@radix-ui/themes";

// Define the props and row types
interface RowData {
  name: string;
  QS: number;
  CTR: number;
  CVR: number;
  Leads: number;
  CPA: number;
  Costs: number;
  Revenue: number;
  ROAS: number;
}

interface TablesProps {
  setIsDrawerOpen: (isOpen: boolean) => void;
  tabRowIndex: number | null;
  setTabRowIndex: (index: number | null) => void;
  rows: RowData[];
}

// Styled components for table cells and rows
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

// Main Tables component
export default function Tables({
  setIsDrawerOpen,
  tabRowIndex,
  setTabRowIndex,
  rows,
}: TablesProps) {
  const handleRowToggle = (index: number) => {
    if (tabRowIndex === index) {
      setIsDrawerOpen(false);
      setTabRowIndex(null);
    } else {
      setIsDrawerOpen(true);
      setTabRowIndex(index);
    }
  };

  return (
    <TableContainer component={Paper} elevation={0}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        {/* Table Head */}
        <TableHead>
          <TableRow>
            <StyledTableCell />
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

        {/* Table Body */}
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={row.name}>
              {/* Row with toggle image */}
              <StyledTableCell component="th" scope="row">
                <Flex gap="2" align="center">
                  <img
                    onClick={() => handleRowToggle(index)}
                    style={{ cursor: "pointer" }}
                    src={
                      index === tabRowIndex
                        ? "https://i.ibb.co/1bcQq8n/Panel-Opener-1.png"
                        : "https://i.ibb.co/swmRFh5/Panel-Opener.png"
                    }
                    alt="Toggle Icon"
                  />
                  {row.name}
                </Flex>
              </StyledTableCell>
              {/* Remaining row data */}
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
