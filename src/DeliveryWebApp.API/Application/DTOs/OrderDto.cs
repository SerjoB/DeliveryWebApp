namespace DeliveryWebApp.API.Application.DTOs;

public class OrderDto
{
    public int Id { get; init; }
    public string OrderNumber { get; init; } = string.Empty;

    public string SenderCity { get; init; } = string.Empty;
    public string SenderAddress { get; init; } = string.Empty;

    public string ReceiverCity { get; init; } = string.Empty;
    public string ReceiverAddress { get; init; } = string.Empty;

    public decimal WeightKg { get; init; }
    public DateOnly PickupDate { get; init; }

    public DateTime CreatedAt { get; init; }
}