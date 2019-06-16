import React from 'react';
import './Modal.css';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
    }
  }

  changeTitle(title) {
    this.setState({ title });
  }

  render() {
    const { isOpen, saveSong } = this.props;

    return isOpen ? (
      <div className="Modal">
        <div className="Modal-content">
          Title
          <input onChange={(e) => this.changeTitle(e.target.value)} />
          <button
            onClick={() => {
              saveSong(this.state.title);
            }}>Save</button>
        </div>
      </div>
    ) : null;
  }
}

export default Modal;
