using DeliveryWebApp.API.Application.DTOs;

namespace DeliveryWebApp.API.Application.Services;

public interface IOrderService
{
    Task<List<OrderDto>> GetAllAsync();
    Task<OrderDto?> GetByIdAsync(int id);
    Task<OrderDto> CreateAsync(CreateOrderDto dto);
}