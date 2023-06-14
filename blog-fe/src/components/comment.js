import { Card, Badge } from 'react-bootstrap';
import moment from 'moment';

const Comment = ({ name, email, body, date }) => {
    return (
      <Card className="">
        <Card.Body>
          <Card.Text>{body}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <Badge pill variant="primary">
                {name}
              </Badge>{' '}
              <small>{email}</small>
            </div>
            <small className="text-muted">{moment(date).format('MMMM Do YYYY')}</small>
          </div>
        </Card.Footer>
      </Card>
    );
};

export default Comment;