
using System.Security.Cryptography;
using System.Text;
using System.Text.Json.Serialization;

namespace eXaminator.Models;

public class Question : BaseEntity
{
    private string? _correctHash;
    public string Text { get; set; } = null!;
    public int QuestionSetId { get; set; }
    public QuestionSet QuestionSet { get; set; } = null!;
    public List<Answer> Answers { get; set; } = [];
    public int Points { get; set; }
}