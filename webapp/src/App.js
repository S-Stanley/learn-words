import { Fragment, useEffect, useRef, useState } from "react";

import { useQuery, gql } from "@apollo/client";

const App = () => {

    const [offset, setOffset] = useState(0);
    const [errors, setErrors] = useState([]);
    const [answer, setAnswers] = useState('');
    const [explanation, setExplanation] = useState(false);

    const inputAnswer = useRef();
    const buttonNextQuestion = useRef();

    const { loading, error, data } = useQuery(gql`
        query getNextWord (
            $offset: Int
        ) {
            allWords(
                first: 1,
                offset: $offset,
                orderBy: NATURAL
            ) {
                nodes {
                    id
                    inFrench
                    toLearn
                }
                totalCount
            }
        }`,
        {
            variables: {
                offset: offset
            }
        }
    )

    useEffect(() => {
        inputAnswer?.current?.focus();
    });

    if (loading) {
        return (<Fragment>Loading...</Fragment>);
    }
    if (error) {
        return (<Fragment>Error.. please refresh the page</Fragment>);
    }

    const nextQuestion = () => {
        setExplanation(false);
        setAnswers('');
        setOffset(offset + 1);
        inputAnswer?.current?.focus();
    }

    const checkResult = () => {
        if (answer.toLowerCase() !== data?.allWords?.nodes[0].toLearn.toLowerCase()) {
            setExplanation(true);
            setErrors([...errors, ...data?.allWords?.nodes]);
            // buttonNextQuestion?.current?.focus();
        } else {
            nextQuestion();
        }
    }

    const validate_with_enter = (event) => {
        if (event.key === 'Enter'){
            if (explanation) {
                nextQuestion();
            } else {
                checkResult();
            }
        }
    }

    // window.addEventListener('keyup', (event) => {
    //     validate_with_enter(event);
    // });

    return (
        <Fragment>
            {explanation ? (
                <div>
                    <p>Error!</p>
                    <p>You wrote: {answer.toLowerCase()}</p>
                    <p>It was: {data?.allWords?.nodes[0].toLearn.toLowerCase()}</p>
                    <button onClick={nextQuestion} ref={buttonNextQuestion}>Next question</button>
                </div>
            ) : (
                <div>
                    <p>{offset + 1}/{data?.allWords?.totalCount + 1} {data?.allWords?.nodes[0].inFrench}</p>
                    <p>{errors.length} errors for the moment</p>
                    <input ref={inputAnswer} type='text' value={answer} onChange={(e) => setAnswers(e.target.value)} onKeyUp={validate_with_enter}/>
                    <button onClick={checkResult}>Try</button>
                </div>
            )}
        </Fragment>
    );
}

export default App;
