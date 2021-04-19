import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faUserEdit, faUserMinus } from '@fortawesome/free-solid-svg-icons'
import Add from './Add';
import { Col, Row, Form, FormControl } from 'react-bootstrap';
import Moment from 'moment';
import Home from './Home.js';

function Student() {
  const emptyStudent = {
    'id': '',
    'name': '',
    'age': '',
    'gender': '',
    'studentID': '',
    'created_at': ''
  };
  const title = {
    ADD: 'Add Student',
    EDIT: 'Edit Student'
  }
  const [headingForm, setHeadingForm] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [student, setStudent] = useState([]);
  const [students, setStudents] = useState(emptyStudent);
  const [keyWord, setKeyWord] = useState('');
  const [totalOfStudent, setTotalOfStudent] = useState(0);
  const [page, setPage] = useState(0);
  const [nextPage, setNextPage] = useState(false);
  const [prevPage, setPrevPage] = useState(false);
  const rowsPerPage = 5;
  const totalOfPage = Math.ceil(totalOfStudent / rowsPerPage);
  const items = [];
  for (let number = 0; number < totalOfPage; number++) {
    items.push(
      <Pagination.Item key={number} active={number === page} onClick={() => { onClickPage(number) }}>
        {number + 1}
      </Pagination.Item>,
    );
  }
  const onNextPage = () => {
    if (page < totalOfPage - 1) {
      setPage(page + 1);
      getStudent();
    }

  };
  const onPrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
      getStudent();
    }
  };
  const disablePage = () => {
    if (page === totalOfPage - 1) {
      setNextPage(true);
    } else if (page === 0) {
      setPrevPage(true);
    } else if (totalOfPage === 1) {
      setNextPage(true);
      setPrevPage(true);
    }else{
      setNextPage(false);
      setPrevPage(false);
    }
  };
  const onChangeSearch = (event) =>{
    setKeyWord(event.target.value);
  };
  const onClickPage = (numberPage) => {
    setPage(numberPage);
    getStudent();
  };
  const onAddStudent = () => {
    setStudents(emptyStudent);
    setOpenModal(true);
    setHeadingForm(title.ADD);

  };
  const onCloseModal = () => {
    setOpenModal(false);
    getStudent();
  };
  const getStudent = () => {
    fetch(`http://localhost:8888/api/v1/student/getPageStudent/${page}/${rowsPerPage}`)
      .then(result => result.json())
      .then(data => {
        setStudent(data);
      });
    fetch(`http://localhost:8888/api/v1/student/totalOfStudent`)
      .then(result => result.json())
      .then(data => {
        setTotalOfStudent(data);
      });
    disablePage();
  };
  useEffect(() => {
    getStudent();
  }, [page]);

  const deleteStudent = (id) => {
    fetch(`http://localhost:8888/api/v1/student/deleteStudent/${id}`, {
      method: 'DELETE'
    }).then(result => {
      result.json();
      getStudent();
      alert('Delete Success');
    });

  };
  const onEditStudent = (row) => {
    setStudents(row);
    setOpenModal(true);
    setHeadingForm(title.EDIT);
  };
  const onSearchStudent = () =>{
    fetch(`http://localhost:8888/api/v1/student/findStudent/${keyWord}`)
    .then(result => result.json())
    .then((data)=>{
      setStudent(data);
    });
  };
  return (
    <Col className="student">
      <Row className = "button-row">
        <Col md={4}>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={onChangeSearch}/>
            <Button variant="primary" onClick={onSearchStudent}>Search</Button>
          </Form>

        </Col>
        <Col md={5}></Col>
        <Col md={3}>
          <Button onClick={onAddStudent} className="my_btn"> <FontAwesomeIcon icon={faPlus} /> Add Student</Button>
        </Col>
      </Row>
      <Row>
        <Table striped bordered hover >
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Birthday</th>
              <th>Gender</th>
              <th>Address</th>
              <th>Student ID</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {student.map((student, index) => {
              return (
                <tr key={student.id} onDoubleClick={() => onEditStudent(student)} style={{ cursor: 'pointer' }}>
                  <td>{index + 1}</td>
                  <td>{student.name}</td>
                  <td>{Moment(student.birthday).format('DD-MM-YYYY')}</td>
                  <td>{student.gender}</td>
                  <td>{student.address}</td>
                  <td>{student.studentID}</td>
                  <td width="11%"><Button variant="success" onClick={() => onEditStudent(student)}>
                    <FontAwesomeIcon icon={faUserEdit} size="sm" />
                  </Button>
                          &nbsp;
                          <Button variant="danger" onClick={() => deleteStudent(student.id)}>
                      <FontAwesomeIcon icon={faUserMinus} size="sm" />
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Row>
      <Row className="pagination">
        <Col></Col>
        <Col xs={6} md="auto"><Pagination>
          <Pagination.Item onClick={onPrevPage} disabled={prevPage}>Prev</Pagination.Item>
          {items}
          <Pagination.Item onClick={onNextPage} disabled={nextPage}>Next</Pagination.Item></Pagination>
        </Col>
        <Col></Col>
      </Row>
      <Col > </Col>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        onHide={onCloseModal}
        show={openModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {headingForm}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Add
            student={students}
            show={openModal}
            onHide={onCloseModal}
            onLoadStudent={getStudent}
            title={headingForm}
          ></Add>
        </Modal.Body>

      </Modal>
  
    </Col>
  )
}

export default Student
