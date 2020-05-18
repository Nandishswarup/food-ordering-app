import React, {Component} from 'react';
import './home.css';
import Header from '../../common/header/Header';
import {Card, colors} from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import {library} from '@fortawesome/fontawesome-svg-core'
import {faCheckSquare, faCoffee, faStar} from '@fortawesome/free-solid-svg-icons'
import GridListTile from "@material-ui/core/GridListTile";
import GridList from "@material-ui/core/GridList";
import {withStyles} from "@material-ui/styles";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

library.add(faCheckSquare, faCoffee, faStar)


const styles = theme => ({
    nullRestaurantList: {
        marginTop: 15,
        marginLeft: 25,
    },
    restaurantCardsGridList: {
        margin: 'auto',
    },
    restaurantCard: {
        width: 290,
        maxWidth: 300,
        height: 340,
        maxHeight: 340,
        marginTop: 15,
        marginBottom: 10,
        marginLeft: 25,
        marginRight: 0,
        paddingBottom: 15,
        cursor: 'pointer',
    },
    restaurantCardMedia: {
        height: 140
    },
    restaurantName: {
        marginBottom: 20,
    },
    ratingAvgRateDiv: {
        position: 'absolute',
        bottom: 20,
    },
    restaurantRatingDiv: {
        backgroundColor: '#EACC5E',
        width: 100,
        textAlign: 'center',
        float: 'left'
    },
    restaurantRatingText: {
        color: 'white',
    },
    restaurantAvgRateText: {
        marginLeft: 30,
        float: 'right',
    },
});

class Home extends Component {

    constructor(props) {
        super();
        this.onSearchChangeListener = this.onSearchChangeListener.bind(this);
        this.openProfile = this.openProfile.bind(this);

        this.state = {
            noResult:"no-result-gone",
            showSearch: "true",
            access_token: "",
            restaurants: [],
            cards: 4
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
                console.log(JSON.parse(this.responseText).restaurants.length)
                if(JSON.parse(this.responseText).restaurants.length==0)
                    that.setState({noResult:"no-result-visible"})
                else
                    that.setState({noResult:"no-result-gone"})

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
    openProfile=()=>
    {
        this.props.history.push({
            pathname: "/profile",
            state: {
                defaultAccessToken: this.state.defaultAccessToken

            }
        })
    }

    //This function send the id of clicked restaurant to the further details page
    restaurantCardTileOnClickHandler = (restaurantId) => {
        this.props.history.push('/restaurant/'+restaurantId);
        this.updateCardsGridListCols();
    }

    updateCardsGridListCols = () => {
        if (window.innerWidth >= 1530) {
            this.setState({ cards: 5 });
            return;
        }

        if (window.innerWidth >= 1270) {
            this.setState({ cards: 4 });
            return;
        }

        if (window.innerWidth >= 1000) {
            this.setState({ cards: 3 });
            return;
        }


        if (window.innerWidth >= 500) {
            this.setState({ cards: 2 });
            return;
        }

        this.setState({ cards: 1 });
    }


    render() {
        const {classes} = this.props;

        return (
            <div>
            <Header baseUrl={this.props.baseUrl} showSearch={this.state.showSearch} onChanged={this.onSearchChangeListener} onMyProfileClickHandler={this.openProfile} />
            <div className={this.state.noResult}>
             No restaurant with the given name
            </div>
                <GridList
                    className={classes.restaurantCardsGridList}
                    cols={this.state.cards}
                    cellHeight='auto'
                >
                    {this.state.restaurants.map(restaurant => (
                        <GridListTile
                            onClick={()=>this.restaurantCardTileOnClickHandler(restaurant.id)}
                            key={'restaurant' + restaurant.id}>
                            {/* restaurant details card */}
                            <Card className={classes.restaurantCard} style={{ textDecoration: 'none' }}>
                                <CardMedia
                                    className={classes.restaurantCardMedia}
                                    image={restaurant.photo_URL}
                                    title={restaurant.restaurant_name}/>
                                <CardContent>
                                    {/* restaurant name */}
                                    <Typography className={classes.restaurantName} gutterBottom variant='h5' component='h2'>
                                        {restaurant.restaurant_name}
                                    </Typography>
                                    {/* restaurant categories */}
                                    <Typography variant="body2" color="textSecondary" component="p" style={{marginBottom:8}}>
                                        {restaurant.categories}
                                    </Typography>
                                    <div className={classes.ratingAvgRateDiv}>
                                        {/* restaurant rating */}
                                        <div className={classes.restaurantRatingDiv}>
                                            <Typography className={classes.restaurantRatingText} variant='body2'>
                                                <i className="fa fa-star"></i> {restaurant.customer_rating} ({restaurant.number_customers_rated})
                                            </Typography>
                                        </div>
                                        {/* restaurant average price */}
                                        <Typography className={classes.restaurantAvgRateText} variant='body2'>
                                            <i className="fa fa-inr"></i>{restaurant.average_price} for two
                                        </Typography>
                                    </div>

                                </CardContent>
                            </Card>
                        </GridListTile>
                    ))}
                </GridList>
            </div>)
    }
}

export default withStyles(styles)(Home);