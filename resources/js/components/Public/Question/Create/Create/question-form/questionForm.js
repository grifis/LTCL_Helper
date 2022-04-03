import React, {useState, useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@mui/material/Box';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import TextField from '@mui/material/TextField';

import TextForm from './original-text-form/originalTextForm';

/**
 * 質問タイトル、調べたこと、内容入力フォーム
 */
function QuestionForm(props) {
    
    const handleTitle = (event) => {
        props.setTitle(event.target.value);
    };
    
    const handleRemarks = (event) => {
        props.setRemarks(event.target.value);
    };
    
    return (
        <React.Fragment>
            <Typography
                variant="h5"
                component="div"
                sx={{
                    marginTop: 4,
                    marginLeft: 2,
                }}
            >
                4. 質問内容を入力
            </Typography>
            
            { props.question_validation_error === 1 && <Typography className="errorMassage">入力は必須です。</Typography> }
            
            <Box sx={{ width: "90%", marginLeft: "5%", marginTop: "5%"}}>
                 <TextField
                    placeholder="例：CSSファイルが反映されません。"
                    label="質問タイトル（50字以内）"
                    error={props.question_validation_error.title}
                    helperText={props.questionValidationMessage.titleErrorMessage}
                    multiline
                    rows={2}
                    value={ props.title }
                    onChange={ (event) => handleTitle(event) }
                    style={{ 
                        width: "90%",
                        marginLeft: "5%",
                        paddingTop:2,
                    }}
                />
            </Box>
            
            <Box sx={{ width: "90%", marginLeft: "5%" , marginTop: "5%"}}>

                <TextField
                    placeholder="例：以下のサイトでCSSの呼び出し方を確認しました。\nhttp://~"
                    label="調べたこと（参考にしたサイトURLなども記載）"
                    error={props.question_validation_error.serach}
                    helperText={props.questionValidationMessage.serachErrorMessage}
                    multiline
                    rows={4}
                    value={ props.remarks }
                    onChange={ (event) => handleRemarks(event) }
                    style={{ 
                        width: "90%",
                        marginLeft: "5%",
                        paddingTop:2,
                    }}
                />
                
                <Box sx={{display:'flex'}}>
                    <Typography
                        variant="h7"
                        component="div"
                        sx={{
                            marginTop: 4,
                            marginLeft: 4,
                        }}
                    >
                    </Typography>
                </Box>
            </Box>
            
            <TextForm
                text={ props.question }
                setText={ props.setQuestion }
                images={ props.images }
                setImages={ props.setImages }
                validationKey={props.question_validation_error.content}
                validationMessage={ props.questionValidationMessage.contentErrorMessage }
            />
        </React.Fragment>
    );
}

export default QuestionForm;