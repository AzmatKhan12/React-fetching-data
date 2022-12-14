import React from "react";
import MyForm from "./MyForm";

const FormInput = props =>{

    const submitHandler= event=>{
        event.preventDefault();
    }
    return (
       <MyForm Submit={submitHandler}/>
    );
}
export default FormInput;

