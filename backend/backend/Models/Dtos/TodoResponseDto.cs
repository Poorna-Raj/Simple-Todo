using backend.Models.Entites;

namespace backend.Models.DTOs
{
    public class TodoResponseDto
    {
        public Guid Id { get; set; }
        public required string Title { get; set; }
        public string? Description { get; set; }
        public required DateTime CreatedAt { get; set; }
        public required DateTime DueDate { get; set; }
        public required string Priority { get; set; }
        public required string Status { get; set; }
    }
}
