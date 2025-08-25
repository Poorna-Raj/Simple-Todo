namespace backend.Models.Entites
{
    public enum Priority { Low, Medium, High }
    public enum Status { Pending, InProgress, Completed }
    public class Todo
    {
        public Guid Id { get; set; }
        public required string Title { get; set; }
        public string? Description { get; set; }
        public required DateOnly CreatedAt { get; set; }
        public required DateOnly DueDate { get; set; }
        public required Priority Priority { get; set; }
        public required Status Status { get; set; }
    }
}
