import React, {Component} from 'react'
import './header.css';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';
import ReactModal from 'react-modal';
import Snackbar from '@material-ui/core/Snackbar';

import Modal from 'react-modal';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import {makeStyles} from '@material-ui/core/styles';
import {withStyles} from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const TabContainer = function (props) {
    return (
        <Typography component="div" style={{padding: 0, textAlign: 'center'}}>
            {props.children}
        </Typography>
    )
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
}

const StyledButton = withStyles({
    root: {

        color: 'white',
        minWidth: '250px',
        borderColor: 'white',
        '& $notchedOutline': {
            borderColor: 'rgba(0, 0, 0, 0.23)',
        },
        '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
            borderColor: '#4A90E2',
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
                borderColor: 'rgba(0, 0, 0, 0.23)',
            },
        },
        '&$focused $notchedOutline': {
            borderColor: '#4A90E2',
            borderWidth: 1,
        },
    },
    label: {
        textTransform: 'capitalize',
    },
})(Input);

class Header extends Component {


    constructor(props) {

        super(props);
        this.state = {
            anchorEl:null,
            menuvisible: false,
            showModal: false,
            modalIsOpen: false,
            value: 0,
            usernameRequired: "dispNone",
            username: "",
            loginPasswordRequired: "dispNone",
            loginPassword: "",
            firstnameRequired: "dispNone",
            firstname: "",
            lastnameRequired: "dispNone",
            lastname: "",
            emailRequired: "dispNone",
            email: "",
            registerPasswordRequired: "dispNone",
            registerPassword: "",
            contactRequired: "dispNone",
            contact: "",
            registrationSuccess: false,
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
            contactErrorMessage: "required",
            loginErrorMessage: "required",
            emailErrorMessage: "required",
            passwordErrorMessage: "required",
            contactSignupErrorMessage: "required",
            showSnackbar: false,
            snackbarMessage: "",
            first_name:"",
            first_name_profile:localStorage.getItem("first_name"),

        }

    }

    openModalHandler = () => {
        this.setState({
            modalIsOpen: true,
            value: 0,
            usernameRequired: "dispNone",
            username: "",
            loginPasswordRequired: "dispNone",
            loginPassword: "",
            firstnameRequired: "dispNone",
            firstname: "",
            lastnameRequired: "dispNone",
            lastname: "",
            emailRequired: "dispNone",
            email: "",
            registerPasswordRequired: "dispNone",
            registerPassword: "",
            contactRequired: "dispNone",
            contact: "",
        });
    }

    closeModalHandler = () => {
        this.setState({modalIsOpen: false});
    }

    tabChangeHandler = (event, value) => {
        this.setState({value});
    }


    inputUsernameChangeHandler = (e) => {
        this.setState({username: e.target.value});
    }

    inputLoginPasswordChangeHandler = (e) => {
        this.setState({loginPassword: e.target.value});
    }
    openSnackbar = (messageContent) => {
        this.state.showSnackbar = true
        this.state.snackbarMessage = messageContent

    }
    hidesnackBar = (event, reason) => {

        console.log("hidesnackBar")
        this.setState({showSnackbar: false})

    }


    /**
     REGISTER API
     **/

