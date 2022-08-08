export const Notification = ({ message }) => {
    const notificationStyle = {
        background: message[1],
        padding: 2,
        color: 'black',
        borderRadius: 5,
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold'
    }
    
    if (message === null) return null

    return (
        <div style={notificationStyle}>
            <p>{ message[0] }</p>
        </div>
    )
}