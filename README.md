# Getting Started with Radar

This project aims to get open jobs fast and not to miss any jobs.
We use [theirstack](https://theirstack.com/en) apis to fetch those jobs.

## How to run the project

Simply run `npm start`

## Usage

- First, you need to create [theirstack](https://theirstack.com/en) account and get your token information.
- After that, you need to input some values to the input form. 
  - `Limit`: number of limit of jobs to fetch
  - `Past X Days`: number of days ago to search for
  - `Token`: token info you got from theirstack. Remove `Bearer` (it is automatically added)
  - `Search Query In Job Title`: search queries to be included in the job title.
  - `Tech Query`: tech queries to be included in the tech stack of the job description.
- If you click `Submit` button, you will see list of jobs available.

## Note
- For free versions of [theirstack](https://theirstack.com/en), they hide company name and other info as default. But you can still see the job title and link.
- For paid versions, you can enjoy fully.