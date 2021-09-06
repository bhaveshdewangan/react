import { Card, CardTitle, CardImg, CardBody, CardText, Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { Link } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalHeader, Row, Col, Label } from 'reactstrap';
import { Control, Errors, LocalForm } from 'react-redux-form';
import React, { Component } from 'react';
import { Loading } from './LoadingComponent'
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import Experiment1 from './experiments/Experiment1'
import Experiment2 from './experiments/Experiment2'

const required = (val) => val && val.length
const minLength = (len) => (val) => !(val) || (val.length >= len);
const maxLength = (len) => (val) => !(val) || (val.length <= len);

export class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            dummyVar: 0
        }

        // this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
        // this.setState({dummyVar: this.state.dummyVar + 1})
        // this.setState({dummyVar: this.state.dummyVar + 1})
        // this.setState({dummyVar: this.state.dummyVar + 1})

        this.setState((state) => {
            console.log("FIRST SET STATE - 1", state);
            return { dummyVar: state.dummyVar + 1 }
        });
        this.setState((state) => {
            console.log("FIRST SET STATE - 2", state);
            return { dummyVar: state.dummyVar + 1 }
        });
        this.setState((state) => {
            console.log("FIRST SET STATE - 3", state);
            return { dummyVar: state.dummyVar + 1 }
        });
        console.log(this.state.dummyVar);
        setTimeout(() => {
            console.log("AFTER TIME OUT", this.state.dummyVar);
        }, 3000)
    }

    handleSubmit(values) {
        console.log(this.props, values);
        this.props.postComment(this.props.dishId, values.rating, values.yourname, values.comment)
        // console.log('Current State is: ' + JSON.stringify(values));
        // alert('Current State is: ' + JSON.stringify(values));
    }

    testClickFn() {
        console.log(this, this.children, this.tag, this.state);
    }

    render() {
        return (
            <div>
                <Button outline onClick={() => this.toggleModal()}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={() => this.toggleModal()}>
                    <ModalHeader toggle={() => this.toggleModal()}>Submit Comment</ModalHeader>
                    <ModalBody toggle={() => this.toggleModal()}>
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
        <FadeTransform
            in
            transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
            <Card>
                <CardImg object src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </FadeTransform>
    )
}

function RenderComments({ comments, commentsErrMess }) {
    if (commentsErrMess) {

    } else {
        const comment = comments.map(comment => {
            return (
                <Fade in>
                    <div key={comment.id}>
                        <CardText>{comment.comment}</CardText>
                        <CardText>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</CardText>
                        <br></br>
                    </div>
                </Fade>

            )
        })
        return (
            <Stagger in>
                <div>
                    <h1>Comments</h1>
                    {comment}
                </div>
            </Stagger>
        )
    }
}

export const DishDetail = (props) => {
    if (props.isLoading) {
        return (
            <div className='container'>
                <div className='row'>
                    <Loading />
                </div>
            </div>
        )
    } else if (props.errMess) {
        return (
            <div className='container'>
                <div className='row'>
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        )
    } else if (props.dish != null) {
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
                        <RenderComments comments={props.comments} commentsErrMess={props.commentsErrMess} />
                        <CommentForm dishId={props.dish.id} postComment={props.postComment} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <Experiment1 />
                        <Experiment2 />
                    </div>
                </div>
            </div >
        );
    } else {
        return (
            <div></div>
        )
    }
}