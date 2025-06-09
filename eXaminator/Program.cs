using eXaminator.Db;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using System.Reflection;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
    options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
});

builder.Services.AddDbContext<ExaminatorDbContext>(options => options.UseSqlite("Data Source=eXaminator.db"));
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowDevClient", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

var app = builder.Build();

using var scope = app.Services.CreateScope();
using var context = scope.ServiceProvider.GetRequiredService<ExaminatorDbContext>();
await context.Database.MigrateAsync();

if (app.Environment.IsDevelopment())
{
    app.UseCors("AllowDevClient");
}
else
{
    app.UseStaticFiles();
    app.UseRouting();
    app.MapFallbackToFile("index.html");
}

app.MapControllers();

app.Map("/api/version", static () => Assembly.GetEntryAssembly()?.GetCustomAttribute<AssemblyFileVersionAttribute>()?.Version);

app.Run("http://*:80");
