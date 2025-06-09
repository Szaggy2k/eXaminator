using Bogus;
using eXaminator.Models;

namespace eXaminator.Faker;

public class AnswerFaker : Faker<Answer>
{
    public AnswerFaker()
    {
        RuleFor(d => d.Text, f => f.Lorem.Word());
        RuleFor(d => d.IsCorrect, f => f.Random.Bool());
    }
}
