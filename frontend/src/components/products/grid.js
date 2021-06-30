import React from "react";

function Grid(){
    // Handles add to cart button press
    function addToCart() {
      // Gets the login id from sessionStorage, null means that user isn't logged.
      let logID = sessionStorage.getItem('@login/id');
      // Checks if the user is logged in
      if (logID) {
        // Stores that an item should be added and go to cart page.
        let addItem = 1;
        sessionStorage.setItem('@item/shouldAdd', addItem);
        window.location.href = "/cart";
      } else
        alert("Please log in!");
    }

    // Stores a single item Thumbnail template.
    function itemPreview(){
        return(
            <div class="col">
                <div class="card shadow-sm">
                    <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
                        <title>Placeholder</title>
                        <rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text>
                    </svg>

                    <div class="card-body">
                        <p class="card-text">Product description</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <a href="/itemPage"><button type="button" class="btn btn-sm btn-outline-secondary">View</button></a>
                                <button type="button" onClick={() => addToCart()} class="btn btn-sm btn-outline-secondary">Add to cart</button>
                            </div>
                            <h5><small class="text-primary">R$1234.56</small></h5>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Returns an array of items.
    function formGrid(){
        let grid = [], length = 9;
        for(let i = 0; i < length; i++)
            grid.push(itemPreview());
        return grid;
    }

    return(
        <div class="album py-5 bg-light">
            <div class="container">
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    {formGrid()}
                </div>
            </div>
        </div>
    );
}

export default Grid;
