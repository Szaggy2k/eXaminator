namespace eXaminator.Models;

public class QuestionSet : BaseEntity
{
    public string Name { get; set; } = null!;
    public List<Question> Questions { get; set; } = [];
}
