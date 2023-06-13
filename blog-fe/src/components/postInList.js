import { Row, Col} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

const PostInList = ({ post }) => {
    const randomNumber = Math.floor(Math.random() * 1000);
    return (
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={`https://picsum.photos/200/200?random=${randomNumber}`} />
          <Card.Body className='d-flex flex-column'>
                <Card.Title style={{cursor: 'pointer', textAlign: 'left'}} onClick={() => console.log('go to post')}>{post.title}</Card.Title>
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