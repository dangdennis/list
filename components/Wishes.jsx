import React, { Component } from 'react';
import { Subscribe } from 'unstated';
import WishListContainer from '../container/WishListContainer';
import Wish from './Wish';

export default class Wishes extends Component {
  render() {
    return (
      <div>
        <Subscribe to={[WishListContainer]}>
          {({ state: { wishers } }) => {
            return (
              <div className="grid">
                {wishers.length > 0 &&
                  wishers.map((wisher, idx) => {
                    return (
                      <div key={wisher.user_id.S + idx} className="grid-item">
                        <h4 className="title is-4">{wisher.name.S}</h4>
                        <Wish name={wisher.name.S} />
                      </div>
                    );
                  })}
              </div>
            );
          }}
        </Subscribe>
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
