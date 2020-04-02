import React, {useState, useEffect, useCallback} from "react";
import {useParams} from "react-router";
import {
    CircularProgress,
    Container,
    Grid, IconButton, Typography
} from "@material-ui/core";
import {MdFileDownload} from "react-icons/md";
import axios from "axios";

import Layout from "../components/layout";
import RelatedImages from "../components/relatedImages";
import ImageModal from "../components/imageModal";

import {GET_IMAGE_URL} from "../constants";

const ImagePage = () => {
    const {id} = useParams();
    const [image, setImage] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, raiseNewError] = useState();

    const fetchImage = useCallback(async () => {
        try {
            const {data} = await axios.get(GET_IMAGE_URL.replace(':id', id));
            setImage(data);
            setIsLoading(false);
        } catch (e) {
            raiseNewError(e)
        }
    }, [id]);

    useEffect(() => {
        setIsLoading(true);
        fetchImage();
    }, [fetchImage]);


    return (
        <Layout>
          {error && (
              <Typography variant="h1" component="h2" gutterBottom>
                {error}
              </Typography>
          )}

            {!isLoading ? (
                    <>
                        <Grid container spacing={2} justify="center">
                            <Grid item xs={12}>
                                <Grid container justify="center">
                                    <Grid item>
                                        <IconButton href={image.download_url}>
                                            <MdFileDownload/>
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={8}>
                                <img src={image.download_url}
                                     alt={image.author}
                                     width="100%" />
                            </Grid>
                        </Grid>
                        <ImageModal isOpen={isModalOpen}
                                    onOpen={!setIsModalOpen}
                                    onCloseModal={setIsModalOpen}
                        />
                        <RelatedImages id={id}/>
                    </>
                )
                : (
                    <>
                        <Container maxWidth="lg"
                                   style={{
                                       display: 'flex',
                                       justifyContent: 'center'
                                   }}>
                            <CircularProgress/>
                        </Container>
                    </>
                )}
        </Layout>
    );
};


export default ImagePage;
