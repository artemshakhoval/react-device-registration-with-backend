import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Box, Container, makeStyles, withStyles, Typography } from '@material-ui/core'
import { data } from './_logsData'
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';

const useStyles = makeStyles({
    header: {
        textAlign: 'center',
        marginBottom: '1rem'
    },
    config: {
        fontSize: '1rem',
        fontWeight: 600,
        textDecoration: 'underline'
    },
    wrapper: {
        display: 'flex',
    },
    warn: {
        color: 'orange'
    },
    done: {
        color: 'green'
    }
})


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


function createData(config, params) {
    return { config, params };
}

const Logs = (props) => {
    const { location, client, installer, serialNumber, fsp, port } = data.logs
    const { device, ip, loc, status } = data.warnings
    const classes = useStyles()

    const logsRows = [
        createData(`Location :`, `${location}`),
        createData(`Client :`, `${client}`),
        createData('Installer :', `${installer}`),
        createData('Serial Number :', `${serialNumber}`),
        createData('F/S/P :', `${fsp}`),
        createData('Port :', `${port}`),
    ];

    const warnRows = [
        createData(`Device :`, `${device}`),
        createData(`IP :`, `${ip}`),
        createData('Location :', `${loc}`),
        createData('Status :', `${status}`),
    ];

    return (
        <>
            <Box className={classes.wrapper}>
                <Container maxWidth="sm">
                    <Box>
                        <Typography className={classes.header} variant="h5">Last installations <CheckCircleRoundedIcon className={classes.done} /></Typography>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <StyledTableRow>
                                    <StyledTableCell className={classes.config} align="center">Config</StyledTableCell>
                                    <StyledTableCell className={classes.config} align="center">Params</StyledTableCell>
                                </StyledTableRow>
                            </TableHead>
                            <TableBody>
                                {logsRows.map((row, i) => (
                                    <StyledTableRow key={i}>
                                        <StyledTableCell align="center" component="th" scope="row">
                                            {row.config}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{row.params}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
                <Container maxWidth="sm">
                    <Box>
                        <Typography className={classes.header} variant="h5">Last warnings <WarningRoundedIcon className={classes.warn} /></Typography>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <StyledTableRow>
                                    <StyledTableCell className={classes.config} align="center">Config</StyledTableCell>
                                    <StyledTableCell className={classes.config} align="center">Params</StyledTableCell>
                                </StyledTableRow>
                            </TableHead>
                            <TableBody>
                                {warnRows.map((row, i) => (
                                    <StyledTableRow key={i}>
                                        <StyledTableCell align="center" component="th" scope="row">
                                            {row.config}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{row.params}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </Box>
        </>
    )
}

export default Logs