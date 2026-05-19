using DeliveryWebApp.API.Data.Models;

namespace DeliveryWebApp.API.Repositories;

public interface IOrderRepository
{
    Task<List<Order>> GetAllAsync();
    Task<Order?> GetByIdAsync(int id);
    Task AddAsync(Order order);
    Task SaveChangesAsync();
}