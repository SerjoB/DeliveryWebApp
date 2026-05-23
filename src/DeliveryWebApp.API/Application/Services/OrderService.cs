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

    public async Task<PagedResult<OrderDto>> GetAllAsync(int page, int pageSize, CancellationToken ct = default)
    {
        var (items, totalCount) = await _repository.GetAllAsync(page, pageSize, ct);

        _logger.LogInformation("Получено {Count} заказов", items.Count);

        return new PagedResult<OrderDto>
        {
            Items = items.Select(MapToDto).ToList(),
            TotalCount = totalCount,
            Page = page,
            PageSize = pageSize
        };
    }

    public async Task<OrderDto?> GetByOrderNumberAsync(string orderNumber, CancellationToken ct = default)
    {
        var order = await _repository.GetByOrderNumberAsync(orderNumber, ct);
        if (order is not null) return MapToDto(order);
        
        _logger.LogWarning("Заказ с orderNumber={orderNumber} не найден", orderNumber);
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