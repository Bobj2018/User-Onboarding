import React from 'react';

function UserList({ users }) {
	return (
		<div>
			{users.map((user) => {
				return (
					<ul key={user.id}>
						<li>{user.name}</li>
					</ul>
				);
			})}
		</div>
	);
}

export default UserList;