    registerClickHandler = () => {

        this.state.emailErrorMessage = "required"
        this.state.contactSignupErrorMessage = "required"
        this.state.passwordErrorMessage = "required"

        this.state.firstname === "" ? this.setState({firstnameRequired: "dispBlock"}) : this.setState({firstnameRequired: "dispNone"});
        this.state.lastname === "" ? this.setState({lastnameRequired: "dispBlock"}) : this.setState({lastnameRequired: "dispNone"});
        this.state.email === "" ? this.setState({emailRequired: "dispBlock"}) : this.setState({emailRequired: "dispNone"});
        this.state.registerPassword === "" ? this.setState({registerPasswordRequired: "dispBlock"}) : this.setState({registerPasswordRequired: "dispNone"});
        this.state.contact === "" ? this.setState({contactRequired: "dispBlock"}) : this.setState({contactRequired: "dispNone"});

        if (this.state.firstname === "" || this.state.email === "" || this.state.registerPassword === "" || this.state.contact === "")
            return


        let dataSignup = JSON.stringify({
            "email_address": this.state.email,
            "first_name": this.state.firstname,
            "last_name": this.state.lastname,
            "contact_number": this.state.contact,
            "password": this.state.registerPassword
        });

        let xhrSignup = new XMLHttpRequest();
        let that = this;
        xhrSignup.addEventListener("readystatechange", function () {
            var codeerror = JSON.parse(this.responseText).code;
            var messageerror = JSON.parse(this.responseText).message

            console.log(this.responseText)

            if (this.readyState === 4 && JSON.parse(this.responseText).status === "CUSTOMER SUCCESSFULLY REGISTERED") {
                that.setState({
                    registrationSuccess: true
                })
                that.setState({
                    value: 0,
                    showSnackbar: true,
                    snackbarMessage: "Registered successfully! Please login now!"
                })
            } else {

                if (codeerror === "SGR-002") {
                    that.state.emailErrorMessage = messageerror
                    that.setState({emailRequired: "dispBlock"})

                } else if (codeerror === "SGR-003") {
                    that.state.contactSignupErrorMessage = messageerror
                    that.setState({contactRequired: "dispBlock"})

                } else if (codeerror === "SGR-004") {
                    that.state.passwordErrorMessage = messageerror
                    that.setState({registerPasswordRequired: "dispBlock"})

                } else {

                    that.state.contactSignupErrorMessage = messageerror
                    that.setState({contactRequired: "dispBlock"})
                }


                console.log(codeerror)
                console.log(messageerror)


            }
        });

        xhrSignup.open("POST", this.props.baseUrl + "customer/signup");
        xhrSignup.setRequestHeader("Content-Type", "application/json");
        xhrSignup.setRequestHeader("Cache-Control", "no-cache");
        xhrSignup.send(dataSignup);
    }

    /**
     USER LOGIN API
     **/

    loginButtonHandler = () => {
        this.state.contactErrorMessage = "required"
        this.state.loginErrorMessage = "required"
        this.state.username === "" ? this.setState({usernameRequired: "dispBlock"}) : this.setState({usernameRequired: "dispNone"});
        this.state.loginPassword === "" ? this.setState({loginPasswordRequired: "dispBlock"}) : this.setState({loginPasswordRequired: "dispNone"});

        if (this.state.username === "" || this.state.loginPassword === "")
            return;
        if (this.state.username.length != 10) {
            this.state.contactErrorMessage = "Invalid Contact"
            this.setState({usernameRequired: "dispBlock"})
            return;

        }


        let dataLogin = null;
        let xhrLogin = new XMLHttpRequest();
        let that = this;
        xhrLogin.addEventListener("readystatechange", function () {
            if (this.readyState === 4 && xhrLogin.status === 200) {

                sessionStorage.setItem("uuid", JSON.parse(this.responseText).id);
                sessionStorage.setItem("access-token", xhrLogin.getResponseHeader("access-token"));

                that.openSnackbar("Logged in successfully!")
                that.setState({
                    loggedIn: true
                });
                that.setState({first_name_profile:JSON.parse(this.responseText).first_name})
                localStorage.setItem("first_name", JSON.parse(this.responseText).first_name);
                localStorage.setItem("last_name", JSON.parse(this.responseText).last_name);

                that.closeModalHandler();
            } else if (xhrLogin.status === 401 && this.responseText != "") {

                var codeerror = JSON.parse(this.responseText).code;
                var messageerroe = JSON.parse(this.responseText).message
                console.log(codeerror)
                console.log(messageerroe)

                if (codeerror != "")
                    if (codeerror === "ATH-001") {
                        that.state.contactErrorMessage = messageerroe
                        that.setState({usernameRequired: "dispBlock"})
                    } else {
                        that.state.loginErrorMessage = messageerroe
                        that.setState({loginPasswordRequired: "dispBlock"})
                    }


            }

        });

        xhrLogin.open("POST", this.props.baseUrl + "customer/login");
        xhrLogin.setRequestHeader("Authorization", "Basic " + window.btoa(this.state.username + ":" + this.state.loginPassword));
        xhrLogin.setRequestHeader("Content-Type", "application/json");
        xhrLogin.setRequestHeader("Cache-Control", "no-cache");
        xhrLogin.send(dataLogin);


    }
    inputFirstNameChangeHandler = (e) => {
        this.setState({firstname: e.target.value});
    }

