import React, {
  Component
} from 'react';
import axios from 'axios';

import '../../css/adm.css';
import '../../css/logos.css';

import clients from '../../images/adm/clients.svg'
import group from '../../images/adm/group.svg'
import stock from '../../images/adm/stock.svg'

// ADM page, it can be accessed by clicking the name of the adm when logged in.
class Adm extends Component{
    constructor() {
      super();
      // Stores user input (not secure at all please read the Comment topic in README)
      this.state = {
        stock_s_product_slugname: '',
        stock_d_product_id: '',
        stock_a_product_name: '',
        stock_a_product_slug_name: '',
        stock_a_product_description: '',
        stock_a_product_price: '',
        stock_a_product_quantity: '',
        stock_a_product_category: ''
      };
      this.handleChange = this.handleChange.bind(this);

      //stock
      this.handleStockSearchSubmit = this.handleStockSearchSubmit.bind(this);
      this.handleStockDeleteSubmit = this.handleStockDeleteSubmit.bind(this);
      this.handleStockAddSubmit = this.handleStockAddSubmit.bind(this);
    }

    //Auxiliar functions
    hasBlankSpace(s) {
        return /\s/g.test(s);
    }

    // Gets input
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    //Stock
    handleStockSearchSubmit(event) {
        event.preventDefault();
        const slug = this.state.stock_s_product_slugname;
        if (!this.hasBlankSpace(slug)) {
            axios.get('http://localhost:8000/products/' + slug)
                .then((res) => {
                    if(res.status == 202)
                        alert("Product not found!")
                    else if(res.status == 200){
                        window.open('http://localhost:8000/products/' + slug, 'blank')
                    }
                    else if(res.status == 500){
                        alert("Failed to process requisition")
                    }
                })
        }
    }

    handleStockDeleteSubmit(event) {
        event.preventDefault();
        const id = this.state.stock_d_product_id;
        if (id) {
            axios.delete('http://localhost:8000/products/' + id)
                .then((res) => {
                    if(res.status == 202)
                        alert("Product not found!");
                    else if(res.status == 200){
                        alert("Product removed!");
                    }
                    else if(res.status == 500){
                        alert("Failed to process requisition");
                    }
                })
                .catch((err) => {
                    alert("Failed to process requisition, make sure the ID has the correct format");
                })
        }
    }

    handleStockAddSubmit(event) {
        event.preventDefault();
        const newProduct = {
            name: this.state.stock_a_product_name,
            slug: this.state.stock_a_product_slugname,
            description: this.state.stock_a_product_description,
            price: this.state.stock_a_product_price,
            quantity: this.state.stock_a_product_quantity,
            category: this.state.stock_a_product_category,
        };

        if(newProduct.price > 0 && newProduct.quantity > 0 && !this.hasBlankSpace(newProduct.slug)){
            axios.post('http://localhost:8000/products/', newProduct)
            .then((res) => {
                if (res.status == 201) {
                    alert("Product added!");
                } else if (res.status == 200) {
                    alert("Failed to process requisition, make sure the all fields has the correct format");
                } else if (res.status == 500) {
                    alert("Failed to process requisition");
                }
            })
            .catch((err) => {
                alert("Failed to process requisition, make sure the all fields has the correct format");
            })
        } else {
            alert("Failed to process requisition, make sure the all fields has the correct format");
        }
    }

