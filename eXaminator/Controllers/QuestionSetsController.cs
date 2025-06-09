using eXaminator.Db;
using eXaminator.DTOs;
using eXaminator.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace eXaminator.Controllers;

[ApiController]
[Route("api/[controller]")]
public class QuestionSetsController(ExaminatorDbContext dbContext) : ControllerBase
{
    private readonly ExaminatorDbContext dbContext = dbContext;

    [HttpGet]
    public IActionResult GetAll() => Ok(dbContext.QuestionSets.AsNoTracking().ToList());

    [HttpGet("{id:int}")]
    public IActionResult Get(int id, [FromQuery] int? p, [FromQuery] int? s)
    {
        var questionSet = dbContext.QuestionSets.AsNoTracking().SingleOrDefault(qs => qs.Id == id);
        if (p is int page && s is int pageSize && questionSet is not null)
        {
            var pagedQuestions = dbContext.Questions
                .AsNoTracking()
                .Where(q => q.QuestionSetId == id)
                .OrderBy(q => q.Id)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();
            questionSet.Questions = pagedQuestions;
        }
        return questionSet is not null ? Ok(new QuestionSetDTO(questionSet)) : NotFound();
    }

    [HttpGet("size/{id:int}")]
    public IActionResult GetSize(int id) => Ok(dbContext.Questions.AsNoTracking().Where(q => q.QuestionSetId == id).Count());

    [HttpPost]
    public IActionResult Create([FromBody] string name)
    {
        if (string.IsNullOrWhiteSpace(name))
            return BadRequest("Nieprawidłowa nazwa zestawu.");
        QuestionSet questionSet = new()
        {
            CreationTime = DateTime.UtcNow,
            ModifyTime = null,
            Name = name,
            Questions = []
        };
        dbContext.QuestionSets.Add(questionSet);
        dbContext.SaveChanges();
        return CreatedAtAction(nameof(Get), new { id = questionSet.Id }, new QuestionSetDTO(questionSet));
    }

    [HttpPut("{id:int}")]
    public IActionResult Edit(int id, [FromBody] string newName)
    {
        if (string.IsNullOrWhiteSpace(newName))
            return BadRequest("Nieprawidłowa nazwa zestawu.");
        QuestionSet? questionSet = dbContext.QuestionSets.Find(id);
        if (questionSet is null)
            return NotFound();
        questionSet.Name = newName;
        questionSet.ModifyTime = DateTime.UtcNow;
        dbContext.SaveChanges();
        return Ok(questionSet);
    }

    [HttpDelete("{id:int}")]
    public IActionResult Delete(int id)
    {
        if (dbContext.Exams.AsNoTracking().Any(x => x.QuestionSetId == id))
            return BadRequest("Zestaw jest wykorzystywany przez egzamin. Najpierw usuń egzamin.");
        QuestionSet? questionSet = dbContext.QuestionSets.Find(id);
        if (questionSet is null)
            return NotFound();
        dbContext.QuestionSets.Remove(questionSet);
        dbContext.SaveChanges();
        return NoContent();
    }
}
