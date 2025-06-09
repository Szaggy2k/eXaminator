namespace eXaminator.Models;

public class ExamQuestion : BaseEntity
{
    public int ExamId { get; set; }
    public Exam Exam { get; set; } = null!;
    public int QuestionId { get; set; }
    public Question Question { get; set; } = null!;
    public List<Answer> SelectedAnswers { get; set; } = [];
    public bool IsCorrect => SelectedAnswers.All(x => x.IsCorrect);
}
