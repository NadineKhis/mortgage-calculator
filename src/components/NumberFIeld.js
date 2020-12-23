// import React from "react";
// import PropTypes from "prop-types";
//
// class NumberField extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { isEditing: false };
//   }
//
//   onChange(event) {
//     this.props.onChange(event.target.value);
//   }
//
//   toCurrency(number) {
//     const formatter = new Intl.NumberFormat("sv-SE", {
//       style: "decimal",
//       currency: "SEK"
//     });
//
//     return formatter.format(number);
//   }
//
//   toggleEditing() {
//     this.setState({ isEditing: !this.state.isEditing });
//   }
//    onPostChange  () {
//     let text = newPostElement.current.value;
//     // props.dispatch({type: 'UPDATE-NEW-POST-TEXT', newText: text});
//     let action = updateNewPostTextActionCreator(text);
//     props.dispatch(action);
//   }
//
//   render() {
//     return (
//       <div>
//         <label htmlFor={this.props.name}>Income</label>
//         {this.state.isEditing ? (
//           <input
//             type="number"
//             name={this.props.name}
//             value={this.props.value}
//             onChange={this.onPostChange}
//             onBlur={this.toggleEditing.bind(this)}
//           />
//         ) : (
//           <input
//             type="text"
//             name={this.props.name}
//             value={this.toCurrency(this.props.value)}
//             onChange={this.onChange.bind(this)}
//             onFocus={this.toggleEditing.bind(this)}
//             readOnly
//           />
//         )}
//       </div>
//     );
//   }
// }
//
// NumberField.propTypes = {
//   name: PropTypes.string,
//   value: PropTypes.string,
//   onChange: PropTypes.func
// };
//
// export default NumberField;