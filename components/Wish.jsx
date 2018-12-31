import React from 'react';
import axios from 'axios';

class Wish extends React.Component {
  static defaultProps = {
    wisher: {
      wishlist: {
        L: []
      }
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      wishes: [...this.props.wisher.wishlist.L],
      name: ''
    };
  }

  handleChange = e => {
    if (this.state.wishes.length >= 5) {
      return;
    }
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val, error: false });
  };

  handleKeyPress = async e => {
    if (this.state.wishes.length >= 5) {
      return;
    }
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    if (e.key === 'Enter' && val && this.state.wishes.length < 5) {
      this.addWish(val);
      this.setState({
        [name]: '',
        wishes: [...this.state.wishes, this._createWish(val)]
      });
    }
  };

  async addWish(wish = '') {
    try {
      console.log('adding wish', wish);
      // const res = await axios.post('/api/wish/putWish', {
      //   wishes: [...this.state.wishes, this._createWish(wish)],
      //   name: this.props.name
      // });
      // console.log(res);
      console.log('wish added successfully');
    } catch (e) {
      console.error(e);
      this.setState({ error: true });
    }
  }

  _createWish(wish) {
    return {
      S: wish
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
              {this.props.wisher.name.S} is being greedy!
            </span>
          )}
          <ul>
            {this.state.wishes.length > 0 &&
              this.state.wishes.map((item, idx) => {
                return <li key={item + idx}>{item}</li>;
              })}
          </ul>
        </div>
        <style jsx>
          {`
            .tag {
              margin-top: 0.5rem;
            }
          `}
        </style>
      </div>
    );
  }
}

export default Wish;
