import React, {useState, Component} from 'react';
import {
    Card,
    CardBody,
    CardImg,
    CardText,
    CardTitle,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter, Col, Row, Label
} from 'reactstrap';
import {Link} from 'react-router-dom'
import {Control, Errors, Form, LocalForm} from "react-redux-form";


/*const CommentForm = () => {
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)*/

const minLength = (len) => (val) => val && (val.length >= len)
const required = (val) => val && val.length
const maxLength = (len) => (val) => !(val) || (val.length <= len)


class CommentForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isModal: false
        }
        
        this.modal = this.modal.bind(this)
    }

    formSubmit(values) {
        alert(JSON.stringify("Name: " + values.username + " Comment: " + values.textarea + " Rating: " + values.rating))
    }
    modal() {
        this.setState({
            isModal: !this.state.isModal
        })
    }

    render() {
        return (
                <>
                <Button color="primary" onClick={this.modal}>Submit Comment</Button>
                <Modal isOpen={this.state.isModal} toggle={this.modal}>

                    <LocalForm onSubmit={(values) => this.formSubmit(values)}>

                    <ModalHeader toggle={this.modal} >Enter a comment</ModalHeader>
                    <ModalBody>
                            <Row className='form-group'>
                                <Col>
                                    <Label>Rating</Label>
                                    <Control.select model='.rating' name='contactType'
                                                    className='form-control'>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Col>
                                    <Label>Your name</Label>
                                    <Control.text model='.username' id='username' name='username'
                                                  placeholder='Your name'
                                                  className='form-control'
                                    validators={{
                                        required,
                                        minLength: minLength(3),
                                        maxLength: maxLength(15)
                                    }}/>
                                    <Errors className='text-danger'
                                            model='.username'
                                            show='touched'
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater then 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}/>
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Col>
                                    <Control.textarea model='.textarea' id='textarea' name='textarea'
                                                      placeholder='Your comment'
                                                      rows='6'
                                                      className='form-control'
                                                      validators={{
                                                          required,
                                                          minLength: minLength(3),
                                                          maxLength: maxLength(300)}}/>
                                    <Errors className='text-danger'
                                            model='.textarea'
                                            show='touched'
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater then 2 characters',
                                                maxLength: 'Must be 300 characters or less'
                                            }}/>
                                </Col>
                            </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button type='submit' color="primary" >Add comment</Button>{' '}
                        <Button color="primary" onClick={this.modal}>Cancel</Button>
                    </ModalFooter>
                    </LocalForm>
                </Modal>
            </>
        )
    }
}



function RenderDish({dish}) {

    return (
        <div className='col-12 col-md-5 m1'>
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name}/>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    )

}


function RenderComments({comments}) {
    if (comments != null)

        return (
            <div className='col-12 col-md-5 m1'>
                <h4>Comments</h4>
                <ul className='list-unstyled'>
                    {comments.map((comment) => {
                        return (
                            <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: '2-digit'
                                }).format(new Date(Date.parse(comment.date)))} --</p>
                            </li>
                        )
                    })}
                </ul>
                <CommentForm/>
            </div>
        )
    else {
        return (<div></div>)
    }
}

const Dishdetail = (props) => {

    console.log('Dishdetail render')

    if (props.dish != null)
        return (
            <div className="container">
                <div className='row'>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className='col-12'>
                        <h3>{props.dish.name}</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={props.dish}/>
                    <RenderComments comments={props.comments}/>

                </div>

            </div>
        )
    else
        return (<div></div>)
}


export default Dishdetail;