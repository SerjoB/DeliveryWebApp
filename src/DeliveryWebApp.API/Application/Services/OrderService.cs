using DeliveryWebApp.API.Application.DTOs;
using DeliveryWebApp.API.Data.Models;
using DeliveryWebApp.API.Repositories;

namespace DeliveryWebApp.API.Application.Services;

public class OrderService : IOrderService
{
    private readonly IOrderRepository _repository;
    private readonly ILogger<OrderService> _logger;

    public OrderService(IOrderRepository repository, ILogger<OrderService> logger)
    {
        _repository = repository;
        _logger = logger;
    }

    public async Task<List<OrderDto>> GetAllAsync(CancellationToken ct = default)
    {
        var orders = await _repository.GetAllAsync(ct);
        _logger.LogInformation("Получено {Count} заказов", orders.Count);
        return orders.Select(MapToDto).ToList();
    }

    public async Task<OrderDto?> GetByIdAsync(int id, CancellationToken ct = default)
    {
        var order = await _repository.GetByIdAsync(id, ct);
        if (order is not null) return MapToDto(order);
        
        _logger.LogWarning("Заказ с id={Id} не найден", id);
        return null;
    }

    public async Task<OrderDto> CreateAsync(CreateOrderDto dto, CancellationToken ct = default)
    {
        var order = Order.Create(
            dto.SenderCity.Trim(),
            dto.SenderAddress.Trim(),
            dto.ReceiverCity.Trim(),
            dto.ReceiverAddress.Trim(),
            dto.WeightKg,
            dto.PickupDate);

        await _repository.AddAsync(order, ct);
        await _repository.SaveChangesAsync(ct);
        
        _logger.LogInformation("Создан заказ {OrderNumber}", order.OrderNumber);

        return MapToDto(order);
    }

    private static OrderDto MapToDto(Order order) => new()
    {
        Id = order.Id,
        OrderNumber = order.OrderNumber,
        SenderCity = order.SenderCity,
        SenderAddress = order.SenderAddress,
        ReceiverCity = order.ReceiverCity,
        ReceiverAddress = order.ReceiverAddress,
        WeightKg = order.WeightKg,
        PickupDate = order.PickupDate,
        CreatedAt = order.CreatedAt
    };
}