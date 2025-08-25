namespace backend.Models.Entites
{
    public class Todo
    {
        public Guid Id { get; set; }
        public required string Title { get; set; }
        public string? description { get; set; }
        public required DateOnly CreatedAt { get; set; }
        public required DateOnly DueDate { get; set; }
        public required string Priority { get; set; }
        public required string Status { get; set; }
    }
}
