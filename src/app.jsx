import React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import IconButton from 'material-ui/IconButton';
import FontPicker from 'font-picker-react';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { FormatBold, FormatItalic, FormatUnderlined, FormatAlignLeft, FormatAlignCenter, FormatAlignRight, FormatListBulleted, FormatListNumbered, FormatSize, FormatColorText } from 'material-ui-icons';

const COLORARR = [
    { label: 'Red', style: 'red' },
    { label: 'Orange', style: 'orange' },
    { label: 'Yellow', style: 'yellow' },
    { label: 'Green', style: 'green' },
    { label: 'Blue', style: 'blue' },
    { label: 'Indigo', style: 'indigo' },
    { label: 'Violet', style: 'violet' },
];

// const ColorControls = (props) => {
//   let currentStyle = props.editorState.getCurrentInlineStyle();
//   let index = 0;
//   return (
//     <div style={styles.controls}>
//       <Menu>
//         { COLORARR.map(type =>
//           <StyleButton
//             active={currentStyle.has(type.style)}
//             label={type.label}
//             onToggle={props.onToggle}
//             style={type.style}
//             key={++index}
//           />
//           )}
//       </Menu>
//     </div>
//   );
// };

const styleMap = {
  STRIKETHROUGH: {
    textDecoration: 'line-through',
  },
  right: {
    'text-align': 'right',
  },
  left: {
    'text-align': 'left',
  },
  center: {
    'text-align': 'center',
  },
  RED: {
    color: 'red',
  },
  BLACK: {
    color: 'black',
  },
  GREEN: {
    color: 'green',
  },
  BLUE: {
    color: 'blue',
  },
  PURPLE: {
    color: 'purple',
  },
  SIZE10: {
    fontSize: 10,
  },
  SIZE12: {
    fontSize: 12,
  },
  SIZE16: {
    fontSize: 16,
  },
  SIZE20: {
    fontSize: 20,
  },
  SIZE24: {
    fontSize: 24,
  },
  SIZE36: {
    fontSize: 36,
  },
  SIZE72: {
    fontSize: 72,
  },
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = editorState => this.setState({ editorState });
    this.state = {
      showMenu: false,
      editorState: EditorState.createEmpty(),
      align: 'right',
      activeFont: 'Open Sans',
      anchorEl: null,
      showColor: false,
      showSize: false,
      open: false,
    };
  }

  onFontClick(e, fontSize) {
    e.preventDefault();
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, fontSize));
    this.handleRequestClose();
  }

  getBlockStyle() {
    switch (this.getType()) {
      case 'left':
        return 'left';
      case 'center':
        return 'center';
      case 'right':
        return 'right';
      default:
        return null;
    }
  }

  showMenu(event) {
    event.preventDefault();
    this.setState({
      showMenu: !this.state.showMenu,
    });
  }

  toggleInlineStyle(e, style) {
    e.preventDefault();
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, style));
  }

  toggleBlockStyle(e, style) {
    e.preventDefault();
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, style));
  }

  textAlignment(e, style) {
    e.preventDefault();
    console.log('align');
    this.setState({
      align: style,
    });
  }

  handleRequestClose() {
    this.setState({ showSize: false });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div style={{ width: '100%', height: 550, border: '1px solid black', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <h3 style={{ border: '1px solid blue' }}>Document Title</h3>
          <IconButton onClick={e => this.toggleInlineStyle(e, 'BOLD')}> <FormatBold /></IconButton>
          <IconButton onClick={e => this.toggleInlineStyle(e, 'ITALIC')}> <FormatItalic /> </IconButton>
          <IconButton onClick={e => this.toggleInlineStyle(e, 'UNDERLINE')}> <FormatUnderlined /> </IconButton>
          <IconButton onClick={e => this.toggleBlockStyle(e, 'unordered-list-item')}> <FormatListBulleted /> </IconButton>
          <IconButton onClick={e => this.toggleBlockStyle(e, 'ordered-list-item')}> <FormatListNumbered /> </IconButton>
          <IconButton onClick={e => this.toggleBlockStyle(e, 'left')}> <FormatAlignLeft /> </IconButton>
          <IconButton onClick={e => this.toggleBlockStyle(e, 'center')}> <FormatAlignCenter /> </IconButton>
          <IconButton onClick={e => this.toggleBlockStyle(e, 'right')}> <FormatAlignRight /> </IconButton>
          <IconButton onClick={e => this.setState({
            anchorEl: e.currentTarget,
            showSize: true,
          })}
          > <FormatSize /> </IconButton>
          <Popover
            open={this.state.showSize}
            anchorEl={this.state.anchorEl}
            onClose={() => this.setState({ anchorEl: null })}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            targetOrigin={{ horizontal: 'left', vertical: 'top' }}
            onRequestClose={() => this.setState({
              showSize: false,
            })}
          >
            <Menu>
              <MenuItem onClick={e => this.onFontClick(e, 'SIZE10')}>10</MenuItem>
              <MenuItem onClick={e => this.onFontClick(e, 'SIZE12')}>12</MenuItem>
              <MenuItem onClick={e => this.onFontClick(e, 'SIZE16')}>16</MenuItem>
              <MenuItem onClick={e => this.onFontClick(e, 'SIZE20')}>20</MenuItem>
              <MenuItem onClick={e => this.onFontClick(e, 'SIZE24')}>24</MenuItem>
              <MenuItem onClick={e => this.onFontClick(e, 'SIZE36')}>36</MenuItem>
              <MenuItem onClick={e => this.onFontClick(e, 'SIZE72')}>72</MenuItem>
            </Menu>
          </Popover>

          {/* <IconButton onClick={e => this.setState({
            anchorEl: e.currentTarget,
            showColor: true
          })}
          > <FormatColorText /> </IconButton>
          <Popover
            open={this.state.showColor}
            anchorEl={this.state.anchorEl}
            onClose={() => this.setState({ anchorEl: null })}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            targetOrigin={{ horizontal: 'left', vertical: 'top' }}
            onRequestClose={() => this.setState({
              showColor: false,
            })}
            >
              <ColorControls
                editorState={editorState}
                onToggle={this.toggleColor}
              />
            </Popover> */}

          <button onClick={e => this.showMenu(e)}>
            Font Color
          </button>
          {this.state.showMenu ? (
            <div className="menu">
              <button onMouseDown={e => this.toggleInlineStyle(e, 'RED')}> Red </button>
              <button onMouseDown={e => this.toggleInlineStyle(e, 'GREEN')}> Green </button>
              <button onMouseDown={e => this.toggleInlineStyle(e, 'BLUE')}> Blue </button>
              <button onMouseDown={e => this.toggleInlineStyle(e, 'BLACK')}> Black </button>
              <button onMouseDown={e => this.toggleInlineStyle(e, 'PURPLE')}> Purple </button>
            </div>) : (null)}
          <button onMouseDown={e => this.toggleInlineStyle(e, 'STRIKETHROUGH')}>STRIKETHROUGH</button>
          <div style={{ width: '90%', height: '70%', border: '1px solid red' }}>
            <Editor
              customStyleMap={styleMap}
              editorState={this.state.editorState}
              onChange={this.onChange}
              blockStyleFn={() => this.getBlockStyle}
            />
          </div>
        </div>
      </MuiThemeProvider>);
  }
}
