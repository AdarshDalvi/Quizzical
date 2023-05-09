import React from "react"
import './App.css'
import he from 'he'

export default function QuizComponent({object,selectAnwser,checkScore}){

    return (
        <div className='question-container'>
            <h1 className='question' >{he.decode(object.question)}</h1>
            <div className='options'>
                {
                    object.all_options.map(options=>{
                        let backgroundColor;
                        let opacity;
                        if (checkScore) {
                          if (options.value === object.correct_answer) {
                            opacity = 1
                            backgroundColor = '#94D7A2';
                          } else if (options.isHeld) {
                            backgroundColor = options.value === object.correct_answer ? '#94D7A2' : '#F8BCBC';
                            opacity = options.value === object.correct_answer ? 1 : 0.4;
                          } else {
                            opacity = 0.4
                            backgroundColor = 'transparent';
                          }
                        } else {
                          backgroundColor = options.isHeld ? '#D6DBF5' : 'transparent';
                        }

                        const style = { 
                            backgroundColor ,
                            opacity,
                            pointerEvents: checkScore && 'none'
                        };
                        return (
                            <div
                                onClick={()=>selectAnwser(object.question,options.value)}
                                key={options.value} 
                                style={style}
                                className='optionBox'>
                                {he.decode(options.value)}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
