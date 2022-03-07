import Link from "next/link";
import { useState, useEffect } from "react";
import fetch from 'isomorphic-unfetch';
import {Button, Form, Loader} from 'semantic-ui-react';
import { useRouter } from "next/router";

const UpdateNote = ({note})=> {
 const [form, setForm] = useState({
     title: note.title,
     description: note.description
 })
 const [isSubmitting, setIsSubmitting] = useState(false)
 const [errors, setErrors] = useState({});
 const router = useRouter();
 
 useEffect(()=> {
    if (isSubmitting) {
        if (errors && Object.keys(errors).length == 0) {
            UpdateNote()
        }
        else {
            setIsSubmitting(false);
        }
    }
 }, [errors])

 const handleChange = e => {
     setForm({
         ...form,
         [e.target.name]: e.target.value
     })
 }

 const handleSubmit = e =>{
     e.preventDefault();
     let err = validate();
     setErrors(err);
     setIsSubmitting(true)
 }

 const validate = ()=>{
     let errors = {}

     if (!form.title) {
         errors.title = 'Please Enter a Title'
     }
     if (!form.description) {
         errors.description = 'Description is Required'
     }
     return errors;
 }

 const UpdateNote = async() => {
     try {
         const res = await fetch(`${process.env.HOST}api/notes/${router.query.id}`, {
            method: 'PUT',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
         })
         router.push('/')
     }
     catch (err) {
         console.log(err)
     }
 }

 return (
     <div className="form-container">
         <h1>Update Note</h1>
         <div>
             {
                isSubmitting ? <Loader active inline='centered' /> :
                <Form onSubmit={handleSubmit}>
                    <Form.Input 
                        fluid = {true}
                        label='Title'
                        placeholder='Title'
                        name='title'
                        value={form.title}
                        onChange={handleChange}
                        error={errors.title ? {
                            content: errors.title,
                            pointing: 'below'
                        }: null}/>
                    <Form.TextArea 
                        fluid = "true"
                        label='Description'
                        placeholder='Description'
                        name='description'
                        value={form.description}
                        onChange={handleChange}
                        error={errors.description ? {
                            content: errors.description,
                            pointing: 'below'
                        }: null}/>
                    <Button type="submit">Update</Button>
                </Form>
             }
         </div>
     </div>
 )
}

UpdateNote.getInitialProps = async ({ query: {id}})=> {
    const res = await fetch(`${process.env.HOST}api/notes/${id}`)
    const { data } = await res.json()

    return {
        note: data
    }
}

export default UpdateNote