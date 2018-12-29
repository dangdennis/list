import { Container } from 'unstated';
import apiRoutes from '../apiRoutes';

const wishes = {
  Items: [
    {
      time_stamp: { N: '1545732178701' },
      user_id: { S: 'd5ea072a-940c-4482-9a8b-d7ba9786bc02' },
      name: { S: 'Fake user 1' },
      wishlist: { L: [{ S: 'fa' }] }
    },
    {
      time_stamp: { N: '1545732177207' },
      user_id: { S: 'e83b47a3-76a0-4ba5-af84-ba57b29f4772' },
      name: { S: 'Fake user 2' },
      wishlist: { L: [{ S: 'lots of extra wishes' }] }
    },
    {
      time_stamp: { N: '1545732177734' },
      user_id: { S: '2c0fbcb9-671c-4bad-8516-89b87f4a5a12' },
      name: { S: 'Fake user 3' },
      wishlist: { L: [{ S: 'fasd' }] }
    },
    
  ],
  Count: 9,
  ScannedCount: 9
};

class WishContainer extends Container {
  state = {
    name: '',
    wishers: [...wishes.Items],
  };

  componentDidMount() {
    this.fetchAllWishes();
  }

  componentShouldUpdate() {
    if (this.state.wishers.length) return false;
  }

  _createWisher(name) {
    return {
      time_stamp: { N: Date.now() },
      user_id: { S: '' },
      name: { S: name },
      wishlist: { L: [] }
    };
  }

  async fetchAllWishes() {
    const res = await fetch(apiRoutes.node.getAllWishes).then(res => res.json());
    console.log('all wishes:', res);
    this.setState({
      wishers: [...res.Items]
    });
  }

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  handleKeyPress = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    if (e.key === 'Enter' && val) {
      this.setState({ [name]: '', wishers: [...this.state.wishers, this._createWisher(val)] });
    }
  };

  handleWishClick = e => {
    if (!this.state.name) {
      return;
    }
    const val = this.state.name;
    this.setState({ name: '', wishers: [...this.state.wishers, this._createWisher(val)] });
  };
}

export default WishContainer;
