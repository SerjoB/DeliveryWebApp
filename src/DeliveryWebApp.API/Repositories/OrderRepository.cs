using DeliveryWebApp.API.Data;
using DeliveryWebApp.API.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace DeliveryWebApp.API.Repositories;

public class OrderRepository : IOrderRepository
{
    private readonly AppDbContext _context;

    public OrderRepository(AppDbContext context)
    {
        _context = context;
    }

    public Task<List<Order>> GetAllAsync(CancellationToken ct = default) =>
        _context.Orders
            .OrderByDescending(o => o.CreatedAt)
            .ToListAsync(ct);

    public Task<Order?> GetByIdAsync(int id, CancellationToken ct = default) =>
        _context.Orders.FirstOrDefaultAsync(o => o.Id == id, ct);

    public async Task AddAsync(Order order) =>
        await _context.Orders.AddAsync(order);

    public Task SaveChangesAsync() =>
        _context.SaveChangesAsync(); 
}
