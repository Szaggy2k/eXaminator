using eXaminator.Models;
using System.Security.Cryptography;
using System.Text;

namespace eXaminator.Helpers;

public static class HashHelper
{
    public static string GetAnswersHash(int[] answerIds) => Encoding.UTF8.GetString(MD5.HashData(Encoding.UTF8.GetBytes(string.Join('_', answerIds.OrderDescending()))));
}
