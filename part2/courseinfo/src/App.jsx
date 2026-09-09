import Course from "./components/Course";
import { courses } from "./data";

export default function App() {
    return (
        <>
            <h1>Web Development Curriculum</h1>
            <hr />
            {courses.map((c) => (
                <Course key={c.id} course={c} />
            ))}
        </>
    );
}
