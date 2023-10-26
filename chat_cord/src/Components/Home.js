import React from 'react';

const Home = () => {
  return (
    <div class="join-container">
			<header class="join-header">
				<h1><i class="fas fa-smile"></i> ChatCord</h1>
			</header>
			<main class="join-main">
				<form>
					<div class="form-control">
						<label for="username">Username</label>
						<input
							type="text"
							name="username"
							id="username"
							placeholder="Enter username..."
							required
						/>
					</div>
					<div class="form-control">
						<label for="room">Room</label>
						<select name="room" id="room">
							<option value="JavaScript">JavaScript</option>
							<option value="Python">Python</option>
							<option value="PHP">PHP</option>
							<option value="C#">C#</option>
							<option value="Ruby">Ruby</option>
							<option value="Java">Java</option>
						</select>
					</div>
					<button type="submit" class="btn">Join Chat</button>
				</form>
			</main>
		</div>
  )
}

export default Home
