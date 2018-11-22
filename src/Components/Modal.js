import React, { Component } from 'react';
import './../Styles/Modal.css';
import Confetti from './Confetti';

class Modal extends Component {
  render() {
    if (this.props.won) {
      requestAnimationFrame(Confetti);
    }
    const showHideClassName = (this.props.lost || this.props.won) ? "modal display-block" : "modal display-none";
    return (
      <div onClick={this.props.handleClose} className={showHideClassName}>
        <section className="modal-main">
        <h3>{this.props.status}</h3>
          {/* <button className="Restart" onClick={() => this.props.setInitialState()}>Restart game</button>  */}
          <button className="Close" onClick={this.props.handleClose}>Close</button>
        </section>
      </div>
    );
  }
}

export default Modal;