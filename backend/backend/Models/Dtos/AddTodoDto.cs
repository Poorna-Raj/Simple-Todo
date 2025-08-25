namespace backend.Models.DTOs
{
    public class AddTodoDto
    {
        public required string Title { get; set; }
        public string? Description { get; set; } = string.Empty;
        public required DateTime CreatedAt { get; set; }
        public required DateTime DueDate { get; set; }
        public required string Priority { get; set; }
        public required string Status { get; set; }
    }
}
