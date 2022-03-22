import React, {useState, useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
// import Divider from '@material-ui/core/Divider';

/**
 * 校舎情報(データ表示)
 */
function Info(props) {
    const [timeout, setTimeout] = useState(false);
    const [isZoom, setZoom] = useState(false);
    
    useEffect(() => {
        if (props.resError) {
            setTimeout(true);
        } else {
            setTimeout(false);
        }
        
        if (props.zoom_exist) {
            setZoom(true);
        }
    },[props.resError, props.zoom_exist]);
    
    let zoom;
    if (isZoom) {
        zoom = <a href={ props.zoom_link } target="_blank">zoomリンク</a>;
    }
    
    let info;
    if (!(props.isDateClicked)) {
        if (timeout) {
            info = (
                <Typography align="center" variant="h7" component="div" sx={{ paddingTop: 2, paddingBottom: 5 }}>
                    データの読み込みに失敗しました。再度お試しいただくか、メンターに直接ご確認ください。
                </Typography>
            );
        } else {
            info = (
                <Typography align="center" variant="h7" component="div" sx={{ paddingTop: 2, paddingBottom: 5 }}>
                    データの読み込み中です。
                </Typography>
            );
        }
    } else {
        info = (
            <Table sx={{ minWidth: 370, paddingBottom: 5 }} aria-label="simple table">
                <TableBody>
                    <TableRow
                        key='time'
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell
                            component="th"
                            scope="row"
                            align="center"
                            sx={{
                                minWidth: "150Px",
                            }}
                        >
                            開校時間
                        </TableCell>
                        <TableCell align="center">{ props.collegeInfo.start } 〜 { props.collegeInfo.close }</TableCell>
                    </TableRow>
                    
                    <TableRow
                        key='college'
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell
                            component="th"
                            scope="row"
                            align="center"
                            sx={{
                                textAlign: "center",
                                minWidth: "150Px",
                            }}
                        >
                            校舎出勤メンター
                        </TableCell>
                        <TableCell align="center">
                            { props.collegeInfo.staff.map((staff) => (
                                <div key={staff}>{ staff }</div>
                            )) }
                        </TableCell>
                    </TableRow>
                    
                    <TableRow
                        key='online_college'
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell
                            component="th"
                            scope="row"
                            align="center"
                            sx={{
                                textAlign: "center",
                                minWidth: "150Px",
                            }}
                        >
                            オンライン出勤メンター
                        </TableCell>
                        <TableCell align="center">
                            { props.collegeInfo.online_staff.map((staff) => (
                                <div key={staff}>{ staff }</div>
                            )) }
                        </TableCell>
                    </TableRow>
                    
                    <TableRow
                        key='zoom'
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell
                            component="th"
                            scope="row"
                            align="center"
                            sx={{
                                textAlign: "center",
                                minWidth: "150Px",
                            }}
                        >
                            オンライン質問部屋
                        </TableCell>
                        <TableCell align="center">
                            <div>{ props.collegeInfo.zoom.message }</div>
                            {zoom}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        );
    }

    return (
        <div>
            { info }
        </div>
    );
}

export default Info;