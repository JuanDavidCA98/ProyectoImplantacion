using Microsoft.EntityFrameworkCore;
using Domain;

namespace prouuyyy.Infrastructure.Data
{
    public class AlumnoDbContext : DbContext
    {
        public AlumnoDbContext(DbContextOptions<AlumnoDbContext> options)
            : base(options)
        {
        }

        public DbSet<Alumno> Alumno { get; set; }

        public List<Alumno> List()
        {
            return Alumno.ToList();
        }

        public Alumno Details(Guid id)
        {
            return Alumno.Find(id);
        }

        public void Create(Alumno data)
        {
            Alumno.Add(data);
            SaveChanges();
        }

        public void Edit(Alumno data)
        {
            Alumno.Update(data);
            SaveChanges();
        }

        public void Delete(Guid id)
        {
            var alumno = Alumno.Find(id);
            if (alumno != null)
            {
                Alumno.Remove(alumno);
                SaveChanges();
            }
        }
    }
}
