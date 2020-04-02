import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Card, CardHeader, CardMedia, CardActions, Button} from "@material-ui/core";
import {MdFavorite} from "react-icons/md";

const ImageCard = ({image}) => {
    const [isLike, updateLike] = useState(false);

    const handleToggleLike = () => {
        updateLike(!isLike);
    };
    return (
        <Card>
            <CardHeader title={image.author}/>
            <Link to={`/image/${image.id}`}>
                <CardMedia
                    style={{paddingTop: '56.25%'}}
                    image={image.download_url}
                    title={image.author}
                />
            </Link>
            <CardActions disableSpacing>
                <Button onClick={handleToggleLike}>
                    <MdFavorite color={isLike ? "crimson" : undefined}/>{isLike ? 1 : 0}
                </Button>
            </CardActions>
        </Card>
    )
};

export default ImageCard
