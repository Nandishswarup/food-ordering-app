import React, {Component} from 'react';
import './home.css';
import Header from './../../common/header/header';


class Home extends Component {

    constructor(props) {
        super();
        this.state = {
            showSearch: "true",

        }
    }


    render() {
        const { classes } = this.props;

        return (<div>
            <Header baseUrl={this.props.baseUrl}  showSearch={this.state.showSearch}></Header>

            home page
        </div>);
    }
}

export default Home;