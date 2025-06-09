namespace eXaminator.Models;

public class ExamQuestion : Question
{
    public List<Answer> SelectedAnswers { get; init; } = [];
    public bool Correct => SelectedAnswers.All(x => x.Correct);
}
