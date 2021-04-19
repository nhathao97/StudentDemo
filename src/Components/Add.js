import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const Add =({onHide, student, onLoadStudent })=> {
    const [value,setValue] = useState(student); 
    const onChangeStudent = (event) =>{
        setValue({
            ...value,
            [event.target.name] : event.target.value
        });
    };
    const onChangeGender = (event) =>{
        onChangeStudent(event);
    };
    const saveStudent = () =>{
        fetch(`http://localhost:8888/api/v1/student/saveStudent`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
         },
        mode: 'cors',
        body: JSON.stringify(value)
    }).then((response) => {
      response.json();
       onLoadStudent();
    });
        onHide();
    }
  
    return (<div>
                <Form>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                            Name
                    </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder="Name" name="name" value={value.name} onChange={onChangeStudent}/> 
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalPassword">
                        <Form.Label column sm={2}>
                            BirthDay
                         </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="date" name="birthday" value={value.birthday} onChange={onChangeStudent}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="exampleForm.ControlTextarea1">
                    <Form.Label column sm={2}>Address</Form.Label>
                        <Col sm={10}>
                        <Form.Control as="textarea" placeholder="Address" name="address" value={value.address} onChange={onChangeStudent}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalPassword">
                        <Form.Label column sm={2}>
                            Student ID
                     </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder="Student ID" name="studentID" value={value.studentID} onChange={onChangeStudent}/>
                        </Col>
                    </Form.Group>
                    <fieldset>
                        <Form.Group as={Row}>
                            <Form.Label as="legend" column sm={2}>
                                Gender
                        </Form.Label>
                            <Col sm={10}>
                                <Form.Check
                                    type="radio"
                                    label="Male"
                                    name="gender"
                                    value = "Nam"
                                    onChange={onChangeGender}
                                    checked={value.gender==='Nam'} 
                                />
                                <Form.Check
                                    type="radio"
                                    label="FeMale"
                                    name="gender"
                                    value = "Nữ"
                                    onChange={onChangeGender}
                                    checked={value.gender==='Nữ'}
                                />
                         
                            </Col>
                        </Form.Group>
                    </fieldset>
                </Form>
             <Modal.Footer>
             <Button onClick={saveStudent} variant="primary">Save Changes</Button>
             <Button onClick={onHide} variant="danger">Close</Button>
         </Modal.Footer>
        </div>
    )
}

export default Add
