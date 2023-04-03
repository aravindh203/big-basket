import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Container,
  Grid,
  Button,
  CardActionArea,
  CardActions,
  Autocomplete,
  TextField,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updatePrice,
  addToCart,
  updateQuantity,
  updateQuantityValue,
  remove,
} from "../slice";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./basket.scss";

const Basket = () => {
  const state = useSelector(({ products }) => products);
  console.log("state", state);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToDetails = (key, id) => {
    var index = state[key].findIndex((value) => value.id === id);

    navigate("/details/" + key + "/" + index);
  };

  const addCart = (
    id,
    productName,
    price,
    discountedPrice,
    weight,
    imageUrl,
    brandName,
    key
  ) => {
    var object = {
      id,
      productName,
      price,
      discountedPrice,
      weight,
      imageUrl,
      quantity: 1,
      brandName,
      category: key,
    };
    var index = state[key].findIndex((value) => value.id === id);

    dispatch(addToCart({ object, key, index }));
  };

  const update = (event, weightPakages, Id, key) => {
    var newIndex = weightPakages.findIndex(
      (value) => value === event.target.innerText
    );
    var index = state[key].findIndex((value) => value.id === Id);

    var authendication;
    if (state.addToCart.length) {
      var values = state.addToCart.filter((value) => value.id === Id);
      var find = values.some(
        (value) => value.weight === event.target.innerText
      );

      if (find) {
        var quantityIndex = state.addToCart.findIndex(
          (value) => value.weight === event.target.innerText
        );
        authendication = true;
        dispatch(updateQuantityValue({ index, quantityIndex, key }));
      } else authendication = false;
    } else {
      authendication = false;
    }

    dispatch(updatePrice({ indexNo: newIndex, index, key, authendication }));
  };

  const updateValues = (event, weight, id, key) => {
    var index = state.addToCart.findIndex((value) => value.weight === weight);
    var mainIndex = state[key].findIndex((value) => value.id === id);

    var updatedValue;
    if (event.target.innerText === "+") {
      updatedValue = state.addToCart[index].quantity + 1;
    } else {
      updatedValue = state.addToCart[index].quantity - 1;
    }

    if (updatedValue === 0) {
      dispatch(remove({ index, id, key, mainIndex }));
    } else {
      dispatch(updateQuantity({ index, key, mainIndex, updatedValue }));
    }
  };

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: false,
  };

  return (
    <section className="content-container">
      <Container className="basket-container">
        <div className="heading">
          <h2>My Smart Basket</h2>
        </div>

        <Grid container className="card-container">
          <Slider {...settings}>
            {state.vegetables.map((value, index) => {
              return (
                <div key={index}>
                  <Grid className="cards">
                    <Card className="card">
                      <CardActionArea>
                        <CardMedia
                          onClick={() => goToDetails(value.category, value.id)}
                          component="img"
                          image={value.imageUrl}
                          height="200"
                          alt={value.productName}
                        />
                        <CardContent>
                          <Typography variant="body2" color="text.secondary">
                            {value.brandName}
                          </Typography>
                          <Typography
                            onClick={() =>
                              goToDetails(value.category, value.id)
                            }
                            gutterBottom
                            variant="body2"
                            className="product-name"
                          >
                            {value.productName}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <div className="card-details">
                        {value.weightPakages.length ? (
                          <Autocomplete
                            options={value.weightPakages}
                            value={value.weight}
                            onChange={(event) =>
                              update(
                                event,
                                value.weightPakages,
                                value.id,
                                value.category
                              )
                            }
                            sx={{ width: 200 }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        ) : (
                          <Typography gutterBottom variant="body2">
                            {value.weight}
                          </Typography>
                        )}

                        <div className="card-actions">
                          <CardActions>
                            <span>
                              MRP:<strike>Rs {value.price}</strike>
                            </span>
                            <Typography gutterBottom variant="body2">
                              Rs {value.discountedPrice}
                            </Typography>
                          </CardActions>
                          <div className="card-content">
                            <div className="card-info">
                              <LocalShippingIcon />
                            </div>
                            <div className="card-info">
                              <p>
                                <span>Standard Delivery:</span> 11 Mar, 7:30AM -
                                10:30AM
                              </p>
                            </div>
                          </div>

                          {value.addTocardAuthendication ? (
                            <div className="add-to-card-button">
                              <div>
                                <button
                                  className="add-button"
                                  onClick={(event) =>
                                    updateValues(
                                      event,
                                      value.weight,
                                      value.id,
                                      value.category
                                    )
                                  }
                                >
                                  +
                                </button>
                                <p>{value.quantity} in basket</p>
                                <button
                                  className="minus-button"
                                  onClick={(event) =>
                                    updateValues(
                                      event,
                                      value.weight,
                                      value.id,
                                      value.category
                                    )
                                  }
                                >
                                  -
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="card-button">
                              <Button className="decrement-button">Qty</Button>
                              <input
                                type={"text"}
                                value={1}
                                onChange={() => {}}
                              ></input>
                              <Button
                                className="increment-button"
                                variant="outlined"
                                onClick={() =>
                                  addCart(
                                    value.id,
                                    value.productName,
                                    value.price,
                                    value.discountedPrice,
                                    value.weight,
                                    value.imageUrl,
                                    value.brandName,
                                    value.category
                                  )
                                }
                              >
                                Add <i className="bi bi-basket-fill"></i>
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="card-offer">
                        <div className="offer">
                          <span>GET {value.offer}% OFF</span>
                          <i className="fa fa-certificate"></i>
                        </div>
                      </div>
                    </Card>
                  </Grid>
                </div>
              );
            })}
          </Slider>
        </Grid>
      </Container>

      <Container className="basket-container">
        <div className="heading">
          <h2>Best Sellers</h2>
        </div>

        <Grid container className="card-container">
          <Slider {...settings}>
            {state.bestSellers.map((value, index) => {
              return (
                <div key={index}>
                  <Grid className="cards">
                    <Card className="card">
                      <CardActionArea>
                        <CardMedia
                          onClick={() => goToDetails(value.category, value.id)}
                          component="img"
                          image={value.imageUrl}
                          height="200"
                          alt={value.productName}
                        />
                        <CardContent>
                          <Typography variant="body2" color="text.secondary">
                            {value.brandName}
                          </Typography>
                          <Typography
                            onClick={() =>
                              goToDetails(value.category, value.id)
                            }
                            gutterBottom
                            variant="body2"
                          >
                            {value.productName}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <div className="card-details">
                        {value.weightPakages.length ? (
                          <Autocomplete
                            options={value.weightPakages}
                            value={value.weight}
                            onChange={(event) =>
                              update(
                                event,
                                value.weightPakages,
                                value.id,
                                value.category
                              )
                            }
                            sx={{ width: 200 }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        ) : (
                          <Typography gutterBottom variant="body2">
                            {value.weight}
                          </Typography>
                        )}

                        <div className="card-actions">
                          <CardActions>
                            <span>
                              MRP:<strike>Rs {value.price}</strike>
                            </span>
                            <Typography gutterBottom variant="body2">
                              Rs {value.discountedPrice}
                            </Typography>
                          </CardActions>
                          <div className="card-content">
                            <div className="card-info">
                              <LocalShippingIcon />
                            </div>
                            <div className="card-info">
                              <p>
                                <span>Standard Delivery:</span> 11 Mar, 7:30AM -
                                10:30AM
                              </p>
                            </div>
                          </div>

                          {value.addTocardAuthendication ? (
                            <div className="add-to-card-button">
                              <div>
                                <button
                                  className="add-button"
                                  onClick={(event) =>
                                    updateValues(
                                      event,
                                      value.weight,
                                      value.id,
                                      value.category
                                    )
                                  }
                                >
                                  +
                                </button>
                                <p>{value.quantity} in basket</p>
                                <button
                                  className="minus-button"
                                  onClick={(event) =>
                                    updateValues(
                                      event,
                                      value.weight,
                                      value.id,
                                      value.category
                                    )
                                  }
                                >
                                  -
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="card-button">
                              <Button className="decrement-button">Qty</Button>
                              <input
                                type={"text"}
                                value={1}
                                onChange={() => {}}
                              ></input>
                              <Button
                                className="increment-button"
                                variant="outlined"
                                onClick={() =>
                                  addCart(
                                    value.id,
                                    value.productName,
                                    value.price,
                                    value.discountedPrice,
                                    value.weight,
                                    value.imageUrl,
                                    value.brandName,
                                    value.category
                                  )
                                }
                              >
                                Add <i className="bi bi-basket-fill"></i>
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="card-offer">
                        <div className="offer">
                          <span>GET {value.offer}% OFF</span>
                          <i className="fa fa-certificate"></i>
                        </div>
                      </div>
                    </Card>
                  </Grid>
                </div>
              );
            })}
          </Slider>
        </Grid>
      </Container>
    </section>
  );
};

export default Basket;
