import React, {FC} from 'react';
import './passed.scss';
import NavBar from "../../components/navbar/navbar";
import Background from "../../components/background/background";
import {connect} from "react-redux";
import {AppState} from "../../entitites/app/app.interfaces";
import {PassedQueueProps} from "../../entitites/passed/passed.interfaces";
import {Card} from "react-bootstrap";

const Passed: FC<PassedQueueProps> = props => {
    function renderPassed() {
        return props.passedQueue.map((passed, ind) =>
            <Card key={ind}>
                <Card.Header>
                    <b>{passed.date}</b><br/>
                    {passed.time}
                </Card.Header>

                <Card.Body>
                    <Card.Text>
                        <b>Владелец:</b> {passed.ownerName}<br />
                        <b>Телефон:</b> 8 {passed.ownerPhone}<br />
                        <b>Машина:</b> {passed.carModel}<br />
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }

    return (
        <div className='page-wrapper'>
            <Background />
            <NavBar activePage='passed' />

            <div className='passed-queue-wrapper'>
                {renderPassed()}
            </div>
        </div>
    );
}

function mapStateToProps(state: AppState) {
    return {
        days: state.appReducer.days,
        passedQueue: state.appReducer.passedQueue
    }
}

export default connect(mapStateToProps)(Passed);