using eXaminator.Models;

namespace eXaminator.DTOs;

public class QuestionDTO : BaseDTO
{
    public QuestionDTO() {}
    public QuestionDTO(Question question)
    {
        Id = question.Id;
        QuestionSetId = question.QuestionSetId;
        Text = question.Text;
        Answers = question.Answers.Select(a => new QuestionAnswerDTO(a)).ToList();
        Points = question.Points;
    }

    public string Text { get; init; } = null!;
    public int QuestionSetId { get; init; }
    public List<QuestionAnswerDTO> Answers { get; init; } = [];
    public int Points { get; init; } = 0;
}
