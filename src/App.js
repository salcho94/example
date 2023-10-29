import logo from './logo.svg';
import {useState, useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import axios  from "axios";
import './App.css';
import InsertForm from "./InsertForm";

function App() {
    const [data,setData] =useState([])
    const [writeYn,setWriteYn] =useState(false)

  useEffect(() => {
    axios.get('/board/list')
        .then(res => {
          let boardList = [...res.data];
          setData(boardList);
        })
        .catch(err => console.log(err))
  },[])
  return (
    <div className="App">
        <p></p>
        <h1>게시판</h1>
        <Button style={{float:"right", margin : "20px"}} variant="primary" onClick={() =>{writeYn ? setWriteYn(false): setWriteYn(true)}}>등록</Button>
        {writeYn ? <InsertForm/> : null}
        <Table striped bordered hover>
            <tbody>
                <tr>
                    <th width="10%">글번호</th>
                    <th width="50%">글제목</th>
                    <th width="30%">작성일</th>
                    <th width="10%">작성자</th>
                </tr>
                <BoardList data = {data}/>
            </tbody>
        </Table>


    </div>
  );

}

const BoardList = (props) => {
    let list = props.data.map((value,index) => {
        return(
            <tr key={index}>
                <td>{value.boardId}</td>
                <td>{value.title}</td>
                <td>{value.regDate}</td>
                <td>{value.userId}</td>
            </tr>
        )
    })
    return list
}
export default App;
