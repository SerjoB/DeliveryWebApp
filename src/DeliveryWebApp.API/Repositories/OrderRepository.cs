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

    public async Task<(List<Order> Items, int TotalCount)> GetAllAsync(int page, int pageSize, CancellationToken ct = default)
    {
        var query = await _context.Orders
            .AsNoTracking()
            .OrderByDescending(o => o.CreatedAt)
            .Select(o => new
            {
                Order = o,
                TotalCount = _context.Orders.Count()
            })
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync(ct);

        var totalCount = query.FirstOrDefault()?.TotalCount ?? 0;
        var items = query.Select(q => q.Order).ToList();

        return (items, totalCount);
    }

    public Task<Order?> GetByOrderNumberAsync(string orderNumber, CancellationToken ct = default) =>
        _context.Orders
            .AsNoTracking()
            .FirstOrDefaultAsync(o => o.OrderNumber == orderNumber, ct);

    public async Task AddAsync(Order order, CancellationToken ct = default) =>
        await _context.Orders.AddAsync(order, ct);

    public Task SaveChangesAsync(CancellationToken ct = default) =>
        _context.SaveChangesAsync(ct); 
}
