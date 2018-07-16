import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import validator from 'validator'

import { toggleLogin } from '../../reducers/user'
import './HomeView.scss'
// import TestView from './TestView'

const initialValue = {
  email: '',
  password: ''
}

const ErrorInput = ({ errors, touched, field }) =>
  (errors[field] &&
    touched[field] && (
      <small
        style={{
          color: 'orangered'
        }}
      >
        {errors[field]}
      </small>
    )) ||
  null

class HomeView extends Component {
  static propTypes = {
    user: PropTypes.object,
    toggleLogin: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      ready: false
    }
    this.handleValidation = this.handleValidation.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.renderForm = this.renderForm.bind(this)
  }

  handleValidation(values) {
    const errors = {}

    const { email, password } = values

    if (email === '') {
      errors.email = 'Email harus diisi'
    } else if (!validator.isEmail(email)) {
      errors.email = 'Email tidak valid'
    }

    if (password === '') {
      errors.password = 'Password harus diisi'
    }

    return errors
  }

  handleSubmit(form) {
    console.log(form)
    this.setState({
      ready: true
    })
  }

  renderForm(props) {
    const { handleSubmit, handleChange, handleBlur, errors, touched } = props

    return (
      <form onSubmit={handleSubmit} noValidate>
        <div className="my1">
          <label className="pr1">Email</label>
          <input
            name="email"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <ErrorInput errors={errors} touched={touched} field="email" />
        </div>
        <div className="my1">
          <label className="pr1">Password</label>
          <input
            name="password"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <ErrorInput errors={errors} touched={touched} field="password" />
        </div>
        <div>
          <button className="p1" type="submit">
            Submit
          </button>
        </div>
        <div>{this.state.ready && 'Success'}</div>
      </form>
    )
  }

  render() {
    return (
      <div className="home-view">
        <Formik
          initialValues={initialValue}
          validate={this.handleValidation}
          onSubmit={this.handleSubmit}
          render={this.renderForm}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = {
  toggleLogin
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeView)
