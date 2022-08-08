export const Persons = ({ persons, handleDelete }) => {
    return (
        <>
        { 
        persons.map(person => {
            return <p key={person.id}>{person.name} {person.number} <button onClick={() => handleDelete(person.id, person.name)}>delete</button></p>
      })}
        </>
    )
}