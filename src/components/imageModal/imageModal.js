import React, {useState} from "react";
import {Modal, Fade, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
}));


const ImageModal = ({onOpen}) => {
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);

    // const handleOpen = () => {
    //     setIsOpen(true)
    // };
    //
    // const handleClose = () => {
    //     setIsOpen(false);
    // };

    return (
        <Modal
            className={classes.modal}
            open={isOpen}
            onClose={() => setIsOpen(false)}
            closeAfterTransition
        >
            <Fade in={isOpen}>
                <div className={classes.paper}>
                    <p>DDD</p>
                </div>
            </Fade>
        </Modal>
    )
};

export default ImageModal;
