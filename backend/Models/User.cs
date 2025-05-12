namespace backend.Models
{
    public class User
    {
        public User(string firstname, string lastname, string email, string password)
        {
            FirstName = firstname;
            LastName = lastname;
            Email = email;
            Password = password;
        }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
