import Spinner from "./Spinner";
import ProjectCard from "./ProjectCard";
import { useQuery } from "@apollo/client/react"
import { GET_PROJECTS } from "../queries/projectQueries"

export default function Projects() {
  const { loading, error, data } = useQuery(GET_PROJECTS)

  if (loading) return <Spinner />
  if (error) return <p>Something went wrong</p>

  return (
     <>{data.projects.length === 0 ? (
        <p className="mt-3">No Projects</p>
     ) : (
        <div className="row mt-5">
            {data.projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>

     )}</>
  )
}
