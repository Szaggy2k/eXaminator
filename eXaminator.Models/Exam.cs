namespace eXaminator.Models;

public class Exam : BaseEntity
{
    public int QuestionSetId { get; set; }
    public List<ExamQuestion> ExamQuestions { get; set; } = [];
    public string? Examinee { get; set; }
    public int Score => (int)Math.Round(ExamQuestions.Where(x => x.IsCorrect).Sum(x => x.Question.Points) / ExamQuestions.Sum(x => x.Question.Points) * 100d, 0);
    public DateTime StartTime { get; set; }
    public TimeSpan MaxDuration { get; set; }
    public int PassingThreshold { get; set; }
    public bool Passed => Score >= PassingThreshold && (MaxDuration == TimeSpan.Zero || CreationTime.Subtract(StartTime) <= MaxDuration );
}
