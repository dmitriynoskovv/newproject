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
import {Control, Errors, LocalForm} from "react-redux-form";
import {Loading} from './LoadingComponent'
import { baseUrl } from './shared/baseUrl'


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
        this.modal()
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment)
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
                                    <Control.text model='.author' id='author' name='author'
                                                  placeholder='Your name'
                                                  className='form-control'
                                    validators={{
                                        required,
                                        minLength: minLength(3),
                                        maxLength: maxLength(15)
                                    }}/>
                                    <Errors className='text-danger'
                                            model='.author'
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
                                    <Control.textarea model='.comment' id='comment' name='comment'
                                                      placeholder='Your comment'
                                                      rows='6'
                                                      className='form-control'
                                                      validators={{
                                                          required,
                                                          minLength: minLength(3),
                                                          maxLength: maxLength(300)}}/>
                                    <Errors className='text-danger'
                                            model='.comment'
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
                <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name}/>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    )

}


function RenderComments({comments, postComment, dishId}) {
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
                <CommentForm dishId={dishId} postComment={postComment}/>
            </div>
        )
    else {
        return (<div></div>)
    }
}

const Dishdetail = (props) => {

    if (props.isLoading) {
        return (
            <div className='container'>
                <div className='row'>
                    <Loading />
                </div>
            </div>
        )
    }
    else if (props.errMess) {
        return (
            <div className='container'>
                <div className='row'>
                   <h4>{props.errMess}</h4>
                </div>
            </div>
        )
    }

    else if (props.dish != null)
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
                    <RenderComments comments={props.comments}
                                    postComment={props.postComment}
                                    dishId={props.dish.id}/>
                </div>

            </div>
        )
    else
        return (<div></div>)
}


export default Dishdetail;