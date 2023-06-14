import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import {Row, Col} from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';
const PostInList = ({ post }) => {
    const navigate = useNavigate();
    const [liked, setLiked] = useState(post.likedByUser);
    const randomNumber = Math.floor(Math.random() * 1000);

    const titleRow = () => {
        return (<Row>
                <Col md={10}>
                  <Card.Title style={{cursor: 'pointer', textAlign: 'left'}} 
                              onClick={() => navigate(`/blog/post/${post.id}`)}>{post.title}
                  </Card.Title>
                </Col>
                <Col md={2}>
                  {liked ? <i class="bi bi-star-fill" onClick={()=>setLiked(false)}></i> 
                                    : <i class="bi bi-star" onClick={()=>setLiked(true)}></i>}
                </Col>
              </Row>)
    }

    return (
        <Card style={{ width: '18rem' }}>
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