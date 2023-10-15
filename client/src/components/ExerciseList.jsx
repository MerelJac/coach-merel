
export const ExerciseList = ({ exercises }) => {
    if(!exercises.length) {
        return <p>No saved workouts yet! Go to the Create paget to get started.</p>;
    }

    return (
        <div>
            <div>
                {exercises && exercises.map((exercise) => (
                    <div key={exercise}>
                        <p>{exercise}</p>
                        </div>
                ))}
            </div>
        </div>
    )
};
