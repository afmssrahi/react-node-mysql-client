import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Card, Modal } from 'react-bootstrap';
import * as Yup from 'yup';

const PostCard = () => {
	// For Get data And show data in UI ------------- start
	const [listOfPost, setListOfPost] = useState([]);

	useEffect(() => {
		axios.get('http://localhost:5000/posts').then((response) => {
			setListOfPost(response.data);
		});
	}, []);
	// For Get data And show data in UI ------------- end

	//===========================================================================

	// For Update data And Open Modal ------------- start
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [beforeUpdateValue, setBeforeUpdateValue] = useState({});

	const initialValues = {
		id: beforeUpdateValue.id,
		title: beforeUpdateValue.title,
		postText: beforeUpdateValue.postText,
		userName: beforeUpdateValue.userName,
	};

	const validationSchema = Yup.object().shape({
		title: Yup.string().required(),
		postText: Yup.string().required(),
		userName: Yup.string().min(3).max(25).required(),
	});

	const handleUpdate = (id) => {
		handleShow();
		const forUpdatePost = listOfPost.find((post) => post.id == id);
		forUpdatePost.id = id;
		setBeforeUpdateValue(forUpdatePost);
	};

	const handleSubmitForUpdate = (data) => {
		// UPDATE LIST OF POST in UI
		const listOfPostUpdateIndex = listOfPost.findIndex(
			(post) => post.id == data.id
		);

		listOfPost[listOfPostUpdateIndex].title = data.title;
		listOfPost[listOfPostUpdateIndex].postText = data.postText;
		listOfPost[listOfPostUpdateIndex].userName = data.userName;

		// UPDATE SERVER DATA
		axios
			.put('http://localhost:5000/posts/update', data)
			.then((response) => {
				handleClose();

				console.log(response);
			});
	};

	// For Update data And Open Modal ------------- end

	//===========================================================================

	// For Delete data ------------- start
	const handleDelete = (id) => {
		console.log(id);
		axios
			.post('http://localhost:5000/posts/delete', { postId: id })
			.then((response) => {
				// UPDATE LIST OF POST in UI
				const listOfPostRemoveIndex = listOfPost.findIndex(
					(post) => post.id == id
				);
				listOfPost.splice(listOfPostRemoveIndex, 1);
				const newListOfPost = [...listOfPost];
				setListOfPost(newListOfPost);

				console.log(response);
			});
	};
	// For Delete data ------------- end

	return (
		<div className='container'>
			{/* Show data in UI ------------start */}
			{listOfPost.map((post) => (
				<Card key={post.id} className='mt-3'>
					<Card.Header>{post.title}</Card.Header>
					<Card.Body>
						<blockquote className='blockquote mb-0'>
							<button
								onClick={() => handleUpdate(post.id)}
								className='btn btn-warning float-end mx-2'
							>
								Edit
							</button>
							<button
								onClick={() => handleDelete(post.id)}
								className='btn btn-danger float-end'
							>
								Delete
							</button>

							<p>{post.postText}</p>

							<footer className='blockquote-footer'>
								Author:{' '}
								<cite title='Source Title'>
									{post.userName}
								</cite>
							</footer>
						</blockquote>
					</Card.Body>
				</Card>
			))}
			{/* Show data in UI ------------end */}

			{/* ============================================== */}

			{/* Modal For Update ----- start */}
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Update Your Post</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Formik
						initialValues={initialValues}
						onSubmit={handleSubmitForUpdate}
						validationSchema={validationSchema}
					>
						<Form>
							<label
								htmlFor='exampleFormControlInputId'
								className='form-label mt-3 ms-2'
							>
								Id:
							</label>
							<Field
								name='id'
								className='form-control'
								id='exampleFormControlInputId'
								readOnly
							/>

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

							<button
								className='btn btn-primary mt-3'
								type='submit'
							>
								Update Post
							</button>
						</Form>
					</Formik>
				</Modal.Body>
			</Modal>
			{/* Modal For Update ----- end */}
		</div>
	);
};

export default PostCard;
