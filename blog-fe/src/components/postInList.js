import { useState, useContext } from 'react';
import useApiErrorHandling from '../hooks/useApiErrorHandling';
import { authContext } from '../context/authContext';
import Card from 'react-bootstrap/Card';
import {Row, Col} from 'react-bootstrap';
import postService from '../services/postService';
import { useNavigate } from 'react-router-dom';
import ErrorAlert from './errorAlert';
import Spinner from 'react-bootstrap/Spinner';

const PostInList = ({ post }) => {
    const navigate = useNavigate();
    const { getUser } = useContext(authContext);
    const [loading, setLoading] = useState(false);
    const [liked, setLiked] = useState(post.likedByUser);
    const [error, handleApiError] = useApiErrorHandling()
    const randomNumber = Math.floor(Math.random() * 1000);

    const onClickStar = async () => {
      setLoading(true)
      try{
        await postService.addOrRemoveFavouritePosts(getUser().id, [post.id], !liked)
        setLiked(!liked)
      } catch(error) {
        handleApiError(error)
      }
      setLoading(false)
    }

    const titleRow = () => {
        return (<Row>
                <Col md={10}>
                  <Card.Title style={{cursor: 'pointer', textAlign: 'left'}} 
                              onClick={() => navigate(`/blog/post/${post.id}`)}>{post.title}
                  </Card.Title>
                </Col>
                <Col md={2}>
                  {loading ? <Spinner animation="border" size="sm"></Spinner> 
                           : liked ? <i style={{cursor: 'pointer'}}class="bi bi-star-fill" onClick={()=>onClickStar()}></i> 
                                   : <i style={{cursor: 'pointer'}} class="bi bi-star" onClick={()=>onClickStar()}></i>}
                </Col>
              </Row>)
    }

    return (
        <Card style={{ width: '18rem' }}>
          {error ? <ErrorAlert error={error} /> : null}
          <Card.Img variant="top" src={`https://picsum.photos/200/200?random=${randomNumber}`} />
          <Card.Body className='d-flex flex-column'>
                {titleRow()}
                <Card.Text style={{textAlign: 'left'}}>
                    {post.body}
                </Card.Text>
                <Card.Text className='mt-auto' style={{alignSelf: 'flex-end'}}>
                    <b>{post.author}</b>
                </Card.Text>
          </Card.Body>
        </Card>
      );
}

export default PostInList;