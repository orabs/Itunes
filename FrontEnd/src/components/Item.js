// @flow
import React, { PropTypes,Component } from 'react';
import { getKind, kindColorMap } from '../utils';
import type ,{ SearchResult } from '../type';
import '../style/Item.scss';
import Modal from './modal';




// Generate the card template for each item on the results list
class Item extends Component {



    constructor(props) {
        super(props);
        this.state = { isOpen: false };
        console.log(this.props);

    }


    toggleModal() {
        console.log('clicked');
        this.setState({
            isOpen: !this.state.isOpen
        });
        console.log(this.state.isOpen);
    }

// toggleModal = (index) => {
//
//
//     console.log(this.props.index)
//     console.log(index)
//     let temp=this.state.items;
//     temp[index]=true;
//     this.setState({
//         items: temp
//     });
//     console.log(this.state.items[index]);
//     console.log(this.state.items);
// }


    render(){ return(

  <div className="card-wrapper" >

    <div className="card" >
      <div className="card-image waves-effect waves-block waves-light">
        <img
          alt="img"
          className="activator"
          src={this.props.artworkUrl100.replace('100x100', '1200x1200')}
          onClick={this.toggleModal.bind(this)}
        />

      </div>
      <div className="card-content" >

          <Modal poster={this.props.artworkUrl100.replace('100x100', '1200x1200')}
                 previewUrl={this.props.previewUrl}
                 index={this.props.index}
                 show={this.state.isOpen}
                 onClose={this.toggleModal.bind(this)}>

          </Modal>
        <span className = "card-title activator grey-text text-darken-4" >  {
          this.props.trackName || this.props.collectionName
        }
        <i  onClick={this.toggleModal.bind(this)} className="material-icons right">more_vert</i></span>
        <span>
   <a target = "_blank" href = {this.props.trackViewUrl || this.props.collectionViewUrl} > more </a>
          {
            getKind(this.props.kind).length ?
              <p className={`right kind white-text ${this.props.kind in kindColorMap ? `${kindColorMap[this.props.kind]}` : 'black'}`}>
                {getKind(this.props.kind)}
              </p> : null
          }

        </span>

      </div>



      </div>
    </div>
  // </div>
)};

}
export default Item;
