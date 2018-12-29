import React from 'react';
import axios from 'axios';

class Wish extends React.Component {
  state = {
    editing: false,
    items: [],
    name: ''
  };

  handleChange = e => {
    if (this.state.items.length >= 5) {
      return;
    }
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  handleKeyPress = async e => {
    if (this.state.items.length >= 5) {
      return;
    }
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    if (e.key === 'Enter' && val && this.state.items.length < 5) {
      this.addWish(val);
      this.setState({ [name]: '', items: [...this.state.items, val] });
    }
  };

  async addWish(text = '') {
    // const res = await axios.post('/api/wish/putWish', {
    //   wishes: [text],
    //   name: this.props.name
    // });
    // console.log(res);
    // console.log('wish added successfully');
  }

  render() {
    return (
      <div className="field" {...this.props}>
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
          {this.state.items.length >= 5 && (
            <span className="tag is-danger">
              {this.props.person} is being greedy!
            </span>
          )}
          <ul>
            {this.state.items.length > 0 &&
              this.state.items.map((item, idx) => {
                return <li key={item + idx}>{item}</li>;
              })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Wish;
