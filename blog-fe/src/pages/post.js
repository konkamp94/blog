import { useContext, useEffect, useState } from "react"
import { authContext } from "../context/authContext"
import { useParams, useNavigate } from "react-router-dom"
import postService from "../services/postService"
import ErrorAlert from "../components/errorAlert"
import CustomSpinner from "../components/spinner"
import useApiErrorHandling from "../hooks/useApiErrorHandling"
import { Container } from "react-bootstrap"

const Post = () => {
    const { logout } = useContext(authContext)
    const { id } = useParams()
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, handleApiError] = useApiErrorHandling()
    const navigate = useNavigate()

    useEffect(() => {
        const getPost = async () => {
            try {
                const response = await postService.getPost(id)
                setPost(response.data)
            } catch (error) {
                handleApiError(error)
            }
            setLoading(false)
        }
        getPost()
    }, [])

    return (
        <>  
            {error && <ErrorAlert message={error} />}
            {!loading ? (<Container>
                            <h1>{post.title}</h1>
                            <p>{post.body}</p>
                            <ul>
                                {post.comments.map(comment => {
                                     return <li>{comment.name} {comment.body}</li>
                                })}
                            </ul>
                         </Container>)
            : <CustomSpinner />}
        </>
    )
}

export default Post