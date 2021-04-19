import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import ImageMan from '../man.jpg';
import ImageWoMan from '../woman.jpg';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Pagination from 'react-bootstrap/Pagination'
import Moment from 'moment';


 function Home() {
    const [page,setPage] = useState(0);
    const [student,setStudent]=useState([]);
    const rowsPerPage = 4;
    const [total,setTotal] = useState(0);
    const totalOfPage = Math.ceil(total/rowsPerPage);
    const [nextPage, setNextPage] = useState(false);
    const [prevPage, setPrevPage] = useState(false);

    const paging = [];
     for (let number = 0; number < totalOfPage; number++) {
        paging.push(
      <Pagination.Item key={number} active={number === page} onClick={()=>onClickPage(number)}>    
        {number+1}
      </Pagination.Item>,
             );
        }
    
    const getStudent = () => {
        fetch(`http://localhost:8888/api/v1/student/getPageStudent/${page}/${rowsPerPage}`)
          .then(result => result.json())
          .then(data => {
            setStudent(data);
          });
        fetch(`http://localhost:8888/api/v1/student/totalOfStudent`)
          .then(result => result.json())
          .then(data => {
            setTotal(data);
          });
        disablePage();
      };
      useEffect(()=>{
          getStudent();
      },[page]);
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
      const onClickPage = (numberPage) => {
        setPage(numberPage);
        getStudent();
      };
      
    return (
       <div>
           <Row className="list-student"><h1 className="text-center" >Danh Sách Sinh Viên</h1></Row>
            <Row >
                {student.map((student)=>{
                    return(
                     <Col xs={3}>
                     <Card style={{ width: '100%',height:'27rem' }}>
                         <Card.Img variant="top" src={student.gender==='Nam'? ImageMan : ImageWoMan}  style={{ height: '15rem' }}/>
                         <Card.Body>
                             <Card.Title>{student.name}</Card.Title>
                             <Card.Text>
                                 Birthday : {Moment(student.birthday).format('DD-MM-YYYY')}<br />
                                 Gender : {student.gender}<br />
                                 Address : {student.address}<br />
                                 StudentID : {student.studentID}
                             </Card.Text>
                           
                         </Card.Body>
                     </Card>
                     </Col>
                 ) })}
             
            </Row>
           <Row className="pagination">
        <Col></Col>
        <Col xs={6} md="auto"><Pagination>
          <Pagination.Item onClick={onPrevPage} disabled={prevPage}>Prev</Pagination.Item>
          {paging}
          <Pagination.Item onClick={onNextPage} disabled={nextPage}>Next</Pagination.Item></Pagination>
        </Col>
        <Col></Col>
      </Row>
       </div>
    )
}

 export default Home
