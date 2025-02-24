namespace Domain;

public class Alumno
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string? Nombre { get; set; } = "Dummy Name";
    public int? Edad { get; set; } = 18;
    public string? Foto { get; set; } = "dummy_photo.jpg";
    public double? Promedio { get; set; } = 0.0;

    // Optional: Add a parameterless constructor if you need one
    public Alumno() { }

    // Optional: Add a parameterized constructor for convenience
    public Alumno(string nombre, byte edad, string foto)
    {
        Nombre = nombre;
        Edad = edad;
        Foto = foto;
    }
}
