import { Container } from 'unstated';
import apiRoutes from '../apiRoutes';

class WishContainer extends Container {
  state = {
    name: '',
    wishers: [],
    startTime: 0,
    endTime: 0,
    currentCount: 0
  };

  componentDidMount() {
    this.fetchAllWishes();
  }

  componentShouldUpdate() {
    if (this.state.wishers.length) return false;
  }

  async fetchAllWishes() {
    const res = await fetch(apiRoutes.node.getAll).then(res => res.json());
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
      this.setState({ [name]: '', wishers: [...this.state.wishers, val] });
    }
  };

  handleWishClick = e => {
    if (!this.state.name) {
      return;
    }
    const val = this.state.name;
    this.setState({ name: '', wishers: [...this.state.wishers, val] });
  };
}

export default WishContainer;
