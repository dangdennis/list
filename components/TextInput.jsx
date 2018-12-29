import React from 'react';
import { Subscribe } from 'unstated';
import WishListContainer from '../container/WishListContainer';

class TextInput extends React.Component {
  render() {
    return (
      <Subscribe to={[WishListContainer]}>
        {wishlist => (
          <div className="field has-addons" {...this.props}>
            <div className="control is-expanded">
              <input
                className="input is-primary"
                name="name"
                type="text"
                placeholder="Enter name"
                onChange={wishlist.handleChange}
                onKeyPress={wishlist.handleKeyPress}
                value={wishlist.state.name}
              />
            </div>
            <div className="control">
              <button onClick={wishlist.handleWishClick} className="button is-info">Wish!</button>
            </div>
          </div>
        )}
      </Subscribe>
    );
  }
}

export default TextInput;
