import React, { Component } from 'react';
import Wish from './Wish';

export default class Wishes extends Component {
  render() {
    return (
      <div className="grid">
        {this.props.wishers.length > 0 &&
          this.props.wishers.map((wisher, idx) => {
            let name = wisher.name;
            if (name.length > 15) {
              name = name.slice(0, 15) + '...';
            }
            return (
              <div key={wisher.user_id + idx} className="grid-item">
                <h4 className="title is-4">
                  {name}{' '}
                  <button
                    className="delete is-medium"
                    onClick={() => this.props.deleteWisher(wisher.user_id)}
                  />
                </h4>
                <Wish wisher={wisher} />
              </div>
            );
          })}
        <style jsx>{`
          .grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            grid-gap: 20px;
            justify-items: center;
            align-items: start;
          }

          .title {
            display: flex;
            justify-content: space-between;
          }

          .delete:hover {
              background: rgb(229, 26, 102)
              transition: 0.25s;
            }
        `}</style>
      </div>
    );
  }
}
