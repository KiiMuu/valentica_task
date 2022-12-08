let form = document.forms.RegForm;

const isUsernameValid = username => {
	return (
		username.length > 5 &&
		username.length <= 15 &&
		/^[a-zA-Z](?!.*[0-9_]$).+/g.test(username)
	);
};

const isEmailValid = email => {
	return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(
		email
	);
};

const isPasswordValid = password => {
	return password.length >= 8;
};

const isPasswordMatch = (password, confirmPassword) => {
	return !!confirmPassword && password === confirmPassword;
};

const onRegister = async e => {
	e.preventDefault();

	let username = document.forms.RegForm.username.value;
	let email = document.forms.RegForm.email.value;
	let password = document.forms.RegForm.password.value;
	let confirmPassword = document.forms.RegForm.confirm_password.value;
	let message = document.getElementsByClassName('error_message');
	let apiMessage = document.getElementsByClassName('api_error_message');

	// validations
	if (!isUsernameValid(username)) {
		message[0].innerHTML = 'Invalid username.';
		return false;
	} else if (!isEmailValid(email)) {
		message[1].innerHTML = 'Invalid email address.';
		return false;
	} else if (!isPasswordValid(password)) {
		message[2].innerHTML = 'Password must be at least 8 characters long.';
		return false;
	} else if (!isPasswordMatch(password, confirmPassword)) {
		message[3].innerHTML = 'Passwords do not match.';
		return false;
	}

	await fetch('https://goldblv.com/api/hiring/tasks/register', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ username, email, password, confirmPassword }),
	})
		.then(res => res.json())
		.then(data => {
			console.log(data);
			if (data.response) {
				console.log(data.response);
				localStorage.setItem('valinteca_user', data.response);
			} else {
				console.log('ERR', data.error);
				apiMessage.innerHTML = data.error;
			}
		})
		.catch(err => {
			apiMessage.innerHTML = err;
			console.error('ERROR', err);
		});
};

form.addEventListener('submit', onRegister);
