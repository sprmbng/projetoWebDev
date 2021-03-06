import React from "react";
import '../../css/accessories.css';

import Grid from "../products/grid";

// Simply returns the html used for the top banner, the product grid has its own component in "products"
const Accessories = () => (
    <div>
        <div id="accPhoto">
            <section class="py-5 text-center container">
                <div class="row py-lg-5">
                    <div class="col-lg-6 col-md-8 mx-auto">
                        <h1 class="fw-light text-white">Custom Accessories</h1>
                        <p class="lead fs-5 text-white">You will find a variety of items for your loved ones
                            <br />Only the crème de la crème for your pets
                        </p>
                        <a class="btn btn-primary" href="/uniqueFeat" role="button">Custom Tags</a>
                    </div>
                </div>
            </section>
        </div>
        <Grid category="accessories"/>
    </div>
);

export default Accessories;
