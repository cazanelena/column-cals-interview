# Task 1 
## Calculation columns

- The user will have the capability to carry out four distinct types of calculations: addition, subtraction, multiplication, and division.
- To try this out, you can add:
**Column name:**
"foo"
**Function Declaration:**
"volume + cell-density" OR "cell-density * volume" (case sensitive, and whitespace before and after the operator)

# Task 2
## Column Aggregations

- For implementing column aggregations, I found it easier to utilize the Dialog Blueprint Component.
- Users can select a column and an operation (sum, average, max, min), and the result will be displayed in a second Table2.

## Format DummyData table

- I found it somewhat easier to work with the provided dummy data by using a different format. Therefore, I opted to format it as shown below:

```typescript
export const betterTableData: Record<string, (number | string)[]> = {
  "time": [
    '2021-01-01T20:39:26.023Z',
    '2021-01-02T20:39:26.023Z',
    '2021-01-03T20:39:26.023Z',
    '2021-01-04T20:39:26.023Z',
    '2021-01-05T20:39:26.023Z',
    '2021-01-06T20:39:26.023Z',
    '2021-01-07T20:39:26.023Z',
    '2021-01-08T20:39:26.023Z',
  ],
  "cell-density": 
  [
    120,
    100,
    140,
    150,
    166,
    174,
    182,
    194,
  ],
  "volume": [
    990,
    980,
    970,
    960,
    956,
    954,
    955,
    949,
  ]
};
```


### Deprioritising for a MVP

- Error checking: Notify the user if the correct format is not inputted or if input data is missing.
- Not testing added.
- Added columns not working when the users will try to perform any calculations. 
- No styling added.

  

# Opvia Take-home Product Challenge

Congratulations on being selected for the next stage of our interview process!

We really appreciate the time you have invested in the process so far and only invited you to this next challenge because we think there's a very good chance you'd be a great fit at Opvia. This is the penultimate step in the interview process! For context at this stage the probability of a candidate receiving an offer is (~25%).

This is our only opportunity to see what how you build so we weight it very highly.

## How to complete this stage of the interview process

1. Please clone this repo and use it as your starting point. This is a simple create-react-app featuring the blueprintjs table component https://blueprintjs.com/docs/#table
2. Complete the 'Opvia product problem' below
3. When you are done, create a private repo and push your code to it
4. Invite _hfmw_ & _OliverWales_ to view the repo

## Opvia product problem

Scientists are using Opvia to store all their data in a standardised structure. The example data has come from a scientists who is uploading their bioreactor data into Opvia.

They have said that it would be useful if they could calculate the cell count in Opvia, as well as being able to see its maximum value.

The Opvia platform allows scientists to build what they need. So, instead of building in these specific features, we have identified two higher level features which would enable the customer to achieve what they need, whilst also be useful for other use-cases.

1. `Calculation columns`, where the user can add a column with a formula such as `Cell Density * Volume`
2. `Column aggregations`, where the user can aggregate data from a column e.g. `Max Cell Count`

You have a call scheduled with the scientist. Build a working MVP that you could give the user access to to get their feedback.

#### FAQS

- Can I change the structure/content of the raw data? - yes feel free to, but don't feel obligated to (this is a product not an engineering challenge)
- Where is the data coming from? It's from an instrument (a bioreactor). 
- Unsure whether to submit? Would you happily get on a call with a scientist and give them access? Would what you've showed them make them more excited about using Opvia?
- Ran out of time? Document any features that you'd like to have built.
- I have a question? Please ask!! Email `oli@opvia.io` and cc  `will@opvia.io`
- How should I communicate? Please over communicate. We want to learn what it's like to work with you :)
- Do I need to write tests? - not unless it helps you! We're just looking for "a working MVP that you could give the user access to to get their feedback"
