import React, {useState, useEffect} from "react";
import {Grid, Typography} from "@material-ui/core";

import RelatedImage from "../relatedImage";

const RelatedImages = (props) => {
    const [relatedImages, setRelatedImages] = useState([]);

    useEffect(() => {
        let randArr = [];
        for (let i = 1; i <= 5; i++) randArr.push(i);
        setRelatedImages(randArr)
    }, []);

    return (
        <>
            <Typography variant="h5">Related images</Typography>
            <Grid container spacing={2} justify="space-between">
                {relatedImages.map(num => (
                    <RelatedImage key={num} id={num}/>
                ))}
            </Grid>
        </>
    )
};

export default RelatedImages
