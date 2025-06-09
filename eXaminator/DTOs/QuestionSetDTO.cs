using eXaminator.DTOs;
using eXaminator.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace eXaminator.DTOs;

public class QuestionSetDTO : BaseDTO
{
    public QuestionSetDTO() {}

    public QuestionSetDTO(QuestionSet questionSet)
    {
        Id = questionSet.Id;
        Name = questionSet.Name;
        Questions = questionSet.Questions.Select(q => new QuestionDTO(q)).ToList();
        CreationTime = questionSet.CreationTime;
    }

    public string Name { get; init; } = null!;
    public List<QuestionDTO> Questions { get; init; } = [];
    public DateTime CreationTime { get; init; }
}
