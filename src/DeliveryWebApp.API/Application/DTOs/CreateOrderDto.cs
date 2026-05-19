using System.ComponentModel.DataAnnotations;

namespace DeliveryWebApp.API.Application.DTOs;

public class CreateOrderDto
{
    [Required(ErrorMessage = "Город отправителя обязателен")]
    [MaxLength(100)]
    public string SenderCity { get; init; } = string.Empty;

    [Required(ErrorMessage = "Адрес отправителя обязателен")]
    [MaxLength(200)]
    public string SenderAddress { get; init; } = string.Empty;

    [Required(ErrorMessage = "Город получателя обязателен")]
    [MaxLength(100)]
    public string ReceiverCity { get; init; } = string.Empty;

    [Required(ErrorMessage = "Адрес получателя обязателен")]
    [MaxLength(200)]
    public string ReceiverAddress { get; init; } = string.Empty;

    [Required(ErrorMessage = "Вес груза обязателен")]
    [Range(0.1, 10000, ErrorMessage = "Вес должен быть от 0.1 до 10000 кг")]
    public double WeightKg { get; init; }

    [Required(ErrorMessage = "Дата забора груза обязательна")]
    public DateOnly PickupDate { get; init; }
}