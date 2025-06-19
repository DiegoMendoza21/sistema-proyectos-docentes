import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Trash2 } from "lucide-react";

export default function ProjectManagementSystem() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    coordinator: "",
    objective: "",
    status: "En planificación",
  });
  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      setProjects(
        projects.map((p) => (p.id === formData.id ? formData : p))
      );
      setEditMode(false);
    } else {
      setProjects([...projects, { ...formData, id: Date.now() }]);
    }
    setFormData({ id: null, title: "", coordinator: "", objective: "", status: "En planificación" });
  };

  const handleEdit = (project) => {
    setFormData(project);
    setEditMode(true);
  };

  const handleDelete = (id) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  return (
    <div className="p-6 grid gap-4">
      <h1 className="text-2xl font-bold">Sistema de Gestión de Proyectos Docentes</h1>

      <form onSubmit={handleSubmit} className="grid gap-2 bg-white p-4 rounded-2xl shadow">
        <Input
          placeholder="Título del proyecto"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <Input
          placeholder="Coordinador del proyecto"
          name="coordinator"
          value={formData.coordinator}
          onChange={handleChange}
          required
        />
        <Textarea
          placeholder="Objetivo del proyecto"
          name="objective"
          value={formData.objective}
          onChange={handleChange}
          required
        />
        <select name="status" value={formData.status} onChange={handleChange} className="border rounded p-2">
          <option>En planificación</option>
          <option>En ejecución</option>
          <option>Finalizado</option>
        </select>
        <Button type="submit">{editMode ? "Actualizar Proyecto" : "Agregar Proyecto"}</Button>
      </form>

      <div className="grid gap-4">
        {projects.map((project) => (
          <Card key={project.id} className="bg-slate-50 border p-4 relative">
            <CardContent>
              <h2 className="font-semibold text-xl mb-1">{project.title}</h2>
              <p><strong>Coordinador:</strong> {project.coordinator}</p>
              <p><strong>Objetivo:</strong> {project.objective}</p>
              <p><strong>Estado:</strong> {project.status}</p>
              <div className="flex gap-2 mt-3">
                <Button variant="outline" size="sm" onClick={() => handleEdit(project)}><Pencil className="w-4 h-4 mr-1" /> Editar</Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(project.id)}><Trash2 className="w-4 h-4 mr-1" /> Eliminar</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}