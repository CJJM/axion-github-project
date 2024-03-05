# Axion Project

## Technical Choices

- Minimal dependencies, focus on best practices using Octokit, SCSS, Jest, Typescript
- Prettier for consistent readability
- Styling using Semantic HTML and minimal classNames

## Application Choices

- Support for either organization or username signin (if they are authorized by Github)
- Support for pagination, sorting, and filtering (simplified pagination controls)
- Repositories in tabular format with styling using CSS Transitions to increase immersion
- Inclusion of Avatar images for increased feedback to user

## Running the Application

- Runs like typical Vite application
- Pull repo, enter directory, then:
  - `npm install`
  - `npm run dev`
- Can log into any valid organization or username, and the password is `password`

## Features to Implement

- Increased error handling
- Details page for repository user clicks on
- Integrating more Github APIs
- Increased styling to mimic Axion Ray themes
