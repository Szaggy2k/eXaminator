namespace eXaminator.Models;

public class Answer : BaseEntity
{
    public string Text { get; init; } = null!;
    public int QuestionId { get; init; }
    public bool Correct { get; init; }
}
