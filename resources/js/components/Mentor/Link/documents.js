import React, {useState, useEffect} from 'react';
import axios from "axios";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function Documents() {
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
    
    const list = staffs.map((staff) => {
        return (
            <div className="content">
                <Accordion expanded={ expanded === staff.id } onChange={handleChange(staff.id)}>
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
                                if(document.user_id === staff.id){
                                    return <div  className="question">・<a href={ `/links/document/`+document.id }>{ document.title }</a></div>;
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
            { list }
        </div>
    );
}

export default Documents;
