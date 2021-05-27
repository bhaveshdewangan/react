import React from "react"
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';
import { Loading } from './LoadingComponent'
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform } from 'react-animation-components';

function RenderCard({ item, loading, error }) {
    if (loading) {
        return (
            <Loading />
        )
    } else if (error) {
        return (
            <h4>{error}</h4>
        )
    } else {
        return (
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                    <CardImg src={baseUrl + item.image} alt={item.name} />
                    <CardBody>
                        <CardTitle>{item.name}</CardTitle>
                        {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
                        <CardText>{item.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        )
    }

}

function Home(props) {
    return (
        <div className='Container'>
            <div className='row align-item-start'>
                <div className='col-md col-12 m-1'>
                    <RenderCard item={props.dish}
                        loading={props.dishesLoading}
                        error={props.dishesErrMess} />
                </div>
                <div className='col-md col-12 m-1'>
                    <RenderCard item={props.promotion}
                        loading={props.promosLoading}
                        error={props.promosErrMess} />
                </div>
                <div className='col-md col-12 m-1'>
                    <RenderCard item={props.leader}
                    loading={props.leadersLoading}
                    error={props.leadersErrMess} />
                </div>
            </div>
        </div>
    )
}

export default Home;
