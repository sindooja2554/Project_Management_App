import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client/react';
import { UPDATE_PROJECT } from '../mutations/projectMutations';
import { GET_PROJECT } from '../queries/projectQueries'; 

export default function EditProjectForm({ project }) {

    const [name, setName] = useState(project.name);
    const [description, setDescription] = useState(project.description);
    const [status, setStatus] = useState('');

    useEffect(() => {
        if(project.status === 'Not Started') {
            setStatus('new');
        } else if(project.status === 'In Progress') {
            setStatus('progress');
        } else if(project.status === 'Completed') {
            setStatus('completed');
        }
    }, [project]);

    const [updateProject] = useMutation(UPDATE_PROJECT, {
        variables: { id: project.id, name, description, status },
        refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }]
    });

    const onSubmit = (e) => {
        e.preventDefault();
        if(name === "" || description === "" || status === "") {
            return alert("Please fill in all fields");
        }
        updateProject();
    }

  return (
    <div className='mt-5'>
      <h3>Update Project Details</h3>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea type="text" className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>
        <div className="mb-3">
            <label className="form-label">Status</label>
            <select className="form-select" id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="new">Not Started</option>
                <option value="progress">In Progress</option>
                <option value="completed">Completed</option>
            </select>
        </div>
        <button type='submit' className="btn btn-primary">
            Submit
        </button>
      </form>
    </div>
  )
}