    stockFrontEnd(){
        return(
            <div class="container px-4 py-5">
                <h2 class="pb-2 d-flex justify-content-center border-bottom" id="stock">
                    Stock Control
                </h2>
                <div>
                    <div class="controls">
                        <div class="row py-5">
                            <div class="col-sm-4">
                                <h4 class="pb-2 d-flex justify-content-center border-bottom">Search Product by slug</h4>
                                <form class="form-group" onSubmit={this.handleStockSearchSubmit}>
                                    <label for="form_name">Slug</label>
                                    <input name="stock_s_product_slugname" id="form_name" type="text" class="form-control" placeholder="Slug name" onChange={this.handleChange} required="required"/>
                                    <div class="help-block with-errors"></div>
                                    <br/>
                                    <button class="btn btn-lg btn-dark" type="submit">Search</button>
                                </form>
                                <h4 class="pb-2 py-5 d-flex border-bottom">See stock</h4>
                                <a href="http://localhost:8000/products" target='blank'><button type="button" class="btn btn-dark">Get API</button></a>

                            </div>
                            <div class="col-sm-4">
                                <h4 class="pb-2 d-flex justify-content-center border-bottom">Delete product by ID</h4>
                                <form class="form-group" onSubmit={this.handleStockDeleteSubmit}>
                                    <label for="form_id">Product ID</label>
                                    <input id="form_id" type="text" name="stock_d_product_id" class="form-control" placeholder="Product ID" onChange={this.handleChange} required="required"/>
                                    <div class="help-block with-errors"></div>
                                    <br/>
                                    <button class="btn btn-lg btn-dark" type="submit">Delete</button>
                                </form>
                            </div>
                            <div class="col-sm-4">
                                <h4 class="pb-2 d-flex justify-content-center border-bottom">Add product</h4>
                                <form class="form-group" onSubmit={this.handleStockAddSubmit}>
                                    <label for="form_name">Name</label>
                                    <input id="form_name" type="text" name="stock_a_product_name" class="form-control" placeholder="Min 4 and Max 50 letters" onChange={this.handleChange} required="required"/>
                                    <label for="form_name">Slug</label>
                                    <input id="form_name" type="text" name="stock_a_product_slugname" class="form-control" placeholder="Must not have spaces" onChange={this.handleChange} required="required"/>
                                    <label for="form_name">Description</label>
                                    <input id="form_name" type="text" name="stock_a_product_description" class="form-control" placeholder="Min 5 and Max 500 letters" onChange={this.handleChange} required="required"/>
                                    <label for="form_name">Price</label>
                                    <input id="form_name" type="number" name="stock_a_product_price" class="form-control" placeholder="Must be > 0" onChange={this.handleChange} required="required"/>
                                    <label for="form_name">Quantity</label>
                                    <input id="form_name" type="number" name="stock_a_product_quantity" class="form-control" placeholder="Must be > 0" onChange={this.handleChange} required="required"/>
                                    <label for="form_name">Category</label>
                                    <input id="form_name" type="text" name="stock_a_product_category" class="form-control" placeholder="Category" onChange={this.handleChange} required="required"/>
                                    <br/>
                                    <button class="btn btn-lg btn-dark" type="submit">Add</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    //Users
    usersFrontEnd(){
        return(
            <div class="container px-4 py-5">
                <h2 class="pb-2 d-flex justify-content-center border-bottom" id="users">Users Control</h2>
                <form id="contact-form" role="form">
                    <div class="controls">
                        <div class="row py-5">
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <h4 class="pb-2 d-flex justify-content-center border-bottom">Search user by ID</h4>
                                    <label for="form_id">User ID</label>
                                    <input id="form_id" type="number" name="id" class="form-control" placeholder="User ID" required="required"/>
                                    <div class="help-block with-errors"></div>
                                    <br/>
                                    <button class="btn btn-lg btn-dark" type="submit">Search</button>
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <h4 class="pb-2 d-flex justify-content-center border-bottom">Delete ser by ID</h4>
                                    <label for="form_id">User ID</label>
                                    <input id="form_id" type="number" name="id" class="form-control" placeholder="User ID" required="required"/>
                                    <div class="help-block with-errors"></div>
                                    <br/>
                                    <button class="btn btn-lg btn-dark" type="submit">Delete</button>
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <h4 class="pb-2 d-flex justify-content-center border-bottom">Updated user by ID</h4>
                                    <label for="form_name">User ID</label>
                                    <input id="form_id" type="number" name="id" class="form-control" placeholder="User ID" required="required"/>
                                    <label for="form_name">Name</label>
                                    <input id="form_name" type="text" name="name" class="form-control" placeholder="User name" required="required"/>
                                    <label for="form_name">Email</label>
                                    <input id="form_name" type="email" name="email" class="form-control" placeholder="user@domain.com" required="required"/>
                                    <label for="form_name">Password</label>
                                    <input id="form_name" type="number" name="password" class="form-control" placeholder="Password" required="required"/>
                                    <br/>
                                    <button class="btn btn-lg btn-dark" type="submit">Update</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    // Orders
    ordersFrontEnd(){
        return(
            <div class="container px-4 py-5">
                <h2 class="pb-2 d-flex justify-content-center border-bottom" id="orders">Orders Control</h2>
                <form id="contact-form" role="form">
                    <div class="controls">
                        <div class="row py-5">
                            <div class="col-sm-4">
                            </div>
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <h4 class="pb-2 d-flex justify-content-center border-bottom">Search user by ID</h4>
                                    <label for="form_id">User ID</label>
                                    <input id="form_id" type="number" name="id" class="form-control" placeholder="User ID" required="required"/>
                                    <div class="help-block with-errors"></div>
                                    <br/>
                                    <button class="btn btn-lg btn-dark" type="submit">Search</button>
                                </div>
                            </div>
                            <div class="col-sm-4">
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    render(){
        return(
            <div>
                <div class="container px-4 py-5">
                    <h2 class="pb-2 border-bottom">ADM Control Panel</h2>
                    <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
                        <div class="feature col">
                            <div class="feature-icon bg-primary bg-gradient">
                                <img id="icons" src={stock}/>
                            </div>
                            <h2>Manage Stock</h2>
                            <p>Control all itens in stock.</p>
                            <a href="#stock" class="btn btn-primary">
                                Go Now!
                            </a>
                        </div>
                        <div class="feature col">
                            <div class="feature-icon bg-primary bg-gradient">
                                <img id="icons" src={group}/>
                            </div>
                            <h2>Manage Users</h2>
                            <p>Add or remove ADMs and Users .</p>
                            <a href="#users" class="btn btn-primary">
                                Go Now!
                            </a>
                        </div>
                        <div class="feature col">
                            <div class="feature-icon bg-primary bg-gradient">
                                <img id="icons" src={clients}/>
                            </div>
                            <h2>Manage Orders</h2>
                            <p>Search users orders.</p>
                            <a href="#orders" class="btn btn-primary">
                                Go Now!
                            </a>
                        </div>
                    </div>
                </div>

                <div class="divider"></div>

                {this.stockFrontEnd()}

                <div class="divider"></div>

                {this.usersFrontEnd()}

                <div class="divider"></div>

                {this.ordersFrontEnd()}

            </div>
        );
    }
}
export default Adm;
