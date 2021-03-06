import React, { useState, useEffect, createContext } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Bar from "./Layout/Bar";
import AccessError from "./Error";
import MyPage from "./Public/User/MyPage";
import AdminMyPage from "./Public/User/AdminMypage";
import MyQuestion from "./Public/User/QuestionShow";
import History from "./Public/History/History";
import Home from "./Public/Home/Home";
// import PublicDocumentIndex from './Public/Document/Index/Index';
// import PublicQuestionIndex from './Public/Question/Index/Index';
import PublicQuestionIndexIndex from "./Public/Question/Index/Index/Index";
import PublicQuestionCreate from "./Public/Question/Create/Create/Create";
import PublicQuestionShow from "./Public/Question/Show/Show";
// import Condition from './Public/Search/Condition/Condition';
// import Freeword from './Public/Search/Freeword/Freeword';
// import MentorTop from './Mentor/Top';
// import DocumentIndex from './Mentor/Document/Index/Index';
// import DocumentShow from './Mentor/Document/Show/Show';
// import DocumentCreate from './Mentor/Document/Create/Create';
// import DocumentEdit from './Mentor/Document/Edit/Edit';
// import QuestionIndex from './Mentor/Question/Index/Index/Index';
// import QuestionMentorYetCommentIndex from './Mentor/Question/Index/yet-comment-index/FromMentor';
// import QuestionStudentYetCommentIndex from './Mentor/Question/Index/yet-comment-index/FromStudent';
import QuestionShow from "./Mentor/Question/Show/Show";
// import QuestionEdit from './Mentor/Question/Edit/Edit';
// import LinkFromQuestionIndex from './Mentor/Link/fromQuestion/Index/Index';
// import LinkFromQuestionShow from './Mentor/Link/fromQuestion/Show/Show';
// import LinkFromDocumentIndex from './Mentor/Link/fromDocument/Index/Index';
// import LinkFromDocumentShow from './Mentor/Link/fromDocument/Show/Show';
// import UserIndex from './Mentor/User/Index/Index';
// import UserRegisterPublic from './Mentor/User/Register/Public/Public';
// import UserRegisterAdmin from './Mentor/User/Register/Admin/Admin';
// import EventIndex from './Mentor/Event/Index/Index';
// import EventRegister from './Mentor/Event/Create/Create';
import MentorQuestions from "./Public/Home/Q&A/questionsForMentor.js";

export const LoginUser = createContext();

