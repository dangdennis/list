import React from 'react';

import Navbar from '../components/Navbar';
import TextInput from '../components/TextInput';
import Wishes from '../components/Wishes';

import Counter from '../components/Counter';

export default class IndexPage extends React.Component {
  state = {
    name: '',
    wishes: []
  };

  render() {
    return (
      <main className="main">
        <div className="main-content">
          <Navbar />
          <h1 className="title is-2" style={{ textAlign: 'center' }}>
            Hopeful wishing
          </h1>
          {/* <Counter /> */}
          <div className="main-input">
            <TextInput />
          </div>
          <Wishes />
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
