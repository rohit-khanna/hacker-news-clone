# [Hacker-news](https://news.ycombinator.com/) (front page) Clone using React /SSR

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## [See Demo](https://rk-hacker-news-clone.herokuapp.com/)

---

## Technology Stack

- Editor
  - VS Code
- Development
  - ReactJS
  - Redux
  - thunk
  - axios
  - react-icons
  - sass
  - lodash
  - momentJS
  - [react-charts](https://github.com/tannerlinsley/react-charts)
- Testing
  - Jest
  - Enzyme
- Deployment
  - Travis CI
  - Heroku

### Data: https://hn.algolia.com/api

### CI-CD Pipeline : [Travis CI](https://travis-ci.com/github/rohit-khanna)

---

## Application Flow

### Fetch News Flow

![Fetch News Flow](./extra/main.png)

When `FetchNews()` API is invoked, the following steps are followed:

1.  fetch Data from External API
    - data is **normalized** before processing
2.  fetch local upvote data
3.  fetch locla hiddn items

The Data from all three steps is merged and then updated in store.

---

### Upvote Flow

When `upvote()` is invoked, the localServiceAPI is updated with new vote count and the associated `dispatch` updates the store. And hence Chart+Grid.

---

### hide item Flow

When `hideItem()` is invoked, the localServiceAPI is updated with new list of Hidden Items and the associated `dispatch` updates the store. And hence Chart+Grid.
