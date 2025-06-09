using eXaminator.Db;
using eXaminator.DTOs;
using eXaminator.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace eXaminator.Controllers;

[ApiController]
[Route("api/[controller]")]
public class QuestionsController(ExaminatorDbContext dbContext) : ControllerBase
{
    private readonly ExaminatorDbContext dbContext = dbContext;

    [HttpGet("{id:int}")]
    public IActionResult Get(int id)
    {
        Question? question = dbContext.Questions.AsNoTracking().SingleOrDefault(q => q.Id == id);
        return question is not null ? Ok(new QuestionDTO(question)) : NotFound();
    }

    [HttpPost]
    public IActionResult Create([FromBody] QuestionDTO questionDto)
    {
        if (questionDto is null || string.IsNullOrWhiteSpace(questionDto.Text) || questionDto.QuestionSetId <= 0)
            return BadRequest("Nieprawidłowe pytanie");
        
        Question question = new()
        {
            Text = questionDto.Text,
            QuestionSetId = questionDto.QuestionSetId,
            Points = questionDto.Points,
            CreationTime = DateTime.UtcNow,
            ModifyTime = null,
            Answers = questionDto.Answers.Select(a => new Answer { Text = a.Text, IsCorrect = a.IsCorrect }).ToList()
        };

        dbContext.Questions.Add(question);
        dbContext.SaveChanges();
        return CreatedAtAction(nameof(Get), new { id = question.Id }, new QuestionDTO(question));
    }

    [HttpPut]
    public IActionResult Update([FromBody] QuestionDTO questionDto)
    {
        if (questionDto is null
            || string.IsNullOrWhiteSpace(questionDto.Text)
            || questionDto.QuestionSetId <= 0
            || questionDto.Answers.Count < 2
            || questionDto.Points < 1)
            return BadRequest("Nieprawidłowe pytanie");
        
        Question? question = dbContext.Questions.SingleOrDefault(q => q.Id == questionDto.Id);
        if (question is null)
            return NotFound();

        question.Text = questionDto.Text;
        question.QuestionSetId = questionDto.QuestionSetId;
        question.Points = questionDto.Points;
        question.ModifyTime = DateTime.UtcNow;
        question.Answers = questionDto.Answers.Select(a => new Answer { Text = a.Text, IsCorrect = a.IsCorrect }).ToList();
        dbContext.SaveChanges();
        return Ok(new QuestionDTO(question));
    }

    [HttpDelete("{id:int}")]
    public IActionResult Delete(int id)
    {
        if (dbContext.ExamQuestions.AsNoTracking().Any(x => x.QuestionId == id))
            return BadRequest($"Pytanie jest wykorzystywane w egzaminie. Najpierw usuń egzamin.");

        Question? question = dbContext.Questions.SingleOrDefault(q => q.Id == id);
        if (question is null)
            return NotFound();

        dbContext.Questions.Remove(question);
        dbContext.SaveChanges();
        return NoContent();
    }
}
