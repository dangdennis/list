import React from 'react';
import axios from 'axios';
import global from '../global';
const { DEV } = global;
class Wish extends React.Component {
  static defaultProps = {
    wisher: {
      wishes: []
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      wishes: [...this.props.wisher.wishlist],
      name: ''
    };
  }

  handleChange = e => {
    if (this.state.wishes.length >= 5) return;
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val, error: false });
  };

  handleKeyPress = async e => {
    if (this.state.wishes.length >= 5) return;
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    if (e.key === 'Enter' && val && this.state.wishes.length < 5) {
      this.setState(
        {
          [name]: '',
          wishes: [...this.state.wishes, val]
        },
        () => {
          this.putWish();
        }
      );
    }
  };

  async putWish() {
    try {
      await axios.post(
        `${DEV ? 'http://localhost:8004/' : ''}api/node/wish`,
        this.createWish()
      );
    } catch (e) {
      console.error(e);
      this.setState({ error: true });
    }
  }

  deleteWish(idx) {
    const wishes = this.state.wishes.filter((wish, index) => idx !== index);
    this.setState({ wishes }, () => {
      this.putWish();
    });
  }

  // Formats the wish into compatible format
  createWish() {
    return {
      time_stamp: Date.now(),
      user_id: this.props.wisher.user_id,
      name: this.props.wisher.name,
      wishlist: this.state.wishes
    };
  }

  render() {
    return (
      <div className="field">
        <div className="control">
          <input
            className="input is-primary"
            name="name"
            type="text"
            placeholder="Enter your wish item"
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            value={this.state.name}
          />
          {this.state.wishes.length >= 5 && (
            <span className="tag is-danger">
              {this.props.wisher.name} is being greedy!
            </span>
          )}
          <ul className="wishlist">
            {this.state.wishes.length > 0 &&
              this.state.wishes.map((item, idx) => {
                return (
                  <li className="wish" key={item + idx}>
                    {item.length > 25 ? item.slice(0, 25) + '...' : item}{' '}
                    <button
                      className="delete is-medium"
                      onClick={() => this.deleteWish(idx)}
                    />
                  </li>
                );
              })}
          </ul>
        </div>
        <style jsx>
          {`
            .delete:hover {
              background: rgb(229, 26, 102)
              transition: 0.25s;
            }
            .tag {
              margin-top: 0.5rem;
            }
            .wish {
              margin-top: 0.25rem;
              display: flex;
              justify-content: space-between;
            }
          `}
        </style>
      </div>
    );
  }
}

export default Wish;
