// import { connect } from 'react-redux';
// import PermanentDrawer from '../components/PermanentDrawer/PermanentDrawer';
// import {incrementCounter} from '../actions/index'

// interface Props {
//   children: {onClick: any}
// }

// const mapDispatchToProps = (dispatch, ownProps) =>  ({ 

//   // console.log("TACOS");
//   onClicked: () => dispatch(incrementCounter(1))
//   // onClicked: () => dispatch(incrementCounter(1))
// })
​
//annotate a function
// export default connect<Props>(
//   null,
//   mapDispatchToProps
// )(PermanentDrawer)

// export function mergeProps(stateProps: Object, dispatchProps: Object, ownProps: Object) {
//   return {...ownProps, ...stateProps, ...dispatchProps};
// }

// export default connect(
//   null,
//   mapDispatchToProps,
//   mergeProps)(PermanentDrawer);