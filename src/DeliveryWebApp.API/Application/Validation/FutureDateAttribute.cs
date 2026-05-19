using System.ComponentModel.DataAnnotations;

namespace DeliveryWebApp.API.Application.Validation;


public class FutureDateAttribute : ValidationAttribute
{
    protected override ValidationResult? IsValid(object? value, ValidationContext context)
    {
        if (value is DateOnly date && date < DateOnly.FromDateTime(DateTime.UtcNow))
            return new ValidationResult("Дата забора груза не может быть в прошлом");

        return ValidationResult.Success;
    }
}