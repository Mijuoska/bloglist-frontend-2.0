    let timeoutId

    export const setNotification = (message, type, timeout) => {
        return async dispatch => {
            dispatch({
                type: 'SET',
                content: message,
                messageType: type
            })
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
            timeoutId = setTimeout(() => {
                dispatch({
                    type: 'CLEAR',
                    content: ''
                })

            }, timeout)

        }
    }


    const notificationReducer = (state = '', action) => {
        switch (action.type) {
            case ('SET'):
                return action
            case ('CLEAR'):
                return action.content

            default:
                return state

        }

    }


    export default notificationReducer