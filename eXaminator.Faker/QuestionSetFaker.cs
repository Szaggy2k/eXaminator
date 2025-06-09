using Bogus;
using eXaminator.Models;

namespace eXaminator.Faker;

public class QuestionSetFaker : Faker<QuestionSet>
{
    public QuestionSetFaker()
    {
        RuleFor(d => d.Name, f => f.Lorem.Word());
        RuleFor(d => d.Questions, f => f.Make(1400, () => new QuestionFaker().Generate()));
    }
}
