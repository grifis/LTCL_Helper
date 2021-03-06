import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Box from "@mui/material/Box";
import Comment from "./comment";
import Create from "./create";
import Edit from "./edit";

/**
 * コメント表示
 */
function Comments(props) {
    const [expanded, setExpanded] = useState(false);
    const [edit_id, setEditId] = useState("");

    // アコーディオンの開閉
    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    // メンターと受講生でカードのスタイルを変更するための関数
    const cardStyleByMentor = is_staff => {
        if (is_staff == 0) {
            return {
                marginBottom: 2,
                marginX: "8%",
                border: "none",
                padding: 2,
                borderLeft: "3px solid #771af8"
            };
        } else {
            return {
                marginBottom: 2,
                marginX: "5%",
                borderRadius: 2,
                padding: 2,
                backgroundColor: "#f2f2f2"
            };
        }
    };
    return (
        <React.Fragment>
            {props.main_comments &&
                props.main_comments.map(comment => {
                    return (
                        <Box
                            sx={cardStyleByMentor(comment.is_staff)}
                            key={comment.comment}
                        >
                            <Comment
                                comment_id={comment.id}
                                comment={comment.comment}
                                target_student={comment.target_student}
                                created_at={comment.created_at}
                                is_staff={comment.is_staff}
                                user_id={props.user_id}
                                is_admin={props.is_admin}
                                setEditId={setEditId}
                                setCommentChanging={props.setCommentChanging}
                            />

                            {edit_id === comment.id && (
                                <Edit
                                    setEditId={setEditId}
                                    comment={comment.comment}
                                    comment_id={comment.id}
                                    setCommentChanging={
                                        props.setCommentChanging
                                    }
                                />
                            )}

                            {props.sub_comments[comment.id].length !== 0 ? (
                                <Accordion
                                    expanded={expanded === comment.id}
                                    onChange={handleChange(comment.id)}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                    >
                                        <Typography>
                                            {
                                                props.sub_comments[comment.id]
                                                    .length
                                            }
                                            件の返信
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {props.sub_comments[comment.id].map(
                                            sub_comment => {
                                                return (
                                                    <React.Fragment
                                                        key={
                                                            sub_comment.comment
                                                        }
                                                    >
                                                        <Comment
                                                            comment_id={
                                                                sub_comment.id
                                                            }
                                                            comment={
                                                                sub_comment.comment
                                                            }
                                                            target_student={
                                                                sub_comment.target_student
                                                            }
                                                            created_at={
                                                                sub_comment.created_at
                                                            }
                                                            is_staff={
                                                                sub_comment.is_staff
                                                            }
                                                            user_id={
                                                                props.user_id
                                                            }
                                                            is_admin={
                                                                props.is_admin
                                                            }
                                                            setEditId={
                                                                setEditId
                                                            }
                                                            setCommentChanging={
                                                                props.setCommentChanging
                                                            }
                                                        />

                                                        {edit_id ===
                                                            sub_comment.id && (
                                                            <Edit
                                                                setEditId={
                                                                    setEditId
                                                                }
                                                                comment={
                                                                    sub_comment.comment
                                                                }
                                                                comment_id={
                                                                    sub_comment.id
                                                                }
                                                                setCommentChanging={
                                                                    props.setCommentChanging
                                                                }
                                                            />
                                                        )}
                                                    </React.Fragment>
                                                );
                                            }
                                        )}

                                        {(props.user_id ===
                                            comment.target_student ||
                                            props.is_admin === "staff") && (
                                            <Create
                                                comment_id={comment.id}
                                                type="add"
                                                question_id={props.question_id}
                                                setCommentChanging={
                                                    props.setCommentChanging
                                                }
                                            />
                                        )}
                                    </AccordionDetails>
                                </Accordion>
                            ) : (
                                <React.Fragment>
                                    {(props.user_id ===
                                        comment.target_student ||
                                        props.is_admin === "staff") && (
                                        <Create
                                            comment_id={comment.id}
                                            type="add"
                                            question_id={props.question_id}
                                            setCommentChanging={
                                                props.setCommentChanging
                                            }
                                        />
                                    )}
                                </React.Fragment>
                            )}
                        </Box>
                    );
                })}

            <Create
                type="create"
                question_id={props.question_id}
                setCommentChanging={props.setCommentChanging}
            />
        </React.Fragment>
    );
}

export default Comments;
