using backend.Data;
using backend.Models.DTOs;
using backend.Models.Entites;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodosController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;

        public TodosController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var todos = _appDbContext.Todos
                .OrderByDescending(t => t.Priority)   // High = 2, Medium = 1, Low = 0
                .Select(t => new TodoResponseDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    Priority = t.Priority.ToString(),
                    Status = t.Status.ToString(),
                    CreatedAt = t.CreatedAt.ToDateTime(TimeOnly.MinValue),
                    DueDate = t.DueDate.ToDateTime(TimeOnly.MinValue)
                })
                .ToList();

            return Ok(todos);
        }


        [HttpGet]
        [Route("{id:guid}")]
        public IActionResult Details(Guid id)
        {
            var todo = _appDbContext.Todos.Find(id);
            if(todo == null)
            {
                return NotFound();
            }
            var sendTodo = new TodoResponseDto()
            {
                Id = todo.Id,
                Title = todo.Title,
                Description = todo.Description,
                Priority = todo.Priority.ToString(),
                Status = todo.Status.ToString(),
                CreatedAt = todo.CreatedAt.ToDateTime(TimeOnly.MinValue),
                DueDate = todo.DueDate.ToDateTime(TimeOnly.MinValue)
            };
            return Ok(sendTodo);
        }

        [HttpGet("by-priority/{priority}")]
        public IActionResult IndexByPriority(string priority)
        {
            if(!Enum.TryParse<Priority>(priority,true, out var priorityEnum))
            {
                return BadRequest("Invalid priority value!");
            }

            var todos = _appDbContext.Todos
                .Where(t => t.Priority == priorityEnum)
                .Select(t => new TodoResponseDto
                {
                    Priority = t.Priority.ToString(),
                    Title = t.Title,
                    Id = t.Id,
                    Description = t.Description,
                    Status = t.Status.ToString(),
                    CreatedAt = t.CreatedAt.ToDateTime(TimeOnly.MinValue),
                    DueDate = t.DueDate.ToDateTime(TimeOnly.MinValue)
                })
                .ToList();
            return Ok(todos);
        }

        [HttpPost]
        public IActionResult Store(AddTodoDto todo)
        {
            // Parse Status safely
            if (!Enum.TryParse<Status>(todo.Status, true, out var statusEnum))
                return BadRequest("Invalid status value!");

            // Parse Priority safely
            if (!Enum.TryParse<Priority>(todo.Priority, true, out var priorityEnum))
                return BadRequest("Invalid priority value!");

            var newTodo = new Todo()
            {
                Title = todo.Title,
                Description = todo.Description,
                Status = statusEnum,
                CreatedAt = DateOnly.FromDateTime(todo.CreatedAt),
                DueDate = DateOnly.FromDateTime(todo.DueDate),
                Priority = priorityEnum
            };
            _appDbContext.Todos.Add(newTodo);
            _appDbContext.SaveChanges();
            var sendTodo = new TodoResponseDto()
            {
                Id = newTodo.Id,
                Title = newTodo.Title,
                Description = newTodo.Description,
                Priority = newTodo.Priority.ToString(),
                Status = newTodo.Status.ToString(),
                CreatedAt = newTodo.CreatedAt.ToDateTime(TimeOnly.MinValue),
                DueDate = newTodo.DueDate.ToDateTime(TimeOnly.MinValue)
            };
            return Ok(sendTodo);
        }

        [HttpPut]
        [Route("{id:guid}")]
        public IActionResult Update(Guid id,UpdateTodoDto todoDto)
        {
            var todo = _appDbContext.Todos.Find(id);
            if (todo == null)
            {
                return NotFound();
            }
            // Parse Status safely
            if (!Enum.TryParse<Status>(todoDto.Status, true, out var statusEnum))
                return BadRequest("Invalid status value!");

            // Parse Priority safely
            if (!Enum.TryParse<Priority>(todoDto.Priority, true, out var priorityEnum))
                return BadRequest("Invalid priority value!");

            todo.Title = todoDto.Title;
            todo.Description = todoDto.Description;
            todo.Status = statusEnum;
            todo.Priority = priorityEnum;
            todo.DueDate = DateOnly.FromDateTime(todoDto.DueDate);

            _appDbContext.SaveChanges();
            var sendTodo = new TodoResponseDto()
            {
                Id = todo.Id,
                Title = todo.Title,
                Description = todo.Description,
                Priority = todo.Priority.ToString(),
                Status = todo.Status.ToString(),
                CreatedAt = todo.CreatedAt.ToDateTime(TimeOnly.MinValue),
                DueDate = todo.DueDate.ToDateTime(TimeOnly.MinValue)
            };
            return Ok(sendTodo);
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public IActionResult Delete(Guid id)
        {
            var todo = _appDbContext.Todos.Find(id);
            if(todo == null)
            {
                return NotFound();
            }
            _appDbContext.Todos.Remove(todo);
            _appDbContext.SaveChanges();
            var sendTodo = new TodoResponseDto()
            {
                Id = todo.Id,
                Title = todo.Title,
                Description = todo.Description,
                Priority = todo.Priority.ToString(),
                Status = todo.Status.ToString(),
                CreatedAt = todo.CreatedAt.ToDateTime(TimeOnly.MinValue),
                DueDate = todo.DueDate.ToDateTime(TimeOnly.MinValue)
            };
            return Ok(sendTodo);
        }
    }
}
