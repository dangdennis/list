import React from 'react';
import Navbar from '../components/Navbar';
import TextInput from '../components/TextInput';
import Wishes from '../components/Wishes';
import 'isomorphic-fetch';
import axios from 'axios';

import Counter from '../components/Counter';

// Getting some weird circular JSON when fetching api/node/wishes
// Using this as a workaround for axios
// https://github.com/axios/axios/issues/836
const handle_axios_error = function(err) {
  if (err.response) {
    const custom_error = new Error(
      err.response.statusText || 'Internal server error'
    );
    custom_error.status = err.response.status || 500;
    custom_error.description = err.response.data
      ? err.response.data.message
      : null;
    throw custom_error;
  }
  throw new Error(err);
};
axios.interceptors.response.use(r => r, handle_axios_error);

export default class IndexPage extends React.Component {
  static async getInitialProps({ req }) {
    try {
      const res = await axios.get('/api/node/wishes');
      if (res.data && res.data.Items) {
        return {
          wishers: [...res.data.Items]
        };
      }
      return {};
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
      const res = await axios.post('/api/node/wish', {
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
              Sorry, something went wrong! Please try again later.
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
