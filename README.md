## Getting Started

### Install pnpm package manager

`pnpm` is a package manager built on top of `npm` and is much faster than `npm`, being highly disk efficient and solving inherent issues in `npm`.

Install `pnpm` if you don't already have it:

```
npm install -g pnpm
```

**Optional: set up a shorter alias like pn instead**

For POSIX systems, add the following to your .bashrc, .zshrc, or config.fish:

`alias pn=pnpm`

For Powershell (Windows), go to a Powershell window with admin rights and run:

`notepad $profile.AllUsersAllHosts`

In the profile.ps1 file that opens, put:

`set-alias -name pn -value pnpm`

Now whenever you have to run a `pnpm` cmd, you can type in `pn` (or whatever alias you created) instead.

### Obtain College Scorecard API Key

Go to [College Scorecard API](https://collegescorecard.ed.gov/data/api).

Under the **API Access and Authentication** section request an API key to be sent to a designated email.

Shortly you should receive an email from `noreply@api.data.gov` with the subject `Your API key`. There, you can acquire your API key at last! Hooray!

### Set up repository

Clone the repository and go into the directory:

```
git clone https://github.com/soph-lin/college-major-explorer.git

cd college-major-explorer
```

Install packages:

```
pnpm i
```

Create an `.env` file in the root directory and add your College Scorecard API key:

```
COLLEGE_SCORECARD_KEY=<...>
```

### Run the development server

Run:

```
pnpm dev
```

Open up your browser and go to [http://localhost:3000](http://localhost:3000) to see the website.
