namespace eXaminator.Models;

public abstract class BaseEntity
{
    public int Id { get; set; }
    public DateTime CreationTime { get; set; }
    public DateTime? ModifyTime { get; set; }
}
