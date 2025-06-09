using System.Text.Json.Serialization;

namespace eXaminator.Models;

public class Answer : BaseEntity
{
    public string Text { get; set; } = null!;
    public int QuestionId { get; set; }
    public Question Question { get; set; } = null!;
    public bool IsCorrect { get; set; }
}
