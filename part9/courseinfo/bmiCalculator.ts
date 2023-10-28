// interface bmiValues {
//   height: number,
//   weight: number
// }

// const parseArguments = (args: Array<string>): bmiValues => {
//   if (args.length < 4) throw new Error('Not enough arguments');
//   if (args.length > 4) throw new Error('Too many arguments');

//   if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
//     return {
//       height: Number(args[2]),
//       weight: Number(args[3])
//     }
//   } else {
//     throw new Error('Provided values were not numbers!');
//   }
// }

const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / Math.pow(height / 100, 2);
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal (healthy weight)';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
}

// try {
//   const { height, weight } = parseArguments(process.argv);
//   console.log(calculateBmi(height, weight));
// } catch (error: unknown) {
//   let errorMessage = 'Something went wrong, please try again';
//   if (error instanceof Error) {
//     errorMessage = error.message;
//   }
//   console.log(errorMessage);
// }


export default  calculateBmi ;