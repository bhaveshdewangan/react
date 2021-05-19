import { Card, CardTitle, CardImg, CardBody, CardText, Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { Link } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalHeader, Row, Col, Label } from 'reactstrap';
import { Control, Errors, LocalForm } from 'react-redux-form';
import React, { Component } from 'react';

const required = (val) => val && val.length
const minLength = (len) => (val) => !(val) || (val.length >= len);
const maxLength = (len) => (val) => !(val) || (val.length <= len);

export class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
    }

    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody toggle={this.toggleModal}>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className='farm-group  bottom-space'>
                                <Label htmlFor='yourname'>Your Name</Label>
                                <Col>
                                    <Control.text model='.yourname' name='yourname' id='yourname'
                                        placeholder='Your Name'
                                        className='form-control in-between '
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className='text-danger'
                                        model='.yourname'
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Row className='farm-group  bottom-space'>
                                <Label htmlFor='rating'>Rating</Label>
                                <Col>
                                    <Control.select model=".rating"
                                        className='form-control in-between '
                                        name='rating'>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className='farm-group bottom-space'>
                                <Label htmlFor="message">Comment</Label>
                                <Col>
                                    <Control.textarea className='in-between ' model='.comment' id="comment" name="comment" />
                                </Col>
                            </Row>
                            <Row className='farm-group'>
                                <Col>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div >
        )
    }
}

function RenderDishDetail({ dish }) {
    return (
        <Card>
            <CardImg object src={dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    )
}

function RenderComments({ comments }) {
    const comment = comments.map(comment => {
        return (
            <div key={comment.id}>
                <CardText>{comment.comment}</CardText>
                <CardText>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</CardText>
                <br></br>
            </div>
        )
    })
    return (
        <div>
            <h1>Comments</h1>
            { comment}
        </div>
    )
}

export const DishDetail = (props) => {
    if (props.dish != null) {
        return (
            <div className='container'>
                <div className='row'>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDishDetail dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} />
                        <CommentForm />
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div></div>
        )
    }
}