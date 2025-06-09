using eXaminator.Models;

namespace eXaminator.DTOs;

public class ExamDTO : BaseDTO
{
    public ExamDTO() {}
    public ExamDTO(Exam exam)
    {
        QuestionSetId = exam.QuestionSetId;
        ExamQuestions = exam.ExamQuestions.Select(eq => new ExamQuestionDTO(eq)).ToList();
        EndTime = exam.CreationTime;
        StartTime = exam.StartTime;
        PassingThreshold = exam.PassingThreshold;
        MaxDurationMinutes = (int)exam.MaxDuration.TotalMinutes;
        Examinee = exam.Examinee;
    }

    public int QuestionSetId { get; init; }
    public List<ExamQuestionDTO> ExamQuestions { get; init; } = [];
    public string? Examinee { get; init; }
    // StartTime == StartTime duh
    public DateTime StartTime { get; init; }
    // EndTime == CreationTime
    public DateTime EndTime { get; init; }
    public int MaxDurationMinutes { get; init; }
    public int PassingThreshold { get; init; }
    public int Score => (int)Math.Round(ExamQuestions.Where(x => x.IsCorrect).Sum(x => x.Points) / ExamQuestions.Sum(x => x.Points) * 100d, 0);
}
