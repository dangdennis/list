import React from 'react';

class TextInput extends React.Component {
  render() {
    return (
      <div className="field has-addons">
        <div className="control is-expanded">
          <input
            className="input is-primary"
            name="name"
            type="text"
            placeholder="Enter name"
            onChange={this.props.handleChange}
            onKeyPress={this.props.handleKeyPress}
            value={this.props.text}
            disabled={this.props.loading}
          />
        </div>
        <div className="control">
          <button
            onClick={this.props.handleWishClick}
            className={`button is-info ${this.props.loading && 'is-loading'}`}
          >
            Wish!
          </button>
        </div>
      </div>
    );
  }
}

export default TextInput;
