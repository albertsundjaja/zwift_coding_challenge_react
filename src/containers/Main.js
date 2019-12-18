import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Form} from 'react-bootstrap';
import axios from 'axios';
import * as configs from '../configs/configs';
import Meteorites from '../components/Meteorites';

const Main = (props) => {
    const [selectedFilter, setSelectedFilter] = useState('year');
    const [filterValue, setFilterValue] = useState('');
    const [inputHint, setInputHint] = useState({
        type: "number",
        placeholder: "e.g. 2002"
    });
    const [error, setError] = useState({show:false, msg:''});
    const [meteorites, setMeteorites] = useState([]);

    /* change the input type and placeholder of the filter value input */
    useEffect(() => {
        if (selectedFilter === 'year') {
            setInputHint({
                type: "number",
                placeholder: "e.g. 2002"
            });
        }

        if (selectedFilter === 'recclass') {
            setInputHint({
                type: "text",
                placeholder: "e.g. LL6"
            });
        }
    }, [selectedFilter]);

    const requestData = () => {
        if (!filterValue) {
            setError({
                show:true,
                msg:"Please enter a value"
            });
            return;
        }

        axios.get(`${configs.URL_NODE_SERVER}/meteorites/?${selectedFilter}=${filterValue}`)
        .then((res) => {
            console.log(res.data);
            setMeteorites(res.data.meteorites);
        })
        .catch((err) => {
            console.log(err.response);
            setError({
                show:true,
                msg:"Sorry something went wrong with our server."
            })
        });
    }

    return (
        <React.Fragment>
            <Container>
                <Row>
                    <Col xs={12}>
                        <h1>Meteorites</h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <p>You can display meteorites either by year or recclass. Please choose the filter type and type in the value.</p>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Form>
                            <Form.Group>
                                <Form.Label>Select Filter Type</Form.Label>
                                <Form.Control as="select"
                                    value={selectedFilter}
                                    onChange={(e) => {setSelectedFilter(e.target.value)}}>
                                    <option value="year">year</option>
                                    <option value="recclass">recclass</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Enter {selectedFilter}</Form.Label>
                                <Form.Control type={inputHint.type} placeholder={inputHint.placeholder}
                                    onChange={(e) => {setFilterValue(e.target.value)}} />
                            </Form.Group>
                        </Form>
                        {error.show ? <div>{error.msg}</div> : null}
                        <button onClick={requestData}>testing</button>
                        {meteorites ? 
                            <Meteorites meteorites={meteorites} />
                            : null
                        }
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default Main;