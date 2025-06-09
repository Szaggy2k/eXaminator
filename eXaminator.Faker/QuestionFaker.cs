using Bogus;
using eXaminator.Models;

namespace eXaminator.Faker;

public class QuestionFaker : Faker<Question>
{
    public QuestionFaker()
    {
        RuleFor(d => d.Text, f => f.Lorem.Sentence(10));
        RuleFor(d => d.Points, f => f.Random.Int(1, 1));
        RuleFor(d => d.Answers, f => f.Make(f.Random.Int(2, 5), () => new AnswerFaker().Generate()));
    }
}
