import React, {FC} from 'react';
import './passed-records.scss';
import NavBar from '../../components/navbar/navbar';
import AppBackground from '../../components/app-background/app-background';
import {connect} from 'react-redux';
import {AppState} from '../../entitites/app/app.interfaces';
import {PassedRecordsProps} from '../../entitites/passed-records/passed-records.interfaces';
import {Card} from 'react-bootstrap';

const PassedRecords: FC<PassedRecordsProps> = props => {
    function renderPassedRecords() {
        return props.passedRecords.map((passedRecord, ind) =>
            <Card key={ind}>
                <Card.Header>
                    <b>{passedRecord.date}</b><br/>
                    {passedRecord.time}
                </Card.Header>

                <Card.Body>
                    <Card.Text>
                        <b>Владелец:</b> {passedRecord.ownerName}<br />
                        <b>Телефон:</b> 8 {passedRecord.ownerPhone}<br />
                        <b>Машина:</b> {passedRecord.carModel}<br />
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }

    return (
        <div className='page-wrapper'>
            <AppBackground />
            <NavBar activePage='passed-records' />

            <div className='passed-records-wrapper'>
                {renderPassedRecords()}
            </div>
        </div>
    );
}

function mapStateToProps(state: AppState) {
    return {
        passedRecords: state.appReducer.passedRecords
    }
}

export default connect(mapStateToProps)(PassedRecords);