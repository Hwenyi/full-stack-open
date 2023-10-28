interface resultObject {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

// const parseExerciseArguments = (args: Array<string>): Array<number> => {
//   if (args.length < 4) throw new Error('Not enough arguments');
//   //从2往后切片然后遍历，如果有一个不是数字就抛出错误
//   return args.slice(2).map(arg => {
//     if (!isNaN(Number(arg))) {
//       return Number(arg);
//     } else {
//       throw new Error('Provided values were not numbers!');
//     }
//   });
// }


const calculateExercises = (dailyExerciseHours: Array<number>, target: number): resultObject => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter(hours => hours > 0).length;
  const average = dailyExerciseHours.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;
  const rating = success ? 3 : average >= target - 1 ? 2 : 1;
  const ratingDescription = rating === 3 ? 'Excellent' : rating === 2 ? 'Not too bad but could be better' : 'You should try harder';
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
}

// try {
//   //解构的第一个值是target，剩下的是dailyExerciseHours
//   const [target, ...dailyExerciseHours] = parseExerciseArguments(process.argv);
//   console.log(calculateExercises(dailyExerciseHours, target));
// } catch {
//   console.log('Something went wrong, please try again');
// }

export default  calculateExercises ;