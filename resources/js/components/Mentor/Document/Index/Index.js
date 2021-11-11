import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import {Link} from 'react-router-dom';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@mui/material/Chip';

function Document() {
    const [documents, setDocuments] = useState([]);
    const [staffs, setStaffs] = useState([]);
    const [expanded, setExpanded] = React.useState(false);
    
    useEffect(() => {
        axios
            .get("/react/all/documents")
            .then(response => {
                setDocuments(response.data);
            }).catch(error => {
                console.log(error);
            });
        
        axios
            .get("/react/all/staffs")
            .then(response => {
                setStaffs(response.data);
            }).catch(error => {
                console.log(error);
            }); 
        
    }, []);
    
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    
    const document = staffs.map((staff) => {
        return (
            <div className="content">
                <Accordion expanded={ expanded === staff.id } onChange={ handleChange(staff.id) }>
                    <AccordionSummary
                        expandIcon={ <ExpandMoreIcon /> }
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            { staff.name }
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>{ documents.filter(document => document.user_id == staff.id).length }件</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            { documents.map((document) => {
                                if (document.user_id === staff.id) {
                                    return (
                                        <div className="document">
                                            ・<Link to={ `/documents/` + document.id }>{ document.title }</Link><br/>
                                            { document.beginner === 1 ? <Chip variant="outlined" label="初心者向け" /> : "" }
                                            { document.amature === 1 ? <Chip label="中級者向け" /> : "" }
                                            { document.master === 1 ? <Chip label="上級者向け" /> : "" }
                                            { document.all === 1 ? <Chip label="全員向け" /> : "" }
                                        </div>
                                    );
                                }
                            })}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        );
    });
    
    return (
        <div className="container">
            { document }
        </div>
    );
}

export default Document;

if (document.getElementById('Document_mentor_index')) {
    ReactDOM.render(<Document />, document.getElementById('Document_mentor_index'));
}