    inputLastNameChangeHandler = (e) => {
        this.setState({lastname: e.target.value});
    }

    inputEmailChangeHandler = (e) => {
        this.setState({email: e.target.value});
    }

    inputRegisterPasswordChangeHandler = (e) => {
        this.setState({registerPassword: e.target.value});
    }

    inputContactChangeHandler = (e) => {
        this.setState({contact: e.target.value});
    }

    /**
     USER LOGOUT API
     **/

    logoutHandler = (e) => {

        let dataLogout = null;
        let xhrLogout = new XMLHttpRequest();
        let that = this;
        xhrLogout.addEventListener("readystatechange", function () {


            if (this.readyState === 4 && xhrLogout.status === 200) {
                sessionStorage.removeItem("uuid");
                sessionStorage.removeItem("access-token");

                that.setState({
                    loggedIn: false,
                    menuvisible:false,
                });

            } else if(xhrLogout.status != 200){
                console.log("ELSE")

                that.setState({
                    value: 0,
                    showSnackbar: true,
                    snackbarMessage: JSON.parse(this.responseText).message
                })



            }

        });

        xhrLogout.open("POST", this.props.baseUrl + "customer/logout");
        xhrLogout.setRequestHeader("Authorization",  sessionStorage.getItem("access-token"));
        xhrLogout.setRequestHeader("Content-Type", "application/json");
        xhrLogout.setRequestHeader("Cache-Control", "no-cache");
        xhrLogout.send(dataLogout);

    }
    openMenu=(e)=>{
        this.setState({menuvisible: true})
        this.setState({anchorEl:e.currentTarget})

    }
    handleClose=()=>{
        this.setState({menuvisible: false})

    }


