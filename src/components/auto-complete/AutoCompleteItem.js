import React, {Component} from 'react';
import PropTypes from 'prop-types';

class AutoCompleteItem extends Component {

  constructor() {
    super();
    this.state = { value: '' }
  }
  
  componentDidMount() {
    this.hightLightMatchText(this.props.matchText);
  }

  componentWillUpdate(nextProps) {
    if (nextProps.matchText !== this.props.matchText) {
      this.hightLightMatchText(nextProps.matchText);
    }
  }

  hightLightMatchText = (matchText) => {
    let matchStart = this.props.data.toLowerCase().indexOf(matchText.toLowerCase());
    let matchEnd = matchStart + matchText.length - 1;

    let beforeMatch = this.props.data.slice(0, matchStart);
    let matchStr = this.props.data.slice(matchStart, matchEnd + 1);
    let afterMatch = this.props.data.slice(matchEnd + 1);

    this.setState({
      value: beforeMatch + "<em>" + matchStr + "</em>" + afterMatch
    });
  }

  render() {
    return (
      <li className={this.props.selected ? 'suggestion-item selected' : 'suggestion-item'}>
        <div className="suggestion-item-wrapper" 
          dangerouslySetInnerHTML = {{__html: this.state.value}}>
        </div>
      </li>
    );
  }
}

AutoCompleteItem.propTypes = {
  data: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,  
  matchText: PropTypes.string
};

export default AutoCompleteItem;
