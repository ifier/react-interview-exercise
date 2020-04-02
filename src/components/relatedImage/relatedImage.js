import React from "react";
import {Paper, Grid} from "@material-ui/core";
import {Link} from "react-router-dom";

import {GET_IMAGE_URL} from "../../constants";

const RelatedImage = ({id}) => {
    const MODIFIED_URL = GET_IMAGE_URL.replace('info','400')
    return (
        <Grid item lg={2}>
            <Link to={`/image/${id}`}>
                <Paper variant='elevation' square>
                    <img src={MODIFIED_URL.replace(':id', id)}
                         alt="Related images"
                         style={{ width: "100%" }}/>
                </Paper>
            </Link>
        </Grid>
    )
};

export default RelatedImage;
