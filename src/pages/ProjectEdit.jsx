import { useParams } from "react-router-dom"
import { BasicTextProject } from "../components/ProjectForm/BasicTextProject"

export const ProjectEdit =()=>{
    const {projectId} =  useParams()
    console.log('nigga,', projectId)
    return (
        <>
            <BasicTextProject/>
        </>
    )
}