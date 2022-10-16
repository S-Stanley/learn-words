import { Fragment, useEffect, useRef, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { useForm } from 'react-hook-form';

const App = () => {

    const [offset, setOffset] = useState(0);
    const [errAnswer, setErrAnswer] = useState([]);
    const [explanation, setExplanation] = useState(false);

    const inputAnswer = useRef();
    const buttonNextQuestion = useRef();

    const { reset, getValues, ...methods } = useForm();

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
        reset();
        setOffset(offset + 1);
        inputAnswer?.current?.focus();
    }

    const checkResult = (values) => {
        if (values?.inputAnswerRegister?.toLowerCase() !== data?.allWords?.nodes[0].toLearn.toLowerCase()) {
            setExplanation(true);
            setErrAnswer([...errAnswer, ...data?.allWords?.nodes]);
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
                    <p>You wrote: {methods.watch('inputAnswerRegister')?.toLowerCase()}</p>
                    <p>It was: {data?.allWords?.nodes[0].toLearn.toLowerCase()}</p>
                    <button onClick={nextQuestion} ref={buttonNextQuestion}>Next question</button>
                </div>
            ) : (
                <div>
                    <form
                        onSubmit={methods.handleSubmit(checkResult)}
                    >
                        <p>{offset + 1}/{data?.allWords?.totalCount + 1} {data?.allWords?.nodes[0].inFrench}</p>
                        <p>{errAnswer.length} errors for the moment</p>
                        <input
                            ref={inputAnswer}
                            type='text'
                            onKeyUp={validate_with_enter}
                            { ...methods.register('inputAnswerRegister', { required: true }) }
                        />
                        { methods.formState.errors.inputAnswerRegister &&
                            <span>This field is required</span>
                        }
                        <input type="submit"/>
                    </form>
                </div>
            )}
        </Fragment>
    );
}

export default App;
