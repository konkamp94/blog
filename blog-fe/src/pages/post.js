import { useContext, useEffect, useState } from "react"
import { authContext } from "../context/authContext"
import { useParams, useNavigate } from "react-router-dom"
import postService from "../services/postService"
import ErrorAlert from "../components/errorAlert"
import Comment from "../components/comment"
import CustomSpinner from "../components/spinner"
import useApiErrorHandling from "../hooks/useApiErrorHandling"
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import moment from 'moment';
const Post = () => {
    const { id } = useParams()
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [liked, setLiked] = useState(false)
    const [error, handleApiError] = useApiErrorHandling()

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

    const onClickStar = () => {
        console.log('clicked')
    }

    const postLayout = () => {
        return (
            <Container>
                  <Card className="mt-4">
                    <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <Card.Title>{post.title}</Card.Title>
                      <i class="bi bi-star" onClick={onClickStar}></i>
                    </div>
                      <Card.Subtitle className="mb-2 text-muted" style={{textAlign: 'left'}}>
                        Published on {moment(post.createdAt).format('MMMM Do YYYY')} by {post.author}
                      </Card.Subtitle>
                      <hr />
                      <Card.Text style={{textAlign: 'left'}}>
                            {post.body}{post.body}{post.body}{post.body}{post.body}
                      </Card.Text>
                      <Card.Text style={{textAlign: 'left'}}>
                            {post.body}{post.body}{post.body}{post.body}{post.body}
                      </Card.Text>
                      <Card.Text style={{textAlign: 'left'}}>
                            {post.body}{post.body}{post.body}{post.body}{post.body}s
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  {
                    post.comments.map(comment => {
                        return <Comment name={comment.name} 
                                        email={comment.email}
                                        body={comment.body}
                                        date={comment.createdAt}
                               />
                    })
                  }
            </Container>
          );
    }

    return (
        <>  
            {error && <ErrorAlert message={error} />}
            {!loading ? postLayout() : <CustomSpinner />}
        </>
    )
}

export default Post