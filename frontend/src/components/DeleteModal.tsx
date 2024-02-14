import { useDispatch } from "react-redux"
import Api from "../api/api.service"
import { removeSong } from "../reducers/songsReducer"
import { css } from "@emotion/css"

type ModalProp = {
    id: string,
    clear: () => void
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
}
function DeleteModal({ id, clear, setOpenModal }: ModalProp) {

    const dispatch = useDispatch()
    const api = new Api()

    return (
        <dialog open={true}
            className={
                css`
            margin-top: 40vh;
            z-index: 5;
            background-color: #4b0082;
            color: white;
            padding: 20px;
            border: 1px solid purple;
            border-radius: 5px;
            font-size: 1rem;

            `
            }>
            <p
                className={
                    css`
                    text-transform: capitalize;
                    font-size: 1.5rem;

                `
                }
            >delete song</p>
            <form method="dialog">
                <div className={
                    css`
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    gap: 20px;
                    margin: 10px;
                    `

                }>
                    <button onClick={async (e) => {
                        e.stopPropagation()
                        e.preventDefault()
                        api.deleteSongs(id)
                            .then(() => {
                                clear()
                                dispatch(removeSong({ id }))
                            }).catch((err) => {
                                console.log(err)
                            })
                        setOpenModal(false)
                    }}
                        className={
                            css`
                            background-color: white;
                            color: green;
                            margin-top: 10px;
                            &:hover {
                                background-color: green;
                                color: white;
                            }
                            `
                        }
                    >save</button>
                    <button onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                        clear()
                        setOpenModal(false)
                    }}
                        className={
                            css`
                            background-color: white;
                            color: red;
                            margin-top: 10px;
                            &:hover {
                                background-color: red;
                                color: white;
                            }
                            `
                        }>cancel</button>
                </div>
            </form>
        </dialog>
    )
}

export default DeleteModal