namespace eXaminator.Models;

public class Exam : BaseEntity
{
    public int QuestionSetId { get; init; }
    public List<ExamQuestion> ExamQuestions { get; init; } = [];
    public int Score => (int)Math.Round(ExamQuestions.Where(x => x.Correct).Sum(x => x.Points) / ExamQuestions.Sum(x => x.Points) * 100d);
    public DateTime TakingDate { get; init; }

}
