import React, { ReactElement, useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Container } from "@material-ui/core";
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useTheme } from '@mui/material/styles';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import EditIcon from '@mui/icons-material/Edit';
import './Components.css'
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const StyledTableCell = styled(TableCell)({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#cdd3dc',
    color: '#000',
    padding: '10px',
    fontWeight: 'bold',
  },
})

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//     [`&.${tableCellClasses.head}`]: {
//       backgroundColor:'#cdd3dc',
//       color: '#000',
//     },
//     [`&.${tableCellClasses.body}`]: {
//       fontSize: 14,
//     },
//   }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
export default function CustomTable(props: any): ReactElement {
  const [pagenew, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [result, setResult] = React.useState(props.columns);
  useEffect(() => {
    setResult(result);
  }, []);

  const handleChangePage = (event: any, newPage: React.SetStateAction<number>) => setPage(newPage);

  const handleChangeRowsPerPage = (event: { target: { value: string; }; }) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const navigate = useNavigate();
  function editrow(val: number) {
    if (props.title === 'Country Master') {
      navigate('/master/country', { state: { val: val } })
    } if (props.title === 'City Master') {
      navigate('/', { state: { val: val } })
    }
  }

  return (
    <>
      {/* {props.handleCallback('hiiiii')} */}
      <Container>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow >
              {props.head.map((a: any, i: any) => (
                <StyledTableCell align="center" key={i}>{a}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.title === 'City Master' &&
              <>
                {result.slice(pagenew * rowsPerPage, pagenew * rowsPerPage + rowsPerPage).map((row: any, i: number) => (
                  <TableRow key={i}>
                    <TableCell align="center">{row.s_id}</TableCell>
                    <TableCell align="center">{row.s_citycode}</TableCell>
                    <TableCell align="center">{row.s_cityname}</TableCell>
                    <TableCell align="center">{row.country}</TableCell>
                    <TableCell align="center">{row.s_status}</TableCell>
                    <TableCell align="center">
                      <Button variant='text' className="penbg" onClick={() => { editrow(row.s_id) }}><EditIcon sx={{ fontSize: 15 }} /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            }
            {props.title === 'Country Master' &&
              <>
                {result.slice(pagenew * rowsPerPage, pagenew * rowsPerPage + rowsPerPage).map((row: any, i: number) => (
                  <TableRow key={i}>
                    <TableCell align="center">{row.s_id}</TableCell>
                    <TableCell align="center">{row.s_countrycode}</TableCell>
                    <TableCell align="center">{row.s_countryname}</TableCell>
                    <TableCell align="center">{row.s_status}</TableCell>
                    <TableCell align="center">
                      <Button variant='text' className="penbg" onClick={() => { editrow(row.s_id) }}><EditIcon sx={{ fontSize: 15 }} /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            }

            {props.title === 'State Master' &&
              <>
                {result.slice(pagenew * rowsPerPage, pagenew * rowsPerPage + rowsPerPage).map((row: any, i: number) => (
                  <TableRow key={i}>
                    <TableCell align="center">{row.s_id}</TableCell>
                    <TableCell align="center">{row.country}</TableCell>
                    <TableCell align="center">{row.s_stateName}</TableCell>
                    <TableCell align="center">{row.s_stateCode}</TableCell>
                    <TableCell align="center">{row.s_status}</TableCell>
                    <TableCell align="center">
                      <Button variant='text' className="penbg" onClick={() => { editrow(row.s_id) }}><EditIcon sx={{ fontSize: 15 }} /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            }
          </TableBody>

        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={result.length}
          rowsPerPage={rowsPerPage}
          page={pagenew}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          
        />
        {/* <Pagination
        count={result.length}
        onChange={onDataPageChange}
        page={dataPage + 1}
      />*/}
      
      </Container>
    </>
  )
}

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}