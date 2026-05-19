namespace DeliveryWebApp.API.Data.Models;

public class Order
{
    public int Id { get; private set; }
    public string OrderNumber { get; private set; } = string.Empty;

    public string SenderCity { get; private set; } = string.Empty;
    public string SenderAddress { get; private set; } = string.Empty;

    public string ReceiverCity { get; private set; } = string.Empty;
    public string ReceiverAddress { get; private set; } = string.Empty;

    public double WeightKg { get; private set; }
    public DateOnly PickupDate { get; private set; }

    public DateTime CreatedAt { get; private set; }
    private Order() { }

    public static Order Create(
        string senderCity,
        string senderAddress,
        string receiverCity,
        string receiverAddress,
        double weightKg,
        DateOnly pickupDate)
    {
        return new Order
        {
            OrderNumber = GenerateOrderNumber(),
            SenderCity = senderCity,
            SenderAddress = senderAddress,
            ReceiverCity = receiverCity,
            ReceiverAddress = receiverAddress,
            WeightKg = weightKg,
            PickupDate = pickupDate,
            CreatedAt = DateTime.UtcNow
        };
    }

    private static string GenerateOrderNumber()
    {
        var datePart = DateTime.UtcNow.ToString("yyyyMMdd");
        var randomPart = Guid.NewGuid().ToString("N")[..16].ToUpper();
        return $"{datePart}-{randomPart}";
    }
}