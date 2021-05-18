import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalHeader, Form, FormGroup, Input, Label } from 'reactstrap';

export class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <Button outline onClick={this.toggleModal.bind(this)}><span className="fa fa-sign-in fa-lg"></span> Submit Comment</Button>

                </div>
            </div>

        )
    }

}