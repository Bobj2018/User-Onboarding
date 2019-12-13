import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function UserForm({ values, errors, touched, status, setUsers, users }) {
	console.log('values', values);
	console.log('errors', errors);
	console.log('touched', touched);

	useEffect(
		() => {
			status && setUsers([ ...users, status ]);
		},
		[ status ]
	);

	return (
		<div className="user-form">
			<Form>
				<label htmlFor="name">
					Name
					<Field id="name" type="text" name="name" placeholder="Name" />
					{touched.name && errors.name && <p className="errors">{errors.name}</p>}
				</label>
				<label htmlFor="email">
					Email
					<Field id="email" type="email" name="email" placeholder="Email" />
					{touched.email && errors.email && <p className="errors">{errors.email}</p>}
				</label>
				<label htmlFor="password">
					Password
					<Field id="password" type="password" name="password" placeholder="Password" />
					{touched.password && errors.password && <p className="errors">{errors.password}</p>}
				</label>
				<label htmlFor="terms">
					<Field id="terms" type="checkbox" name="terms" required />
					Accept Terms of Service
				</label>
				<button type="submit">Submit</button>
			</Form>
		</div>
	);
}

const FormikUserForm = withFormik({
	mapPropsToValues(props) {
		return {
			name: props.name || '',
			email: props.email || '',
			password: props.password || '',
			terms: props.terms || false
		};
	},
	validationSchema: Yup.object().shape({
		name: Yup.string().required(),
		email: Yup.string().required(),
		password: Yup.string().required()
	}),
	handleSubmit(values, { setStatus, resetForm }) {
		console.log('values', values);
		axios
			.post('https://reqres.in/api/users', values)
			.then((res) => {
				console.log('success', res);
				setStatus(res.data);
				resetForm();
			})
			.catch((err) => console.log('error', err));
	}
})(UserForm);

export default FormikUserForm;
