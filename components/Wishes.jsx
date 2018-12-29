import React, { Component } from 'react';
import Wish from './Wish';

export default class Wishes extends Component {
  render() {
    return (
      <div className="grid">
        {this.props.wishers.length > 0 &&
          this.props.wishers.map((wisher, idx) => {
            let name = wisher.name.S;
            if (name.length > 15) {
              name = name.slice(0, 15) + "..."
            }
            return (
              <div key={wisher.user_id.S + idx} className="grid-item">
                <h4 className="title is-4">{name}</h4>
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
        `}</style>
      </div>
    );
  }
}
