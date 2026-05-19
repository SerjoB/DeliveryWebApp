using DeliveryWebApp.API.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace DeliveryWebApp.API.Data;

public class AppDbContext : DbContext
{
    public DbSet<Order> Orders => Set<Order>();

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(o => o.Id);

            entity.Property(o => o.OrderNumber)
                .IsRequired()
                .HasMaxLength(25);

            entity.HasIndex(o => o.OrderNumber)
                .IsUnique();

            entity.Property(o => o.SenderCity)
                .IsRequired()
                .HasMaxLength(100);

            entity.Property(o => o.SenderAddress)
                .IsRequired()
                .HasMaxLength(200);

            entity.Property(o => o.ReceiverCity)
                .IsRequired()
                .HasMaxLength(100);

            entity.Property(o => o.ReceiverAddress)
                .IsRequired()
                .HasMaxLength(200);

            entity.Property(o => o.WeightKg)
                .IsRequired();

            entity.Property(o => o.PickupDate)
                .IsRequired();

            entity.Property(o => o.CreatedAt)
                .IsRequired();
        });
    }
}