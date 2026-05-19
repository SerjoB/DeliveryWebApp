using DeliveryWebApp.API.Application.DTOs;
using DeliveryWebApp.API.Data.Models;
using DeliveryWebApp.API.Repositories;

namespace DeliveryWebApp.API.Application.Services;

public class OrderService : IOrderService
{
    private readonly IOrderRepository _repository;

    public OrderService(IOrderRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<OrderDto>> GetAllAsync(CancellationToken ct = default)
    {
        var orders = await _repository.GetAllAsync(ct);
        return orders.Select(MapToDto).ToList();
    }

    public async Task<OrderDto?> GetByIdAsync(int id, CancellationToken ct = default)
    {
        var order = await _repository.GetByIdAsync(id, ct);
        return order is null ? null : MapToDto(order);
    }

    public async Task<OrderDto> CreateAsync(CreateOrderDto dto)
    {
        var order = Order.Create(
            dto.SenderCity.Trim(),
            dto.SenderAddress.Trim(),
            dto.ReceiverCity.Trim(),
            dto.ReceiverAddress.Trim(),
            dto.WeightKg,
            dto.PickupDate);

        await _repository.AddAsync(order);
        await _repository.SaveChangesAsync();

        return MapToDto(order);
    }

    private static OrderDto MapToDto(Order order) => new()  //Маппер живет здесь потому что он не нужен нигде кроме как здесь
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