import React, { useState } from "react";
import { Card, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const MyForm = props =>{
 const [EnteredTitle,SetEnteredTitle] = useState('')
 const [EnteredText, SetEnteredText] = useState('');
 const [EnteredDate, SetEnteredDate] = useState('');

  const titleHandler = (event) =>{
    SetEnteredTitle(event.target.value)
  };

  const  textHandler = (event)=>{
   SetEnteredText(event.target.value);
 };

  const dateHandler = (event) =>{
    SetEnteredDate(event.target.value);
  };

  const submitHandler = (event)=>{
     event.preventDefault();
     const moviesData = {
       title: EnteredTitle,
       text: EnteredText,
       date: EnteredDate
     };
      // props.onSaveMoviesData(moviesData);
      console.log(moviesData);
      SetEnteredTitle('');
      SetEnteredText('');
      SetEnteredDate('');

  }
 
    
    return (
      <Container className="mt-3">
        <Card style={{ width: "50rem", marginLeft: "10rem" }}>
          <Form
            style={{ width: "35rem", marginLeft: "7rem" }}
            onSubmit={submitHandler}
          >
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={EnteredTitle}
                onChange={titleHandler}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Opening Text</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={EnteredText}
                onChange={textHandler}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Release Date</Form.Label>
              <Form.Control
                type="text"
                value={EnteredDate}
                onChange={dateHandler}
              />
            </Form.Group>
            <button style={{ marginLeft: "15rem", marginBottom: "20px" }}>
              Submit
            </button>
          </Form>
        </Card>
      </Container>
    );
}
export default MyForm;