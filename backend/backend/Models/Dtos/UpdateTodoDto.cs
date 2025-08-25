namespace backend.Models.DTOs
{
    public class UpdateTodoDto
    {
        public required string Title { get; set; }
        public string? Description { get; set; } = string.Empty;
        public required DateTime DueDate { get; set; }
        public required string Priority { get; set; }
        public required string Status { get; set; }
    }
}
