import React, {useState} from 'react';
import axios from "axios";
import Button from '@mui/material/Button';
import CreateIcon from '@material-ui/icons/Create';
import Box from '@mui/material/Box';
import Card from '@material-ui/core/Card';
import Grid from '@mui/material/Grid';

import TextForm from '../../Create/Create/question-form/original-text-form/originalTextForm';

function Create(props) {
    const [open, setOpen] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const [comment, setComment] = useState('');
    const [images, setImages] = useState([]);
    const [comment_id, setCommentId] = useState('');
    
    const handleOpen = () => {
        // 既存のコメントに対するコメントのの場合は対象コメントのIDを設定
        if (props.type === 'add') {
            setCommentId(props.comment_id);
            
        // 新規のコメントの追加の場合は対象コメントのIDに0を設定
        } else if (props.type === 'create') {
            setCommentId(0);
        }
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };
    
    // 保存処理
    const handleSubmit = () => {
        // 重複保存防止のために保存ボタンのクリック数をカウント
        // クリック数が0回の場合のみ保存実行
        if (clickCount === 0) {
            props.setCommentChanging(true);
            setClickCount(1);
            
            axios
                .post("/comments/store", {
                    comment: comment,
                    images: images,
                    comment_id: comment_id,
                    question_id: props.question_id,
                })
                .then(response => {
                    if (response.status === 200) {
                        setOpen(false);
                        props.setCommentChanging(false);
                        setClickCount(0);
                    }
                }).catch(error => {
                    console.log(error);
                });
        } else {
            return false;
        }
    };
    
    let form_content = (
        <React.Fragment>
            <TextForm
                text={ comment }
                setText={ setComment }
                images={ images }
                setImages={ setImages }
            />
            
            <Grid container spacing={2} justifyContent="center" >
                <Grid item>
                    <Button
                        variant="contained"
                        color="info"
                        onClick={ handleClose }
                    >
                        キャンセル
                    </Button>
                </Grid>
            
                <Grid item>
                    { comment.trim().length === 0 ?
                        <Button
                            variant="outlined"
                            color="info"
                        >
                            投稿
                        </Button>
                    :
                        <Button
                            variant="contained"
                            color="info"
                            onClick={ handleSubmit }
                        >
                            投稿
                        </Button>
                    }
                </Grid>
            </Grid>
        </React.Fragment>
    );
    
    let form;
    if (props.type === 'create') {
        form = (
            <Card sx={{ padding: 2 }}>
                { form_content }
            </Card>
        );
    } else {
        form = form_content;
    }
    
    return (
        <React.Fragment>
            { open ?
                <Box sx={{ marginBottom: 2 }}>
                    { form }
                </Box>
            :
                <Box sx={{ textAlign: "center", marginBottom: 2 }}>
                    { props.type === 'create' ?
                        <Button
                            variant="contained"
                            color="info"
                            startIcon={ <CreateIcon /> }
                            onClick={ handleOpen }
                        >
                            新規にコメントを追加
                        </Button>
                    :
                        <Button
                            variant="text"
                            color="info"
                            onClick={ handleOpen }
                        >
                            コメントに返信
                        </Button>
                    }
                </Box>
            }
        </React.Fragment>
    );
}

export default Create;