## About

This project uses data from the [**College Scorecard API**](https://collegescorecard.ed.gov/data/api), an official service maintained by the U.S. Department of Education. The API provides comprehensive, up-to-date data on U.S. colleges and universities, including information about academic programs, graduation rates, student debt, and post-graduation earnings. Learn more at [collegescorecard.ed.gov](https://collegescorecard.ed.gov).

## Data

Industry information is obtained from the CIP code's 2-digit prefix (formatted as: `xx.yyyy` where `xx` is the prefix). The mapping from CIP prefix to industry name is located in `lib/constants/cipIndustryMap.ts`, generalized from [01-60 Mappings](https://nces.ed.gov/ipeds/cipcode/browse.aspx?y=55) found on National Center for Education Statistics website.

Median earnings is more specifically that of graduates working and not enrolled 2 years after completing the highest credential. This statistic isn't available for several programs, so a future feature would be to fetch other median earning statistics in place. I haven't yet determined a satisfactory UX for this yet, so this feature is yet to implemented. Median earnings that could be useful:

- Median earnings of graduates working and not enrolled 1 year after completing highest credential
- Median earnings of graduates working and not enrolled 2 years after completing highest credential
- Median earnings of graduates working and not enrolled 1 year after completing
- Median earnings of graduates working and not enrolled 4 years after completing
- Median earnings of graduates working and not enrolled 5 years after completing
- NOTE: This list excludes demographic-specific median earnings such as for non-male graduates, for Pell recipients, etc. which are also available on the College Scorecard API.

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
