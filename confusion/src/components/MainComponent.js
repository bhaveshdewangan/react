
import React, { Component } from 'react';
import Header from './HeaderComponent';
import { Footer } from './FooterComponent'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { Menu } from './MenuComponent'
import Home from './HomeComponent'
import ContactUs from './ContactComponent'
import { DishDetail } from './DishdetailComponent';
import About from './AboutComponent'
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }

}

class Main extends Component {

    // constructor(props) {
    //     super(props);
    // }

    render() {
        const DishWithId = ({ match }) => {
            return (
                <DishDetail
                    dish={this.props.dishes.filter(dish => dish.id === parseInt(match.params.dishId, 10))[0]}
                    comments={this.props.comments.filter(comment => comment.id === parseInt(match.params.dishId, 10))}
                />
            )
        }
        const HomePage = () => {
            return (
                <Home
                    dish={this.props.dishes.filter(item => item.featured)[0]}
                    promotion={this.props.promotions.filter(item => item.featured)[0]}
                    leader={this.props.leaders.filter(item => item.featured)[0]}
                />
            )
        }

        return (
            <div className="App">
                <Header />
                <Switch>
                    <Route path='/home' component={HomePage}></Route>
                    <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />}></Route>
                    <Route path='/menu/:dishId' component={DishWithId}></Route>
                    <Route exact path='/contactus' component={ContactUs}></Route>
                    <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders} />}></Route>
                    <Redirect to='/home' />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps)(Main));;