    render() {

        return (
            <div>

                <header className="app-header">


                    <span className="app-title">
                        <FastfoodIcon/>
                     </span>


                    <span className="header-center-align">
                        <FormControl>
                            <StyledButton className="input-search" onChange={this.props.onChanged}
                                          inputProps={{color: "#ffffff"}}
                                          placeholder="Search by Restaurant Name"
                                          id="input-with-icon-adornment"
                                          startAdornment={
                                              <InputAdornment position="start">
                                                  <SearchIcon/>
                                              </InputAdornment>
                                          }/>
                  </FormControl>
                    </span>
                    <span className="header-right-align">



                        {!this.state.loggedIn ?
                            <Button onClick={this.openModalHandler}
                                    variant="contained"
                                    color="default"
                                    startIcon={<AccountCircleIcon/>}>
                                LOGIN
                            </Button>
                            :
                            <span className="profile" onClick={this.openMenu}>

                                <AccountCircleIcon className="account-icon"></AccountCircleIcon>     {this.state.first_name_profile}

                            </span>

                        }
                        <Menu className="menu-margin"
                            id="simple-menu"
                            keepMounted
                            open={this.state.menuvisible}
                            anchorEl={this.state.anchorEl}
                            onClose={this.handleClose}
                        >
                          <MenuItem onClick={this.props.onMyProfileClickHandler}>My Profile</MenuItem>
                          <MenuItem onClick={this.logoutHandler}>Logout</MenuItem>
</Menu>


                        <ReactModal
                            isOpen={this.state.showModal}
                            contentLabel="Minimal Modal Example"
                        >
          <button onClick={this.handleCloseModal}>Close Modal</button>
        </ReactModal>
                    </span>

                </header>
                <Modal
                    ariaHideApp={false}
                    isOpen={this.state.modalIsOpen}
                    contentLabel="Login"
                    onRequestClose={this.closeModalHandler}
                    style={customStyles}
                >
                    <Tabs className="tabs" value={this.state.value} onChange={this.tabChangeHandler}>
                        <Tab label="Login"/>
                        <Tab label="Signup"/>
                    </Tabs>

                    {this.state.value === 0 &&
                    <TabContainer>
                        <br/>

                        <FormControl required className="form-width">
                            <InputLabel htmlFor="username">Contact No.</InputLabel>
                            <Input id="username" type="text" username={this.state.username}
                                   onChange={this.inputUsernameChangeHandler}/>
                            <FormHelperText className={this.state.usernameRequired}>
                                <span className="red">{this.state.contactErrorMessage}</span>
                            </FormHelperText>
                        </FormControl>
                        <br/><br/>
                        <FormControl required className="form-width">
                            <InputLabel htmlFor="loginPassword">Password</InputLabel>
                            <Input id="loginPassword" type="password" loginpassword={this.state.loginPassword}
                                   onChange={this.inputLoginPasswordChangeHandler}/>
                            <FormHelperText className={this.state.loginPasswordRequired}>
                                <span className="red">{this.state.loginErrorMessage}</span>
                            </FormHelperText>
                        </FormControl>
                        <br/><br/>
                        <br/><br/>
                        <Button variant="contained" color="primary" onClick={this.loginButtonHandler}>LOGIN</Button>
                    </TabContainer>
                    }

                    {this.state.value === 1 &&
                    <TabContainer>
                        <br/>

                        <FormControl required className="form-width">
                            <InputLabel htmlFor="firstname">First Name</InputLabel>
                            <Input id="firstname" type="text" firstname={this.state.firstname}
                                   onChange={this.inputFirstNameChangeHandler}/>
                            <FormHelperText className={this.state.firstnameRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl>
                        <br/><br/>
                        <FormControl required className="form-width">
                            <InputLabel htmlFor="lastname">Last Name</InputLabel>
                            <Input id="lastname" type="text" lastname={this.state.lastname}
                                   onChange={this.inputLastNameChangeHandler}/>
                            <FormHelperText className={this.state.lastnameRequired}>
                            </FormHelperText>
                        </FormControl>
                        <br/><br/>
                        <FormControl required className="form-width">
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input id="email" type="text" email={this.state.email}
                                   onChange={this.inputEmailChangeHandler}/>
                            <FormHelperText className={this.state.emailRequired}>
                                <span className="red">{this.state.emailErrorMessage}</span>
                            </FormHelperText>
                        </FormControl>
                        <br/><br/>
                        <FormControl required className="form-width">
                            <InputLabel htmlFor="registerPassword">Password</InputLabel>
                            <Input id="registerPassword" type="password" registerpassword={this.state.registerPassword}
                                   onChange={this.inputRegisterPasswordChangeHandler}/>
                            <FormHelperText className={this.state.registerPasswordRequired}>
                                <span className="red">{this.state.passwordErrorMessage}</span>
                            </FormHelperText>
                        </FormControl>
                        <br/><br/>
                        <FormControl required className="form-width">
                            <InputLabel htmlFor="contact">Contact No.</InputLabel>
                            <Input id="contact" type="text" contact={this.state.contact}
                                   onChange={this.inputContactChangeHandler}/>
                            <FormHelperText className={this.state.contactRequired}>
                                <span className="red">{this.state.contactSignupErrorMessage}</span>
                            </FormHelperText>
                        </FormControl>
                        <br/><br/>
                        <br/><br/>
                        <Button variant="contained" color="primary"
                                onClick={this.registerClickHandler}>SIGNUP</Button>
                    </TabContainer>
                    }
                </Modal>


                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.showSnackbar}
                    autoHideDuration={4000}
                    onClose={this.hidesnackBar}


                    message={this.state.snackbarMessage}

                />
            </div>
        )
    }

}

export default Header;