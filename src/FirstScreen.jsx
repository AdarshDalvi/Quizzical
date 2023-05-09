import ShapeBlobs from "./ShapeBlobs"
import './App.css'

export default function FirstScreen({startQuiz}){
    return (
        <div className="firstScreen">
            <ShapeBlobs
                top="-6rem"
                right="-7rem"
                bottom="-6rem"
                left="-6rem"
            />
            <div className="centeredFirstScreen">
                <h1 className='title'>Quizzical</h1>
                <p className='sub-title'>A simple Quiz Game made with React</p>
                <button className='start-quiz' onClick={startQuiz}>Start Quiz</button>
            </div>
        </div>
    )
}