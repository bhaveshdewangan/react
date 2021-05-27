
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
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders,postFeedback  } from '../redux/actionCreators'
import { actions } from 'react-redux-form'
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

const mapDispatchToProps = (dispatch) => ({
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    postFeedback: (values) => dispatch(postFeedback(values)),
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
    resetFeedbackForm: () => dispatch(actions.reset('feedback'))
})

class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();

        // const a = new Set([5,10,15])
        // const b = new Set([15, 25, 40])

        // const foo = [...a].filter(a => b.has(a))
        // console.log("FOOOOOOOOOOOOOO \n", foo);
    }

    render() {
        const DishWithId = ({ match }) => {
            return (
                <DishDetail
                    dish={this.props.dishes.dishes.filter(dish => dish.id === parseInt(match.params.dishId, 10))[0]}
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess}
                    comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
                    commentsErrMess={this.props.comments.errMess}
                    postComment={this.props.postComment}
                />
            )
        }
        const HomePage = () => {
            return (
                <Home
                    dish={this.props.dishes.dishes.filter(item => item.featured)[0]}
                    dishesLoading={this.props.dishes.isLoading}
                    dishesErrMess={this.props.dishes.errMess}
                    promosLoading={this.props.promotions.isLoading}
                    promosErrMess={this.props.promotions.errMess}
                    promotion={this.props.promotions.promotions.filter(item => item.featured)[0]}
                    leadersLoading={this.props.leaders.isLoading}
                    leadersErrMess={this.props.leaders.errMess}
                    leader={this.props.leaders.leaders.filter(item => item.featured)[0]}
                />
            )
        }

        return (
            <div className="App">
                <Header />
                <TransitionGroup>
                    <CSSTransition timeout={300} classNames='page' key={this.props.location.key}>
                        <Switch>
                            <Route path='/home' component={HomePage}></Route>
                            <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />}></Route>
                            <Route path='/menu/:dishId' component={DishWithId}></Route>
                            <Route exact path='/contactus' component={() => <ContactUs resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />}></Route>
                            <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders.leaders} leadersLoading={this.props.leaders.isLoading}
                                leadersErrMess={this.props.leaders.errMess} />}></Route>
                            <Redirect to='/home' />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));;
