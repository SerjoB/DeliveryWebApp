using DeliveryWebApp.API.Application.DTOs;

namespace DeliveryWebApp.API.Application.Services;

public interface IOrderService
{
    Task<PagedResult<OrderDto>> GetAllAsync(int page, int pageSize, CancellationToken ct = default);
    Task<OrderDto?> GetByIdAsync(int id, CancellationToken ct = default);
    Task<OrderDto> CreateAsync(CreateOrderDto dto, CancellationToken ct = default);
}