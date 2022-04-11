import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import Typography from '@material-ui/core/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { LoginUser } from '../../../Route';
import UserIndex from './userIndex';
import Modals from '../modal';

const a11yProps = (index) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
};


/**
 * 管理
 */
const Manage = () => {
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [type, setType] = useState("user");
    const [event, setEvent] = useState([]);
    const [events, setEvents] = useState([]);
    const [value, setValue] = useState(0);
    const [students, setStudents] = useState([]);
    const [staffs, setStaffs] = useState([]);
    const user = useContext(LoginUser);
    const contents = [
        {content: <a style={{ color: 'black' }} href="/questions/export">直近の質問を<br/>CSV出力</a>, onClick: ''},
        {content: "質問一括登録", onClick: () => backupQuestion()},
        {content: "受講生\n一括登録", onClick: () => backupStudent()},
    ];
    
    // タブ切り替え用
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    const handleOpen = (type) => {
        setOpen(true);
        setType(type);
    };
    
    const handleClose = () => {
        setOpen(false);
        setType("user");
    };
    
    const backupQuestion = () => {
        if (window.confirm('質問のバックアップを復元しますか？')) {
            axios
                .post('/questions/backup')
                .then(response => {
                    if (response.status === 200) {
                        history.push("/?page=manage", { type: "backup", status: "question" });
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };
    
    const backupStudent = () => {
        if (window.confirm('受講生を一括登録しますか？')) {
            axios
                .post('/users/backup')
                .then(response => {
                    if (response.status === 200) {
                        setStudents(response.data.students);
                        history.push("/?page=manage", { type: "backup", status: "student" });
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };
    
    let master;
    if (user.id == 1 && user.name === "master") {
        master = (
            <React.Fragment>
                <Typography component="div" sx={{ color: '#771AF8', fontWeight: 'bold', fontSize: 24 }}>
                    データ出力・一括登録
                </Typography>
            
                <Grid container sx={{ width: '65%', m: '30px auto' }}>
                    {contents.map((content, index) => {
                        return (
                            <Grid item sx={{ height: '150px', width: '33%' }} key={content.content}>
                                <Card sx={{ width: '90%', height: '90%', cursor: 'pointer', p: 0, m: 'auto' }} onClick={content.onClick}>
                                    <Typography 
                                        align="center"
                                        variant="h6"
                                        component="div"
                                        sx={{
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                    >
                                        {content.content}
                                    </Typography>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            </React.Fragment>
        );
    }
    
    let eventComponent;
    if (events.length > 0) {
        eventComponent = (
            <Grid container sx={{ width: '65%', m: '30px auto' }}>
                {events.map((event, index) => {
                    return(
                        <Grid item sx={{ height: '150px', width: '33%' }} key={`id${event.id}-${event.name}`}>
                            <Card sx={{ width: '90%', height: '90%', cursor: 'pointer', p: 0, m: 'auto' }} onClick={() => {handleOpen("show_event"), setEvent(event)}}>
                                <Typography align="center" variant="h5" component="div" sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                    {event.name}
                                </Typography>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>    
        );
    } else {
        eventComponent = (
            <Typography align="center" component="div" sx={{ fontSize: 20, mb: 5, mt: 2 }}>
                登録されているイベントはありません。
            </Typography>
        );
    }
    
    let component;
    if (value == 0) {
        if (students.length !== 0) {
            component = (
                <UserIndex users={students} account={user.id == 1 && user.name == "master" ? "master" : ""} type="student" setStudents={setStudents} setStaffs={setStaffs} />
            );
        } else {
            component = (
                <Typography align="center" component="div" sx={{ fontSize: 20 }}>
                    登録されている受講生はいません
                </Typography>
            );
        }
    } else {
        if (staffs.length > 0) {
            component = (
                <UserIndex users={staffs} account={user.id == 1 && user.name == "master" ? "master" : ""} type="staff" setStudents={setStudents} setStaffs={setStaffs} />
            );
        } else {
            component = (
                <Typography align="center" component="div" sx={{ fontSize: 20 }}>
                    登録されているスタッフはいません
                </Typography>
            );
        }
    }
    
    useEffect(() => {
        axios
            .get(`/react/mentor`)
            .then(response => {
                setEvents(response.data.events);
                setStaffs(response.data.staffs);
                setStudents(response.data.students);
            }).catch(error => {
                console.log(error);
            });
    }, []);
    
    return (
        <div className="manage">
            <Modals 
                open={open} 
                type={type} 
                handleClose={handleClose} 
                setStaffs={setStaffs} 
                setStudents={setStudents} 
                event={event} 
                value={value} 
                setEvents={setEvents}
            />
        
            {/* イベント一覧 */}
            <Typography component="div" sx={{ color: '#771AF8', fontWeight: 'bold', fontSize: 24 }}>
                イベント一覧
            </Typography>
            
            <Typography align="right" component="div" sx={{ color: '#771AF8', fontSize: 20, textDecoration: 'underline', cursor: 'pointer' }} onClick={() => handleOpen("add_event")}>
                イベント追加
            </Typography>
            
            {eventComponent}
            
            
            {/* master限定機能 */}
            {master}
            
            
            {/* ユーザー一覧 */}
            <Typography component="div" sx={{ color: '#771AF8', fontWeight: 'bold', fontSize: 24 }}>
                ユーザー一覧
            </Typography>
            
            <Typography align="right" component="div" sx={{ color: '#771AF8', fontSize: 20, textDecoration: 'underline', cursor: 'pointer' }} onClick={() => handleOpen("user")}>
                ユーザー追加
            </Typography>
            <Box sx={{ width: '100%', mt: 1.5 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'white', mb: 3 }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="secondary"
                        indicatorColor="secondary"
                    >
                        <Tab label="受講生" {...a11yProps(0)} sx={{ fontSize: 20, fontWeight: 'bold' }} />
                        <Tab label="管理者" {...a11yProps(1)} sx={{ fontSize: 20, fontWeight: 'bold' }} />
                    </Tabs>
                </Box>
                {component}
            </Box>
        </div>
    );
};

export default Manage;