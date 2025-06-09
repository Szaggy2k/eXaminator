using eXaminator.Db;
using eXaminator.DTOs;
using eXaminator.Helpers;
using eXaminator.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace eXaminator.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ExamsController(ExaminatorDbContext dbContext) : ControllerBase
{
    private readonly ExaminatorDbContext dbContext = dbContext;

    [HttpGet("init/{questionSetId:int}/{amount:int}")]
    public IActionResult InitExam(int questionSetId, int amount)
    {
        if (amount <= 0)
            return BadRequest("Egzamin musi zawierać conajmniej jedno pytanie");

        if (dbContext.QuestionSets.AsNoTracking().All(qs => qs.Id != questionSetId))
            return NotFound();

        List<ExamQuestionDTO> randomQuestions = dbContext.Questions
             .AsNoTracking()
             .Where(q => q.QuestionSetId == questionSetId)
             .OrderBy(q => Guid.NewGuid())
             .Take(amount)
             .Select(q => new ExamQuestionDTO()
             {
                 QuestionId = q.Id,
                 AvailableAnswers = q.Answers.Select(a => new AnswerDTO(a)).ToList(),
                 Points = q.Points,
                 SelectedAnswersIds = new(),
                 Text = q.Text,
             })
             .ToList();

        return Ok(new ExamDTO
        {
            StartTime = DateTime.UtcNow,
            QuestionSetId = questionSetId,
            ExamQuestions = randomQuestions
        });
    }

    [HttpGet("{id:int}")]
    public IActionResult Get(int id)
    {
        Exam? exam = dbContext.Exams.AsNoTracking().Include(e => e.ExamQuestions).SingleOrDefault(e => e.Id == id);
        return exam is not null ? Ok(new ExamDTO(exam)) : NotFound();
    }

    [HttpGet("random/{questionSet:int}")]
    public IActionResult GetRandom(int questionSet)
    {
        Question? question = dbContext.Questions.AsNoTracking().OrderBy(q => Guid.NewGuid()).Take(1).SingleOrDefault();
        if (question is null)
            return NotFound();

        ExamQuestionDTO examQuestion = new()
        {
            QuestionId = question.Id,
            AvailableAnswers = question.Answers.Select(a => new AnswerDTO(a)).ToList(),
            Points = 1,
            Text = question.Text,
            SelectedAnswersIds = []
        };

        return Ok(examQuestion);
    }

    [HttpPost("verify")]
    public IActionResult Verify(ExamQuestionDTO examQuestionDto)
    {
        Question? dbQuestion = dbContext.Questions.AsNoTracking().SingleOrDefault(q => q.Id == examQuestionDto.QuestionId);
        if(dbQuestion is null)
            return NotFound();
        int[] correctAnswersIds = dbQuestion.Answers.Select(a => a.Id).ToArray();
        return Ok(new { IsCorrect = HashHelper.GetAnswersHash([..examQuestionDto.SelectedAnswersIds]) == HashHelper.GetAnswersHash([..correctAnswersIds]), CorrectAnswerIds = correctAnswersIds });
    }

    [HttpPost]
    public IActionResult Create([FromBody] ExamDTO examDto)
    {
        Exam exam = new()
        {
            CreationTime = DateTime.UtcNow,
            StartTime = examDto.StartTime,
            ModifyTime = null,
            Examinee = examDto.Examinee,
            MaxDuration = TimeSpan.FromMinutes(examDto.MaxDurationMinutes),
            PassingThreshold = examDto.PassingThreshold switch
            {
                < 0 => 0,
                > 100 => 100,
                _ => examDto.PassingThreshold
            },
            ExamQuestions = examDto.ExamQuestions.Select(eq => new ExamQuestion()
            {
                CreationTime = DateTime.UtcNow,
                ModifyTime = null,
                QuestionId = eq.QuestionId,
                SelectedAnswers = eq.SelectedAnswersIds.Select(id => dbContext.Answers.Single(dbAnswer => dbAnswer.Id == id)).ToList()
            }).ToList()
        };

        dbContext.Exams.Add(exam);
        dbContext.SaveChanges();
        return CreatedAtRoute(nameof(Get), new { id = exam.Id }, exam);
    }

    [HttpDelete("{id:int}")]
    public IActionResult Delete(int id)
    {
        Exam? exam = dbContext.Exams.Find(id);
        if (exam is null)
            return NotFound();
        dbContext.Exams.Remove(exam);
        dbContext.SaveChanges();
        return NoContent();
    }
}
