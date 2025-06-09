using eXaminator.Models;

namespace eXaminator.DTOs;

public class AnswerDTO : BaseDTO
{
    public AnswerDTO() {}
    public AnswerDTO(Answer a)
    {
        Id = a.Id;
        Text = a.Text;
    }

    public string Text { get; init; } = null!;
}
