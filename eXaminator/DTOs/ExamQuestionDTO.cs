using eXaminator.Models;

namespace eXaminator.DTOs;

public class ExamQuestionDTO : BaseDTO
{
    public ExamQuestionDTO()
    {
        
    }
    public ExamQuestionDTO(ExamQuestion eq)
    {
        QuestionId = eq.QuestionId;
        Text = eq.Question.Text;
        AvailableAnswers = eq.Question.Answers.Select(a => new AnswerDTO(a)).ToList();
        SelectedAnswersIds = eq.SelectedAnswers.Select(a => a.Id).ToList();
        IsCorrect = eq.IsCorrect;
        Points = eq.Question.Points;
    }

    public int QuestionId { get; init; }
    public string Text { get; init; } = null!;
    public List<AnswerDTO> AvailableAnswers { get; init; } = [];
    public List<int> SelectedAnswersIds { get; init; } = [];
    public bool IsCorrect { get; set; }
    public int Points { get; init; }
}