import React, { Component } from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { API_BASE_URL } from '../config';
import { connect } from 'react-redux';
import { fetchTasks } from '../actions/taskAction';

class AddTaskForm extends Component
