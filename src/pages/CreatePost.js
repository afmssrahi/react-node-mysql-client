import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

const CreatePost = () => {
	const initialValues = {
		title: '',
		postText: '',
		userName: '',
	};

	const validationSchema = Yup.object().shape({
		title: Yup.string().required(),
		postText: Yup.string().required(),
		userName: Yup.string().min(3).max(25).required(),
	});

	const history = useHistory();

	const handleSubmit = (data) => {
		axios.post('http://localhost:5000/posts', data).then((response) => {
			alert('data insert successfully');

			history.push('/home');
		});
	};

	return (
		<div className='container'>
			<Formik
				initialValues={initialValues}
				onSubmit={handleSubmit}
				validationSchema={validationSchema}
			>
				<Form>
					<label
						htmlFor='exampleFormControlInput1'
						className='form-label mt-3 ms-2'
					>
						Title:
					</label>
					<ErrorMessage name='title' component='h5' />
					<Field
						name='title'
						className='form-control'
						id='exampleFormControlInput1'
						placeholder='Enter Your Title'
					/>

					<label
						htmlFor='exampleFormControlInput2'
						className='form-label mt-3 ms-2'
					>
						Post Text:
					</label>
					<ErrorMessage name='postText' component='h5' />
					<Field
						name='postText'
						className='form-control'
						id='exampleFormControlInput2'
						placeholder='Enter Your Post Text'
					/>

					<label
						htmlFor='exampleFormControlInput3'
						className='form-label mt-3 ms-2'
					>
						User Name:
					</label>
					<ErrorMessage name='userName' component='h5' />
					<Field
						name='userName'
						className='form-control'
						id='exampleFormControlInput3'
						placeholder='Enter Your Name'
					/>

					<button className='btn btn-primary mt-3' type='submit'>
						Create Post
					</button>
				</Form>
			</Formik>
		</div>
	);
};

export default CreatePost;
