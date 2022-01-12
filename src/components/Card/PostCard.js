import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SingleCard from '../SingleCard/SingleCard';

const PostCard = () => {
	const [listOfPost, setListOfPost] = useState([]);

	useEffect(() => {
		axios.get('http://localhost:5000/posts').then((response) => {
			setListOfPost(response.data);
		});
	}, []);

	return (
		<div className='container'>
			{listOfPost.map((post) => (
				<SingleCard key={post.id} post={post}></SingleCard>
			))}
		</div>
	);
};

export default PostCard;
