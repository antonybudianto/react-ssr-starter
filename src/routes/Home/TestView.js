import React, { Component } from 'react'

class TestView extends Component {
  state = {
    count: 0
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        count: this.state.count + 1
      })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    return <div>Count: {this.state.count}</div>
  }
}

export default TestView
