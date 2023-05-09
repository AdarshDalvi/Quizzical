import React from 'react'
import './App.css'
import FirstScreen from './FirstScreen'
import Loader from './Loader'
import QuizComponent from './QuizComponent'
import {nanoid} from 'nanoid'
import ShapeBlobs from './ShapeBlobs'

export default function App() {

  const [ startQuiz, setStartQuiz]= React.useState(false)
  const [ loading, setLoading]= React.useState(false)
  const [ checkScore, setCheckScore]= React.useState(false)
  const [score, setScore] = React.useState(0)
  const [requiredArray, setRequiredArray] = React.useState([])


  React.useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple`);
      const responseJson = await response.json();
      const tempArray = await setObject(responseJson.results);
      const shuffledArray = await shuffleArray(tempArray);
      setRequiredArray(shuffledArray);
      setLoading(false);
    } catch (e) {
      console.log(e.message);
      setLoading(false);
    }
  };


  async function shuffleArray(array) {
    const shuffledArray = array.map((item) => {
      const allOptions = item.all_options.sort(() => Math.random() - 0.5);
      return { ...item, all_options: allOptions };
    });
  
    return shuffledArray;
  }

  async function setObject(array){
    let requiredArray = array.map(item=>{
      return {
          id: nanoid(),
          question : item.question,
          correct_answer : item.correct_answer,
          all_options : setOptionsArray([...item.incorrect_answers,item.correct_answer]),
          selected_answer: ""
      }
    })
    return requiredArray
  }

  

  function setOptionsArray(array) {
  return array.map((value) => ({ value, isHeld: false }));
}

  function startQuizFunction(){
    setStartQuiz(prevStartQuiz=>!prevStartQuiz)
  }


  let elements = requiredArray.map(element=>{
    return (
      <QuizComponent 
        key={element.id} 
        object={element} 
        selectAnwser={selectAnswer} 
        checkScore={checkScore}
      />
    )
  })


  function selectAnswer(question, option) {
    const updatedArray = requiredArray.map((item) => {
      if (item.question !== question) {
        return item;
      }
  
      const updatedItem = {
        ...item,
        selected_answer: option,
        all_options: item.all_options.map((singleOption) => {
          const isHeld = singleOption.value === option;
          return { ...singleOption, isHeld };
        }),
      };
      return updatedItem;
    });
  
    setRequiredArray(updatedArray);
  }

  function checkAnswer(){
    if(requiredArray.every(item=>item.selected_answer!="")){
      setCheckScore(true)
      let count = 0
      requiredArray.forEach(element=>{
        if(element.correct_answer===element.selected_answer){
          count= count + 1
        }
      })
      setScore(prevScore=>count)
    }
  }

  function playAgain(){
    setStartQuiz(false)
    setCheckScore(false)
    setScore(0)
    fetchData();
  }

  return (
    <main>
      { !startQuiz ?
        <FirstScreen
          startQuiz={()=>startQuizFunction()}
        />: loading ? 
          <Loader/> : 
          <div className='quiz-wrapper'>
            <ShapeBlobs
                top="-8rem"
                right="-9rem"
                bottom="-8rem"
                left="-10rem"
            />
            {elements}
            {!checkScore? <div style={{display:'flex',justifyContent:'center'}}>
              <button className='start-quiz' style={{marginTop:'5px'}} onClick={checkAnswer} >Check Answers</button>
            </div>: 
                <div className='scoreCard'>
                  <p className='score'>{`You scored ${score}/5 correct answers`}</p>
                  <button className='start-quiz play-again' onClick={playAgain}>Play Again</button>
                </div>
            }
          </div>
      }
    </main>
  )
}

