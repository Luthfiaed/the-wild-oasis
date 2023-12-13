# [WIP] The Wild Oasis Booking App

This project is done as a part of [this course](https://https://www.udemy.com/course/the-ultimate-react-course/). The project and Readme are still under development.

## Tools and Concepts Used

1. React + TypeScript. The original course uses JavaScript but this project uses TypeScript
2. Additional ESlint rules not in the original course
3. Client-side rendering (CSR) because the fictional users are employees of a company, not the public. No need for SEO
4. Code is organized based on feature (see `src/feature`). Custom hook and UI component are co-located based on the feature they are used in. If they are used in more than one feature, they are lifted to the common `hooks` and `ui` directory.

## Roadmap

1. Add unit, integration, and e2e testing
2. Implement search bar for cabins
3. Add pre-commit hooks for code quality
4. Add OAuth Login using Github
