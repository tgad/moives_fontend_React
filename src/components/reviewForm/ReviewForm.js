import {Form,Button} from 'react-bootstrap';
import './ReviewForm.css';

const ReviewForm = ({handleSubmit, revText, setRevText, labelText}) => {
  return (
    <Form className="review-form" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTexttarea1">
        <Form.Label>{labelText}</Form.Label>
        <Form.Control as="textarea" rows = {3} value={revText} onChange={e => setRevText(e.target.value)} placeholder="write a review"/>
      </Form.Group>
      <Button variant="outline-info" type="submit">Submit</Button>
    </Form>
  );
}
export default ReviewForm