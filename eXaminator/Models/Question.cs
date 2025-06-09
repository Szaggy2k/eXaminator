namespace eXaminator.Models;

public class Question : BaseEntity
{
    public string Text { get; init; } = null!;
    public int SetId { get; init; }
    public List<Answer> Answers { get; init; } = [];
    public uint Points { get; init; }
}
