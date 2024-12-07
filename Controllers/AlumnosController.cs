using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using prouuyyy.Infrastructure.Data;
using Domain;
using System;
using System.IO;
using System.Threading.Tasks;
using System.Linq;

namespace YourNamespace.Controllers
{
    public class AlumnosController : Controller
    {
        private readonly AlumnoDbContext _context;

        public AlumnosController(AlumnoDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Dashboard()
        {
            return View();
        }

        [HttpGet]
        public IActionResult GetAlumnos()
        {
            try
            {
                var alumnos = _context.List();
                return Json(alumnos);
            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message });
            }
        }

        [HttpGet]
        public IActionResult GetStatistics()
        {
            try
            {
                var alumnos = _context.List();

                // Process actual data for age distribution
                var ageDistribution = alumnos
                    .GroupBy(a => a.Edad)
                    .Select(g => new 
                    {
                        age = g.Key ?? 0, // Handle null ages
                        count = g.Count()
                    })
                    .OrderBy(x => x.age)
                    .ToList();

                // Calculate averages by age (if you have grades)
                var averagesByAge = alumnos
                    .Where(a => a.Edad.HasValue && a.Promedio.HasValue)
                    .GroupBy(a => a.Edad.Value)
                    .Select(g => new
                    {
                        name = $"{g.Key} años",
                        value = Math.Round(g.Average(a => a.Promedio.Value), 1)
                    })
                    .ToList();

                return Json(new
                {
                    ageDistribution,
                    averagesByAge
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in GetStatistics: {ex.Message}");
                return Json(new { error = ex.Message });
            }
        }

         [HttpGet]
        public IActionResult GetDetails(Guid id)
        {
            try
            {
                var alumno = _context.Details(id);
                if (alumno == null)
                {
                    return NotFound();
                }
                return Json(alumno);
            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message });
            }
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(Alumno data, IFormFile imageFile)
        {
            if (ModelState.IsValid)
            {
                data.Id = Guid.NewGuid();

                if (imageFile != null && imageFile.Length > 0)
                {
                    using (var memoryStream = new MemoryStream())
                    {
                        await imageFile.CopyToAsync(memoryStream);
                        byte[] imageBytes = memoryStream.ToArray();
                        data.Foto = Convert.ToBase64String(imageBytes);
                    }
                }

                _context.Create(data);
                return RedirectToAction("Index");
            }

            return View(data);
        }

        public IActionResult Edit(Guid id)
        {
            try
            {
                var alumno = _context.Details(id);
                if (alumno == null)
                {
                    return NotFound();
                }
                return View(alumno);
            }
            catch (Exception)
            {
                return NotFound();
            }
        }

        [HttpPost]
        public IActionResult Edit(Alumno data)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _context.Edit(data);
                    return RedirectToAction("Index");
                }
                return View(data);
            }
            catch (Exception)
            {
                return NotFound();
            }
        }

        public IActionResult Delete(Guid id)
        {
            try
            {
                _context.Delete(id);
                return RedirectToAction("Index");
            }
            catch (Exception)
            {
                return NotFound();
            }
        }
    }
}