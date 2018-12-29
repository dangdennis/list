import React from 'react';
import Navbar from '../components/Navbar';
import TextInput from '../components/TextInput';
import Wishes from '../components/Wishes';
import 'isomorphic-fetch';
import axios from 'axios';

import Counter from '../components/Counter';

export default class IndexPage extends React.Component {
  static async getInitialProps({ req }) {
    try {
      const res = await axios.get('http://localhost:8004/api/node/wishes');
      console.log(res);
      if (res.data) {
        return {
          wishers: [...res.data.Items]
        };
      }
    } catch (e) {
      return { error: e };
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      error: false,
      name: '',
      wishers: props.wishers || [],
      loading: false
    };
  }

  async fetchAllWishes() {
    console.log('fetching all wishes');
    const res = await fetch('api/node/wishes').then(res => res.json());
    console.log('all wishes:', res);
    this.setState({ wishers: [...res.Items] });
  }

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val, error: false });
  };

  handleKeyPress = e => {
    const { type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    if (e.key === 'Enter' && val) {
      this._createNewWisher(val);
    }
  };

  handleWishClick = e => {
    if (!this.state.name) {
      return;
    }
    const val = this.state.name;
    this._createNewWisher(val);
  };

  _createWisher(name) {
    return {
      time_stamp: { N: Date.now() },
      user_id: { S: '' },
      name: { S: name },
      wishlist: { L: [] }
    };
  }

  async _createNewWisher(name) {
    this.setState({ loading: true, error: false });
    try {
      const res = await axios.post('http://localhost:8004/api/node/wish', {
        name,
        wishes: []
      });
      console.log('post success', res);
      this.setState({
        loading: false,
        name: '',
        wishers: [...this.state.wishers, this._createWisher(name)]
      });
    } catch (e) {
      console.error('post fail', e);
      this.setState({
        loading: false,
        name: '',
        error: true
      });
    }
  }

  render() {
    console.log('index props', this.props);
    return (
      <main className="main">
        <div className="main-content">
          <Navbar />
          <h1 className="title is-2" style={{ textAlign: 'center' }}>
            Hopeful wishing
          </h1>
          <div className="main-input">
            <TextInput
              handleChange={e => this.handleChange(e)}
              handleWishClick={e => this.handleWishClick(e)}
              handleKeyPress={e => this.handleKeyPress(e)}
              text={this.state.name}
              loading={this.state.loading}
            />
          </div>
          {this.state.error && (
            <div className="notification is-danger">
              <button
                className="delete"
                onClick={() => this.setState({ error: false })}
              />
              Something went wrong!
            </div>
          )}
          {this.state.wishers && <Wishes wishers={this.state.wishers} />}
        </div>
        <style jsx>{`
          .main {
            max-width: 800px;
            margin: 0 auto;
            padding: 24px;
          }

          .main-input {
            max-width: 500px;
            margin: 0 auto;
            margin-bottom: 24px;
          }

          .main-content {
            margin: 0 auto;
          }
        `}</style>
      </main>
    );
  }
}
