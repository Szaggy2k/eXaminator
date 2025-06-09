using eXaminator.Models;

namespace eXaminator.DTOs;

public class QuestionAnswerDTO : AnswerDTO
{
    public QuestionAnswerDTO() { }
    public QuestionAnswerDTO(Answer a)
    {
        Id = a.Id;
        Text = a.Text;
        IsCorrect = a.IsCorrect;
    }
    public bool IsCorrect { get; init; }
}