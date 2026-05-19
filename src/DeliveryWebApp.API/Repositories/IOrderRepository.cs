using DeliveryWebApp.API.Data.Models;

namespace DeliveryWebApp.API.Repositories;

public interface IOrderRepository
{
    Task<List<Order>> GetAllAsync(CancellationToken ct = default);
    Task<Order?> GetByIdAsync(int id, CancellationToken ct = default);
    Task AddAsync(Order order);
    Task SaveChangesAsync();
}