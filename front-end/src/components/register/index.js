import React from 'react'
import Logs from './logs/index'
// import PageList from './pages'
import _ from 'lodash'
import axios from 'axios'
import { Container, Typography, Box, Button, TextField, TableContainer, TableHead, TableRow, TableBody, TableCell, Paper, Table } from '@material-ui/core'
import moment from 'moment'
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';

const initialState = {
    id: '',
    olt: '',
    serial_number: '',
    slot: '',
    port: '',
}

const errorsInitial = {
    id: {
        isValid: false,
        message: ''
    },
    olt: {
        isValid: false,
        message: ''
    },
    serial_number: {
        isValid: false,
        message: ''
    },
    slot: {
        isValid: false,
        message: ''
    },
    port: {
        isValid: false,
        message: ''
    },
}
const Register = () => {

    const [state, setState] = React.useState(initialState)
    const [sentState, setSentState] = React.useState(initialState)
    const [errors, setErrors] = React.useState(errorsInitial)
    const [records, setRecords] = React.useState([])
    const [errorsRecords, setErrorsRecords] = React.useState([])


    const handleClick = () => {
        axios.post('http://localhost:3001/getRegisterInfo', state)
            .then(({ data }) => {
                // setSentState(data)
                console.log(data);
                setRecords(data)
                setErrors(errorsInitial)

            })
            .catch(({ response: { data } }) => {
                setErrors(data)
                setErrorsRecords(p => [...p, data])
            }).finally(() => {
                setSentState(state)
            })
    }

    const onChange = ({ target }) => {
        const { name, value } = target;
        setState(pre => ({ ...pre, [name]: value }))
    }

    let recordsHeaders = ['index']
    recordsHeaders = [...recordsHeaders, ...Object.keys(initialState)]
    recordsHeaders = [...recordsHeaders, 'createdAt']

    return (
        <>
            <Container style={{ marginBottom: '2rem' }}>
                <form>
                    <Typography variant="h4">Register your device</Typography>
                    <Box style={{ width: '100%', margin: '1rem 0' }}>
                        <TextField
                            name="id"
                            value={state.id}
                            onChange={onChange}
                            style={{ width: '20rem' }}
                            label='ID'
                            error={errors.id?.isValid}
                            helperText={errors.id?.message}
                            variant="outlined" />
                        <TextField
                            style={{ width: '20rem', margin: '0 0.5rem' }}
                            name="olt"
                            value={state.olt}
                            onChange={onChange}
                            label='OLT'
                            error={errors.olt?.isValid}
                            helperText={errors.olt?.message}
                            variant="outlined" />
                        <TextField
                            name="serial_number"
                            value={state.serial_number}
                            style={{ width: '20rem' }}
                            onChange={onChange}
                            label='Serial Number'
                            error={errors.serial_number?.isValid}
                            helperText={errors.serial_number?.message}
                            variant="outlined" />
                    </Box>
                    <Box style={{ width: '100%', margin: '1rem 0' }}>
                        <TextField
                            name="slot"
                            value={state.slot}
                            onChange={onChange}
                            style={{ width: '20rem' }}
                            label='SLOT'
                            error={errors.slot?.isValid}
                            helperText={errors.slot?.message}
                            variant="outlined" />
                        <TextField
                            style={{ width: '20rem', margin: '0 0.5rem' }}
                            name="port"
                            value={state.port}
                            onChange={onChange}
                            error={errors.port?.isValid}
                            helperText={errors.port?.message}
                            label='PORT'
                            variant="outlined" />
                    </Box>
                    <Button onClick={handleClick}
                        variant='contained' color="primary" >
                        Register
                    </Button >
                </form>
            </Container>

            <Logs state={sentState} errors={errors} handleClick={handleClick} />

            <Container style={{ marginTop: '3rem' }}>
                <Typography style={{ textAlign: 'center' }} variant="h6">All installations <CheckCircleRoundedIcon style={{ color: 'green' }} /></Typography>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {
                                    recordsHeaders.map((name, i) => {
                                        return <TableCell style={{ fontSize: '0.75rem', fontWeight: 700 }} key={i}>{_.upperCase(name)}</TableCell>
                                    })
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                records.map((record, j) => {
                                    return <TableRow key={j}>
                                        {
                                            Object.keys(record).map((name, i) => {
                                                let vale = record[name];
                                                if (name === 'createdAt') {
                                                    vale = moment(vale).format('L')
                                                }
                                                return <TableCell key={i}>{vale}</TableCell>
                                            })
                                        }
                                    </TableRow>
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <br />
                <Typography style={{ textAlign: 'center' }} variant="h6">All warnings <WarningRoundedIcon style={{ color: 'orange' }} /></Typography>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {
                                    Object.keys(errorsInitial).map((name, i) => {
                                        return <TableCell style={{ fontSize: '0.75rem', fontWeight: 700 }} key={i}>{_.upperCase(name)}</TableCell>
                                    })
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                errorsRecords.map((record, j) => {
                                    return <TableRow key={j}>
                                        {
                                            Object.keys(record).map((name, i) => {

                                                let vale = record[name];
                                                if (name === 'createdAt') {
                                                    vale = moment(vale.message).format('L')
                                                } else {
                                                    vale = _.capitalize(vale.message)
                                                }
                                                return <TableCell key={i}>{vale}</TableCell>
                                            })
                                        }
                                    </TableRow>
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
            {/* <PageList /> */}
        </>
    )
}

export default Register
