import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Divider from '@material-ui/core/Divider';

/**
 * 校舎位置情報
 */
function Location(props) {
    
    return (
        <Grid container spacing={2} justifyContent="center">
            <Grid
                item
                sx={{
                    marginTop: 1,
                }}
            >
                { props.map_key &&
                    <LoadScript googleMapsApiKey={ props.map_key }>
                        <GoogleMap
                            mapContainerStyle={{ width: '300px', height: '300px' }}
                            center={{ lat: 35.6600511, lng: 139.6973113 }}
                            zoom={15}
                        >
                            <Marker position={{ lat: 35.6601020, lng: 139.6952623 }} />
                        </GoogleMap>
                    </LoadScript>
                }
            </Grid>
            
            <Grid item>
                <Divider />
                
                <Table sx={{ minWidth: 300, paddingBottom: 5 }} aria-label="simple table">
                    <TableBody>
                        <TableRow
                            key='time1'
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell
                                component="th"
                                scope="row"
                                align="center"
                                sx={{
                                    minWidth: "120Px",
                                }}
                            >
                                校舎住所
                            </TableCell>
                            <TableCell align="left">
                                <div>〒150-0046</div>
                                <div>東京都渋谷区松濤１丁目２９−１ 4F</div>
                            </TableCell>
                        </TableRow>
                        <TableRow
                            key='time2'
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell
                                component="th"
                                scope="row"
                                align="center"
                                sx={{
                                    minWidth: "120Px",
                                }}
                            >
                                校舎の入り方
                            </TableCell>
                            <TableCell align="left">
                                1階のファミリーマートに向かって右手にエレベータがあるので、そちらから入室してください。
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Grid>
        </Grid>
    );
}

export default Location;