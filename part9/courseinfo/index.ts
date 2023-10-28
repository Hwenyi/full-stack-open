import express, { Request, Response } from 'express'
import calculateBmi from './bmiCalculator'
import calculateExercises from './calculateExercises'

const app = express()
app.use(express.json())

app.get('/',(_req: Request, res: Response)=>{
  res.send('Hello World')
})

app.get('/bmi',(req: Request, res: Response)=>{
  const weight: number = Number(req.query.weight)
  const height: number = Number(req.query.height)
  const bmi: object = {
    weight,
    height,
    bmi: calculateBmi(height,weight)
  }
  res.status(200).json(bmi)
})

app.post('/exercises',(req: Request, res: Response)=>{
  const daily_exercises: Array<number> = req.body.daily_exercises
  const target: number = req.body.target
  if(!daily_exercises || !target){
    res.status(400).json({
      error: "parameters missing"
    })
  }
  if(!Array.isArray(daily_exercises) || !daily_exercises.every(hours => !isNaN(Number(hours))) || isNaN(Number(target))){
    res.status(400).json({
      error: "malformatted parameters"
    })
  }
  const result: object = calculateExercises(daily_exercises,target)
  res.status(200).json(result)
})

const PORT = 3002

app.listen(PORT,()=>{
  console.log(`Server running on port ${PORT}`)
})

