using eXaminator.Models;
using Microsoft.EntityFrameworkCore;

namespace eXaminator.Db;

public class ExaminatorDbContext(DbContextOptions<ExaminatorDbContext> options) : DbContext(options)
{
    public DbSet<QuestionSet> QuestionSets { get; set; }
    public DbSet<Question> Questions { get; set; }
    public DbSet<ExamQuestion> ExamQuestions { get; set; }
    public DbSet<Exam> Exams { get; set; }
    public DbSet<Answer> Answers { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Answer>()
            .HasOne(x => x.Question)
            .WithMany(x => x.Answers)
            .HasForeignKey(x => x.QuestionId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<ExamQuestion>()
            .HasOne(x => x.Question)
            .WithMany()
            .HasForeignKey(x => x.QuestionId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<ExamQuestion>()
            .HasMany(x => x.SelectedAnswers)
            .WithMany()
            .UsingEntity(x => x.ToTable("SelectedAnswers"));

        modelBuilder.Entity<QuestionSet>()
            .HasMany(x => x.Questions)
            .WithOne(x => x.QuestionSet)
            .HasForeignKey(x => x.QuestionSetId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Exam>()
            .HasMany(x => x.ExamQuestions)
            .WithOne(x => x.Exam)
            .HasForeignKey(x => x.ExamId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Question>()
            .Navigation(q => q.Answers)
            .AutoInclude();

        modelBuilder.Entity<ExamQuestion>()
            .Navigation(eq => eq.SelectedAnswers)
            .AutoInclude();

        modelBuilder.Entity<ExamQuestion>()
            .Navigation(q => q.Question)
            .AutoInclude();

        base.OnModelCreating(modelBuilder);
    }
}
