import React from "react";
import { throttle } from "lodash";
import {CircularProgress, Container} from "@material-ui/core";

class InfiniteScroll extends React.Component {
    static getDefaultProps = {
        threshold: 100,
        throttle: 64
    };

    componentDidMount() {
        this.scrollHandler = throttle(this.checkWindowScroll, this.props.throttle);
        this.resizeHandler = throttle(this.checkWindowScroll, this.props.throttle);

        window.addEventListener('scroll', this.scrollHandler);
        window.addEventListener('resize', this.resizeHandler);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollHandler);
        window.removeEventListener('resize', this.resizeHandler);
    }

    componentDidUpdate() {
        this.checkWindowScroll();
    }

    checkWindowScroll = () => {
        if (this.props.isLoading) return;

        if (this.props.hasMore && this.sentinel.getBoundingClientRect().top - window.innerHeight < this.props.threshold) {
            this.props.onLoadMore();
        }
    }

    render() {
        const sentinel = <div ref={i => this.sentinel = i} />;

        if (this.props.render) {
            return this.props.render({
                sentinel,
                children: this.props.children
            });
        }

        if (this.props.component) {
            const Container = this.props.component;
            return (
                <Container sentinel={sentinel}>
                    {this.props.children}
                </Container>
            );
        }

        return (
            <>
                {this.props.children}
                {sentinel}
                {
                <Container maxWidth="lg"
                            style={{
                                display: 'flex',
                                justifyContent: 'center'
                            }}>
                    <CircularProgress />
                </Container>
                }
            </>
        );
    }
}

export default InfiniteScroll;
