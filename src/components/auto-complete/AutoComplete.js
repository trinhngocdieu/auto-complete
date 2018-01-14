import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Config from './config';
import Constant from './constant';

import AutoCompleteItem from './AutoCompleteItem';
import './AutoComplete.css';

class AutoComplete extends Component {

  constructor() {
    super();

    this.state = {
      shouldShowSuggestion: false,
      suggestions: [],
      selectedIndex: -1
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.onDocumentClick);
  }

  componentWillUnMount() {
    document.removeEventListener('click', this.onDocumentClick);
  }

  onDocumentClick = (e) => {
    if (e.target !== this._inputBox 
      && this.suggestionContainer 
      && !this.suggestionContainer.contains(e.target)) {
      this.hideSuggestion();
    }
  };

  showSuggestion = () => {
    this.setState({
      shouldShowSuggestion: true
    })
  }

  hideSuggestion = () => {
    this.setState({
      shouldShowSuggestion: false,
      selectedIndex: -1,
      suggestions: []      
    });
  }

  onChangeValue = () => {
    if (this._inputBox.value) {
      this.caculateSuggestion(this._inputBox.value.toLowerCase());
    } else {
      this.hideSuggestion();
    }
  }

  caculateSuggestion = (inputText) => {    
    if (this.props.data.length === 0) {
      return [];
    }
    let matchedItems = this.props.data.filter(itemValue => {
      return itemValue.toLowerCase().indexOf(inputText) !== -1;
    })

    if (matchedItems.length > 0) {
      this.setState({
        suggestions: matchedItems
      });
      this.showSuggestion();      
    }
  };

  handleKeyboardEvent = (e) => {
    if (this.state.suggestions.length === 0) {
      return;      
    }

    switch (e.keyCode) {
      case Constant.KEYBOARD.DOWN: {
        this.moveNext();
        e.preventDefault();
        break;
      }
      case Constant.KEYBOARD.UP: {
        this.movePrev();
        e.preventDefault();
        break;        
      }
      case Constant.KEYBOARD.ENTER: {
        this.chooseItem();
        this.focusToInput();
        break;
      }
      case Constant.KEYBOARD.ESC: {
        this.hideSuggestion();
        break;
      }
      case Constant.KEYBOARD.TAB: {
        this.chooseItem();
        e.preventDefault();
        break;
      }
      default: {
        break;
      } 
    }
  }

  moveNext = () => {
    if (this.state.selectedIndex === this.state.suggestions.length - 1) { // Last item
      // Move to input
      this.focusToInput();

      // Scroll to top
      this.suggestionContainer.scrollTop = 0;      

    } else {
      // Scroll to next item
      if (this.state.selectedIndex >= Config.MAX_ITEMS - 1) {
        this.suggestionContainer.scrollTop += Config.ITEM_HEIGHT;
      }

      // Move to the next item
      this.setState({
        selectedIndex: this.state.selectedIndex + 1
      });
    }
  };

  movePrev = () => {
    if (this.state.selectedIndex === 0) { // First item 
      // Move to input box
      this.focusToInput();

    } else if (this.state.selectedIndex === -1) { // Input box
      // Move to the last item
      this.setState({
        selectedIndex: this.state.suggestions.length - 1
      });

      // Scroll to end
      this.suggestionContainer.scrollTop = this.suggestionContainer.scrollHeight;
    } else {

      // Scroll to top
      if (this.state.selectedIndex < Config.MAX_ITEMS) {
        this.suggestionContainer.scrollTop = 0;
      }

      // Move to the previous item
      this.setState({
        selectedIndex: this.state.selectedIndex - 1
      });
    }
  };

  focusToInput = () => {
    this._inputBox && this._inputBox.focus();    
    this.setState({
      selectedIndex: -1
    });
  };

  chooseItem = () => {
    if (this.state.selectedIndex === -1) {
      return;
    }
    this._inputBox.value = this.state.suggestions[this.state.selectedIndex];
    this.hideSuggestion();
  };

  render() {
    return (
      <div>

        {/* Input Box */}
        <div>
          <input autoComplete="off" 
            ref={e => this._inputBox = e}
            placeholder={this.props.placeholder || ''}
            style={{width: this.props.width}}
            onChange={this.onChangeValue}
            onKeyDown={this.handleKeyboardEvent}
            />
        </div>

        {/* Suggestion List */}
        { 
          this.state.shouldShowSuggestion && 
          <ul tabIndex="0"
            ref={e => this.suggestionContainer = e} 
            className="suggestion-list" 
            style={{width: this.props.width}}>
          {
            this.state.suggestions.map((value, index) => {
              return (
                <AutoCompleteItem key={value} 
                  data={value} 
                  matchText={this._inputBox.value}
                  selected={this.state.selectedIndex === index} />);
            })
          }
        </ul>
        }
      </div>
    );
  }
}

AutoComplete.defaultProps = {
  width: 400
};

AutoComplete.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  placeholder: PropTypes.string,
  width: PropTypes.number
};

export default AutoComplete;
