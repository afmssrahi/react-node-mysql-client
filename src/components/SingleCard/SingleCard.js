import React from 'react';
import { Card } from 'react-bootstrap';

const SingleCard = (post) => {
	const { title, postText, userName } = post.post;

	return (
		<>
			<Card className='mt-3'>
				<Card.Header>{title}</Card.Header>
				<Card.Body>
					<blockquote className='blockquote mb-0'>
						<p>{postText}</p>
						<footer className='blockquote-footer'>
							Author: <cite title='Source Title'>{userName}</cite>
						</footer>
					</blockquote>
				</Card.Body>
			</Card>
		</>
	);
};

export default SingleCard;
