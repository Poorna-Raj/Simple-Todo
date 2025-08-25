using backend.Models.Entites;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace backend.Data
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options): base(options)
        {
        }
        public DbSet<Todo> Todos { get; set; }
    }
}
