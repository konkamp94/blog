import { useContext, useEffect, useState } from "react"
import { authContext } from "../context/authContext"
import { useParams } from "react-router-dom"
import postService from "../services/postService"
import ErrorAlert from "../components/errorAlert"
import Comment from "../components/comment"
import CustomSpinner from "../components/spinner"
import Spinner from 'react-bootstrap/Spinner';
import useApiErrorHandling from "../hooks/useApiErrorHandling"
import { Container, Card } from 'react-bootstrap';
import moment from 'moment';
const Post = () => {
    const { id } = useParams()
    const { getUser } = useContext(authContext)
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [likeLoading, setLikeLoading] = useState(false)
    const [liked, setLiked] = useState(null)
    const [error, handleApiError] = useApiErrorHandling()

    useEffect(() => {
        const getPost = async () => {
            try {
                const response = await postService.getPost(id)
                setPost(response.data)
                setLiked(response.data.likedByUser)
            } catch (error) {
                setLoading(false)
                handleApiError(error)
            }
            setLoading(false)
        }
        getPost()
    }, [])

    const onClickStar = async () => {
      setLikeLoading(true)
      try{
        await postService.addOrRemoveFavouritePosts(getUser().id, [post.id], !liked)
        setLiked(!liked)
      } catch(error) {
        handleApiError(error)
      }
      setLikeLoading(false)
    }

    const postLayout = () => {
        return (
            <Container>
                  <Card className="mt-4">
                    <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <Card.Title>{post.title}</Card.Title>
                      {likeLoading ? <Spinner animation="border" size="sm"></Spinner> 
                           : liked ? <i style={{cursor: 'pointer'}}class="bi bi-star-fill" onClick={()=>onClickStar()}></i> 
                                   : <i style={{cursor: 'pointer'}} class="bi bi-star" onClick={()=>onClickStar()}></i>}
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
                  <h3 className="mt-4" style={{textAlign: 'left'}}>Comments</h3>
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
            {!loading && !error? postLayout() : !error ? <CustomSpinner /> : null}
        </>
    )
}

export default Post