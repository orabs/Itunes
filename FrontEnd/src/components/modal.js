import React from 'react';
import PropTypes from 'prop-types';

import "../../node_modules/video-react/dist/video-react.css";
import '../style/modal.scss'
import { Player } from 'video-react';
class Modal extends React.Component {


    constructor(props){
        super(props)
        console.log("asffs" +this.props.artworkUrl100);
    }
    render() {
        // Render nothing if the "show" prop is false
        if(!this.props.show) {
            return null;
        }

        // The gray background
        const backdropStyle = {
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
            padding: 50
        };

        // The modal "window"
        const modalStyle = {
            backgroundColor: '#fff',
            borderRadius: 5,
            maxWidth: 500,
            minHeight: 300,
            margin: '0 auto',
            padding: 30
        };

        return (
            <div index={this.props.index} className="backdropStyle" style={{backdropStyle}}>
                <div className="modalStyle" style={{modalStyle}}>

                    <button className="close btn red" onClick={this.props.onClose}>
                        <i className="material-icons  black-text">backspace</i>
                    </button>

                    <div className="player">
                    <Player
                        playsInline
                        poster={this.props.poster}
                        src={this.props.previewUrl}/>

                    </div>


                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
    children: PropTypes.node
};

export default Modal;