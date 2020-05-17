import React, {Component} from 'react';
import './home.css';
import Header from './../../common/header/header';
import {CardHeader} from '@material-ui/core';
import {Card, colors} from '@material-ui/core';
import {Avatar} from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import {Grid} from '@material-ui/core';
import {library} from '@fortawesome/fontawesome-svg-core'
import {faCheckSquare, faCoffee, faStar} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

library.add(faCheckSquare, faCoffee, faStar)


class Home extends Component {

    constructor(props) {
        super();
        this.onSearchChangeListener = this.onSearchChangeListener.bind(this);

        this.state = {
            showSearch: "true",
            access_token: "",
            restaurants: [{
                address: {
                    state: {}
                },


            }],


        }


    }
    onSearchChangeListener = event => {
        this.state.posts = []


        var enteredvalue = event.target.value;

        if(enteredvalue==="") {
            this.getRestarauntList()
            return
        }
        console.log(enteredvalue)

        let list = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({restaurants: JSON.parse(this.responseText).restaurants});
                console.log(that.state.restaurants)
            }
        })


        let url = this.props.baseUrl + "/restaurant/name/"+enteredvalue
        console.log("url" + url);
        xhr.open("GET", url);
        xhr.send(list);





    }


    getRestarauntList=()=>
    {

        let list = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({restaurants: JSON.parse(this.responseText).restaurants});
                console.log(that.state.restaurants)
            }
        })


        let url = this.props.baseUrl + "restaurant"
        console.log("url" + url);
        xhr.open("GET", url);
        xhr.send(list);


    }

    componentWillMount() {
        this.state.access_token = sessionStorage.getItem("access-token")
        this. getRestarauntList();

    }


    render() {
        const {classes} = this.props;

        return (<div>
            <Header baseUrl={this.props.baseUrl} showSearch={this.state.showSearch} onChanged={this.onSearchChangeListener}></Header>

            <div className="grid-layout">
                <Grid
                    container spacing={4}
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start">

                    {this.state.restaurants.map(restaurants => (

                        <Card className="card-layout">


                            <CardContent style={{paddingBottom: 0, paddingTop: 0, paddingLeft: 0, paddingRight: 0}}>

                                <img className="image-content"

                                     src={restaurants.photo_URL}
                                     alt="img"
                                />


                                <div className="restaraunt-title">
                                    {restaurants.restaurant_name}
                                </div>
                                <div className="categories">
                                    {restaurants.categories}



                                </div>


                            </CardContent>


                            <div className="bottomcard-layout">
                                <span className="rating-layout"><FontAwesomeIcon icon="star" color="white"/>    {restaurants.customer_rating}({restaurants.number_customers_rated})</span>

                                <span className="price">{restaurants.average_price} for two</span>

                            </div>


                        </Card>
                    ))}

                </Grid>

            </div>


        </div>);
    }
}

export default Home;