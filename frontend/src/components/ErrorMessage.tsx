import { css } from "@emotion/css"
import { useEffect } from "react"

type ErrorMessagePropType = {
    errorMessages: string | undefined,
    setErrorMessages: React.Dispatch<React.SetStateAction<string | undefined>>
}
function ErrorMessage({ errorMessages, setErrorMessages }: ErrorMessagePropType) {
    useEffect(() => {
        if (errorMessages) {
            setTimeout(() => {
                setErrorMessages(undefined)
            }, 5000)
        }
    }, [errorMessages])
    return (
        <div
            className={
                css`
            background-color: #ffffff;
            `
            }
        >
            {
                errorMessages && <p
                    className={
                        css`
                            color: red;
                            font-size: 1.5rem;
                            `
                    }
                >{errorMessages}</p>
            }
        </div>
    )
}

export default ErrorMessage