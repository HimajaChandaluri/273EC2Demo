import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {backendURL} from "../../config.json"

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {  
            books : []
        }
    }  
    //get the books data from backend  
    componentDidMount(){
        axios.get(backendURL+'/home')
                .then((response) => {
                //update the state with the response data
                this.setState({
                    books : response.data
                });
            });
    }

    render(){
        //iterate over books to create a table row
        let details = this.state.books.map(book => {
            return(
                <tr>
                    <td>{book.BookID}</td>
                    <td>{book.Title}</td>
                    <td>{book.Author}</td>
                </tr>
            )
        })
        //if not logged in go to login page
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        }
        return(
            <div>
                {redirectVar}
                <div class="container">
                    <h2>List of All Books</h2>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Book ID</th>
                                    <th>Title</th>
                                    <th>Author</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/*Display the Table row based on data recieved*/}
                                {details}
                            </tbody>
                        </table>
                </div> 
            </div> 
        )
    }
}
//export Home Component
export default Home;