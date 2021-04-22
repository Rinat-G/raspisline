import React from 'react'
import {BrowserRouter, HashRouter, Route, Switch} from "react-router-dom";
import MainPage from "./pages/MainPage";
import CathedraEmployeePage from "./pages/CathedralEmployeePage";
import DeaneryEmployeePage from "./pages/DeaneryEmployeePage";
import {Box} from "@material-ui/core";
import CurriculumPage from "./pages/CurriculumPage";
import TeacherAssignmentPage from "./pages/TeacherAssignmentPage";
import TeacherListPage from "./pages/TeacherListPage"
import AppHeader from "./comonent/assignment/AppHeader";
import SchedulePage from "./pages/SchedulePage";

const Routing = () => {

    return (
        <Box>
            <HashRouter>
                <AppHeader/>
                <Switch>
                    <Route path="/cathedra">
                        <Switch>
                            <Route path="/cathedra/teachers_assignment">
                                <TeacherAssignmentPage/>
                            </Route>
                            <Route path="/cathedra/teachers_list">
                                <TeacherListPage/>
                            </Route>
                            <Route path={""} exact>
                                <CathedraEmployeePage/>
                            </Route>
                        </Switch>
                    </Route>
                    <Route path="/deanery">
                        <Switch>
                            <Route path="/deanery/curriculum">
                                <CurriculumPage/>
                            </Route>
                            <Route path="/deanery/schedule">
                                <SchedulePage/>
                            </Route>
                            <Route path={""} exact>
                                <DeaneryEmployeePage/>
                            </Route>
                        </Switch>
                    </Route>
                    <Route path="/" exact>
                        <MainPage/>
                    </Route>
                </Switch>
            </HashRouter>
        </Box>
    )

}

export default Routing