using DeliveryWebApp.API.Application.DTOs;
using DeliveryWebApp.API.Data.Models;

namespace DeliveryWebApp.API.Repositories;

public interface IOrderRepository
{
    Task<(List<Order> Items, int TotalCount)> GetAllAsync(int page, int pageSize, CancellationToken ct = default);
    Task<Order?> GetByOrderNumberAsync(string orderNumber, CancellationToken ct = default);
    Task AddAsync(Order order, CancellationToken ct = default);
    Task SaveChangesAsync(CancellationToken ct = default);
}