import React from "react";
import {Grid, Typography} from "@material-ui/core";
import axios from "axios";

import Layout from "../components/layout";
import InfiniteScroll from "../components/infiniteScroll";
import ImageCard from "../components/imageCard";

import {FETCH_IMAGES_URL, PER_PAGE} from "../constants";

class Homepage extends React.Component {
    state = {
        images: [],
        isLoading: true,
        page: 1,
        err: null,
    };

    componentDidMount() {
        this.loadMore()
    }

    loadMore = () => {
        const params = {
            page: this.state.page,
            limit: PER_PAGE
        };

        this.setState({isLoading: true, err: this.state.err});
        axios.get(FETCH_IMAGES_URL, {params})
            .then(res => res.data)
            .then(res => {
                this.setState(state => ({
                    images: [...state.images, ...res],
                    page: state.page + 1,
                    isLoading: false
                }))
            }, err => {
                this.setState({isLoading: false, err})
            })
    };

    render() {
        const {images, err, isLoading, page} = this.state;
        return (
            <Layout>
                {err && (
                    <Typography variant="h1" component="h2" gutterBottom>
                        {err}
                    </Typography>
                )}

                <Grid container spacing={10}>
                    <InfiniteScroll
                        throttle={100}
                        threshold={300}
                        isLoading={isLoading}
                        hasMore={page}
                        onLoadMore={this.loadMore}
                    >
                        {images.map(image => (
                            <Grid item lg={4} key={image.id}>
                                <ImageCard image={image}/>
                            </Grid>
                        ))}
                    </InfiniteScroll>
                </Grid>
            </Layout>
        );
    }
}

export default Homepage;