const Router = () => {
    const [user, setUser] = useState([]);

    useEffect(() => {
        // ????????????????????????????????????
        axios
            .get("/react/user")
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <BrowserRouter>
            <LoginUser.Provider value={user}>
                {/*??????????????????????????????*/}
                <Bar />

                {/*??????????????????*/}
                <Switch>
                    {/*???????????????????????????????????????URL*/}

                    {/* ????????????????????? */}
                    {user.length !== 0 && (
                        <Route key="home" path="/" exact component={Home} />
                    )}

                    {/* ?????????????????????????????? */}
                    {user.length !== 0 && (
                        <Route path="/my_page" exact component={MyPage} />
                    )}

                    {/* ?????????????????????????????????????????? */}
                    {user.length !== 0 && (
                        <Route
                            path="/my_page/questions/:id"
                            exact
                            component={MyQuestion}
                        />
                    )}

                    {/* ???????????????????????? */}
                    {user.length !== 0 && (
                        <Route path="/history" exact component={History} />
                    )}

                    {/* ???????????????????????????????????? */}
                    {/* user.length !== 0 &&
                        <Route path="/public/documents/index" exact component={ PublicDocumentIndex }/>
                    */}

                    {/* ???????????????????????????????????????????????? */}
                    {user.length !== 0 && (
                        <Route
                            path="/topic/:id"
                            exact
                            component={PublicQuestionIndexIndex}
                        />
                    )}

                    {/* ?????????????????????????????? */}
                    {/* user.length !== 0 &&
                        <Route
                            path="/public/questions/index"
                            exact
                            component={PublicQuestionIndex}
                        />
                    */}

                    {/* ???????????????????????????????????? */}
                    {user.length !== 0 && (
                        <Route
                            path="/public/questions/create"
                            exact
                            component={PublicQuestionCreate}
                        />
                    )}

                    {/* ???????????????????????? */}
                    {user.length !== 0 && (
                        <Route
                            path="/public/questions/:id"
                            exact
                            component={PublicQuestionShow}
                        />
                    )}

                    {/* ?????????????????????????????? */}
                    {/* user.length !== 0 &&
                        <Route path="/search/condition" exact component={Condition} />
                    */}

                    {/* ???????????????????????????????????? */}
                    {/* user.length !== 0 &&
                        <Route path="/search/freeword" exact component={Freeword} />
                    */}

                    {/*=======================================================================================*/}
                    {/*??????????????????????????????????????????URL*/}

                    {/* ??????????????????????????????????????? */}
                    {user.length !== 0 && user.is_admin === "staff" && (
                        <Route
                            path="/Admin_my_page"
                            exact
                            component={AdminMyPage}
                        />
                    )}

                    {/* ?????????????????????????????? */}
                    {/* (user.length !== 0 && user.is_admin === "staff") &&
                        <Route path="/mentor/top" exact component={MentorTop} />
                    */}

                    {/* ??????????????????????????? */}
                    {/* (user.length !== 0 && user.is_admin === "staff") &&
                        <Route
                            path="/documents/index"
                            exact
                            component={DocumentIndex}
                        />
                    */}

                    {/* ?????????????????????????????? */}
                    {/* (user.length !== 0 && user.is_admin === "staff") &&
                        <Route
                            path="/documents/create"
                            exact
                            component={DocumentCreate}
                        />
                    */}

                    {/* ???????????????????????? */}
                    {/* (user.length !== 0 && user.is_admin === "staff") &&
                        <Route
                            path="/documents/:id/edit"
                            exact
                            component={DocumentEdit}
                        />
                    */}

                    {/* ???????????????????????? */}
                    {/* (user.length !== 0 && user.is_admin === "staff") &&
                        <Route
                            path="/documents/:id"
                            exact
                            component={DocumentShow}
                        />
                    */}

                    {/* ???????????????????????? */}
                    {/* (user.length !== 0 && user.is_admin === "staff") &&
                        <Route
                            path="/questions/index"
                            exact
                            component={QuestionIndex}
                        />
                    */}

                    {/* ???????????????????????? */}
                    {user.length !== 0 && user.is_admin === "staff" && (
                        <Route
                            path="/questions/mentor"
                            exact
                            component={MentorQuestions}
                        />
                    )}

                    {/* ????????????????????????????????????????????????????????? */}
                    {/* (user.length !== 0 && user.is_admin === "staff") &&
                        <Route
                            path="/questions/index/mentor_yet_comment"
                            exact
                            component={QuestionMentorYetCommentIndex}
                        />
                    */}

                    {/* ?????????????????????????????????????????????????????? */}
                    {/* (user.length !== 0 && user.is_admin === "staff") &&
                        <Route
                            path="/questions/index/student_yet_comment"
                            exact
                            component={QuestionStudentYetCommentIndex}
                        />
                    */}

                    {/* ???????????????????????? */}
                    {/* (user.length !== 0 && user.is_admin === "staff") &&
                        <Route
                            path="/questions/:id/edit"
                            exact
                            component={QuestionEdit}
                        />
                    */}

                    {/* ???????????????????????? */}
                    {user.length !== 0 && user.is_admin === "staff" && (
                        <Route
                            path="/questions/:id"
                            exact
                            component={QuestionShow}
                        />
                    )}

                    {/* ???????????????????????????????????????????????????????????? */}
                    {/* (user.length !== 0 && user.is_admin === "staff") &&
                        <Route
                            path="/links/question/index"
                            exact
                            component={LinkFromQuestionIndex}
                        />
                    */}

                    {/* ???????????????????????????????????????????????????????????? */}
                    {/* (user.length !== 0 && user.is_admin === "staff") &&
                        <Route
                            path="/links/question/:id"
                            exact
                            component={LinkFromQuestionShow}
                        />
                    */}

                    {/* ???????????????????????????????????????????????????????????? */}
                    {/* (user.length !== 0 && user.is_admin === "staff") &&
                        <Route
                            path="/links/document/index"
                            exact
                            component={LinkFromDocumentIndex}
                        />
                    */}

                    {/* ???????????????????????????????????????????????????????????? */}
                    {/* (user.length !== 0 && user.is_admin === "staff") &&
                        <Route
                            path="/links/document/:id"
                            exact
                            component={LinkFromDocumentShow}
                        />
                    */}

                    {/* ??????????????????????????? */}
                    {/* (user.length !== 0 && user.is_admin === "staff") &&
                        <Route path="/users/index" exact component={UserIndex} />
                    */}

                    {/* ??????????????????????????? */}
                    {/* (user.length !== 0 && user.is_admin === "staff") &&
                        <Route
                            path="/users/register/public"
                            exact
                            component={UserRegisterPublic}
                        />
                    */}

                    {/* ??????????????????????????? */}
                    {/* (user.length !== 0 && user.is_admin === "staff") &&
                        <Route
                            path="/users/register/admin"
                            exact
                            component={UserRegisterAdmin}
                        />
                    */}

                    {/* ?????????????????????????????? */}
                    {/* (user.length !== 0 && user.is_admin === "staff") &&
                        <Route path="/events/index" exact component={EventIndex} />
                    */}

                    {/* ?????????????????????????????? */}
                    {/* (user.length !== 0 && user.is_admin === "staff") &&
                        <Route
                            path="/events/register"
                            exact
                            component={EventRegister}
                        />
                    */}

                    {/* ?????????????????????????????? */}
                    {/* (user.length !== 0 && user.is_admin === "staff") &&
                        <Route
                            path="/events/register/:id"
                            exact
                            component={EventRegister}
                        />
                    */}

                    {/*404?????????????????????*/}
                    <Route path="/" component={AccessError} />
                </Switch>
            </LoginUser.Provider>
        </BrowserRouter>
    );
};

export default Router;

if (document.getElementById("Router")) {
    ReactDOM.render(<Router />, document.getElementById("Router"));
}
