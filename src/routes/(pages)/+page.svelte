<h1>
	<span
		style="background: linear-gradient(
			90deg,
			hsl(228deg 69% 55%) 0%,
			hsl(250deg 60% 58%) 8%,
			hsl(268deg 55% 54%) 17%,
			hsl(285deg 50% 50%) 25%,
			hsl(300deg 56% 45%) 33%,
			hsl(312deg 68% 45%) 42%,
			hsl(319deg 83% 44%) 50%,
			hsl(323deg 100% 42%) 58%,
			hsl(329deg 100% 44%) 67%,
			hsl(334deg 100% 44%) 75%,
			hsl(341deg 89% 47%) 83%,
			hsl(350deg 78% 51%) 92%,
			hsl(0deg 74% 54%) 100%
		); background-clip: text; -webkit-background-clip: text; color: transparent; -webkit-text-fill-color: transparent"
		>Trinity</span
	>
</h1>

<p style="border-left: 3px solid currentColor; padding: 0.3rem 1.5rem; font-weight: bold">
	Make a game with <em>only</em> HTML + CSS + JS (no libraries!), earn prizes like mechanical keyboards,
	software subscriptions, and domains!
</p>

<p>Examples include:</p>

<ul>
	<li>
		<a href="https://0hh1.com/">0h h1</a> (<a href="https://github.com/florisluiten/0hh1">GitHub</a
		>): One of my favorite logic games! Fill in a board of red and blue tiles based on simple rules.
	</li>
	<li>
		<a href="https://jollyy.dev/2048/">2048</a> (<a href="https://github.com/kubowania/2048"
			>GitHub</a
		>): The famous sliding blocks game where you merge numbers and reach high scores.
	</li>
	<li>
		<a href="https://jollyy.dev/pac-man/">Pac-Man</a> (<a
			href="https://github.com/kubowania/pac-man">GitHub</a
		>): The classic arcade game. This is a really basic version, but you can improve on it!
	</li>
</ul>

<h2>How it works</h2>

<p>
	This is a <a href="https://hackclub.com">Hack Club</a> YSWS for high school-aged students. Here's how
	you participate:
</p>

<div class="step">
	<span class="step-number">1</span>
	<p class="step-text">
		Build a game with the three most basic web technologies: HTML, CSS, and JavaScript. Make sure
		you track your time with <a href="https://hackatime.hackclub.com">Hackatime</a>.
	</p>
</div>

<div class="step">
	<span class="step-number">2</span>
	<p class="step-text">
		Submit your game for review. Make sure you open source your code on e.g. GitHub and deploy your
		games on platforms like GitHub Pages.
	</p>
</div>

<div class="step">
	<span class="step-number">3</span>
	<p class="step-text">
		Receive green tokens for hours spent, red tokens for technicality (advanced algorithms, etc.),
		and blue tokens for creativity (novel ideas, etc.).
	</p>
</div>

<div class="step">
	<span class="step-number">4</span>
	<p class="step-text">
		Spend your tokens in the shop for prizes, ranging from stickers and domains to mechanical
		keyboards and Canva Pro subscriptions!
	</p>
</div>

<h2>FAQ</h2>

<h3>Q: How does the token thing work?</h3>

<p>
	A: When you ship your game, for each hour you work, you'll get 1 green token, 1-1.5 red tokens,
	and 1-1.5 blue tokens. The red and blue token amounts are determined by our reviewers based on how
	technical and creative your game is, respectively. Then, you can redeem these tokens for prizes in
	the shop!
</p>

<h3>Q: Wait I'm still a bit confused...</h3>

<p>
	Let's go through an example! Suppose you spend 3 hours working on a really cool and creative game
	with relatively simple technology. Your reviewer decides to give you a 1.1x technicality
	multiplier and a 1.4x creativity multiplier. This means you'll get 3 green tokens + 3.3 red tokens
	+ 4.2 blue tokens from your game, which you can then spend in the shop to buy prizes!
</p>

<h3>Q: What are the project requirements?</h3>

<p>Your project must:</p>

<ul>
	<li>Be a game by a broad definition of the word (anything that's fun to play with counts!)</li>
	<li>Have at least 3-5 minutes of playtime</li>
	<li>Not use any libraries / frameworks (see below)</li>
	<li>Be open sourced on GitHub</li>
	<li>Be deployed on GitHub Pages or itch.io</li>
</ul>

<h3>Q: What does "no libraries" mean?</h3>

<p>
	A: This means you can't use any code that others wrote. For example, you can't use <a
		href="https://jquery.com/">jQuery</a
	>, <a href="https://svelte.dev/">Svelte</a>, or <a href="https://threejs.org/">Three.js</a>. This
	is so you can get a better understanding of how these things work under the hood.
</p>

<p>
	If you wonder what counts / doesn't count as a "library", feel free to ask us on Slack in
	#trinity-ysws!
</p>

<h3>Q: How many hours do I need to spend on a project?</h3>

<p>
	A: There is no minimum hour requirement! However, to earn a high technicality and creativity
	multiplier, you may want to work for at least 2-3 hours to showcase your skills.
</p>

<h3>Q: Can I submit multiple projects?</h3>

<p>A: Yes!</p>

<style>
	.step {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.75em;
		margin-block-end: 1em;
	}

	.step-number {
		flex: 0 0 auto;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		font-size: 20px;
		font-family: Audiowide, sans-serif;
		background-color: #1a1a1a;
		color: #fafaf8;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.step-text {
		margin: 0;
	}
</style>
