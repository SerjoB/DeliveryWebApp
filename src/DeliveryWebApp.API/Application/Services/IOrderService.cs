using DeliveryWebApp.API.Application.DTOs;

namespace DeliveryWebApp.API.Application.Services;

public interface IOrderService
{
    Task<List<OrderDto>> GetAllAsync(CancellationToken ct = default);
    Task<OrderDto?> GetByIdAsync(int id, CancellationToken ct = default);
    Task<OrderDto> CreateAsync(CreateOrderDto dto);
}