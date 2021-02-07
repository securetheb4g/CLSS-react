import React,{ useState,useEffect} from 'react'
import {useParams,useHistory} from 'react-router-dom'
import {getPost} from '../Services/postServices.js'
import {useGlobalState} from '../utils/stateContext'
import {deletePost} from '../Services/postServices'

export default function PostDetails() {
	const [post,setPost] = useState(null)
	const {id} = useParams()
	let history = useHistory()
	const {store,dispatch} = useGlobalState()
	const {loggedInUser} = store
	useEffect(() => {
		getPost(id)
		.then((post) => setPost(post))
		.catch((error) => console.log(error))
	},[id])
	

	if (!post) return null
	function handleDelete() {
		deletePost(id)
		.then(() => {
			dispatch({type: 'deletePost', data: id})
			history.push('/posts')
		})
	}
	return (
		<div>
			<p>Job: {post.name}</p>			
			<p>{post.text}</p>
			{loggedInUser ?
			<>
				<button onClick={() => history.push(`/posts/update/${id}`)}>Update</button>
				<button onClick={handleDelete}>Delete</button>
			</>
			:
			<>
			<p>no one logged in</p>
			</>
			}
		</div>
	
	)
}