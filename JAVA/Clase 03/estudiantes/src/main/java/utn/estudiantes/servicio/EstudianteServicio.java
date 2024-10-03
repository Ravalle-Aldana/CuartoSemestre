package utn.estudiantes.servicio;

import utn.estudiantes.modelo.Estudiante;

jimport org.springframework.beans.factory.annotation.Autowired;
import utn.estudiantes.modelo.Estudiante;

import java.util.List;

@Service

public class EstudianteServicio implements iEstudianteServicio{

    @Autowired

    @Override
    public List<Estudiante> ListarEstudiante() {
        return List.of();
    }

    @Override
    public Estudiante BuscarEstudiantePorId(Integer idEstudiante) {
        return null;
    }

    @Override
    public void guardarEstudiante(Estudiante estudiante) {

    }

    @Override
    public void eliminarEstudiante(Estudiante estudiante) {

    }
}
