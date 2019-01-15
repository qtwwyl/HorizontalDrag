import React from 'react';
import PropTypes from 'prop-types';
import "./HorizontalDrag.less"

class HorizontalDrag extends React.PureComponent {

    static propTypes = {

    }

    static defaultProps = {

    }

    constructor(props) {
        super(props);
        this.state = {
            isResizing: false, // 拖拽标识
            resizeWidth: 360,  // 左容器的初始宽度
        }
        this.minWidth = 200;   // 拖拽左右两容器的最小宽度
    }

    handledrag = e => {
        const { isResizing } = this.state;
        if (isResizing) {
            const leftContainer = document.querySelector('.resize-left');
            const resizeContainerWidth = document
                .querySelector('.resize-container')
                .getBoundingClientRect().width;
            const { left: clientLeft } = leftContainer.getBoundingClientRect();
            let tempWidth = e.clientX - clientLeft;
            if (tempWidth < this.minWidth) {
                tempWidth = this.minWidth;
            }
            if (resizeContainerWidth - tempWidth < this.minWidth) {
                tempWidth = resizeContainerWidth - this.minWidth;
            }
            this.setState({
                resizeWidth: tempWidth,
            });
        }
    };

    startResizing = () => {
        this.setState({
            isResizing: true,
        });
    };

    stopResizing = () => {
        this.setState({
            isResizing: false,
        });
    };

    attachDragListener = () => {
        const colResize = document.querySelector('.col-resize');
        const resizeContainer = document.querySelector('.resize-container');
        resizeContainer.addEventListener('mousemove', this.handledrag);
        resizeContainer.addEventListener('mouseup', this.stopResizing);
        resizeContainer.addEventListener('mouseleave', this.stopResizing);
        colResize.addEventListener('mousedown', this.startResizing);
    };

    componentDidMount() {
        this.attachDragListener();
    }

    render(){
        const {
            isResizing,
            resizeWidth,
        } = this.state;
        return (
            <div classname="resize-container" 
                style={{
                    cursor: isResizing ? 'colResize' : 'default',
                    userSelect: isResizing ? 'none' : 'auto',
                }}>
                <div classname="resize-left" style={{ width: resizeWidth }}>
                    leftContainer
                </div>
                <div className="col-resize" />
                <div className="resize-right">
                    rightContainer
                </div>
            </div>
        )
    }
}