import React, { Component } from 'react'
import { connect } from 'react-redux';

class HistoryComponent extends Component {
  render() {
    return (
      <div>
        <h1>Hello from HistoryComponent</h1>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryComponent);


