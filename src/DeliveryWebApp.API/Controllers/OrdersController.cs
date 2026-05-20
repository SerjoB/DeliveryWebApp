using DeliveryWebApp.API.Application.DTOs;
using DeliveryWebApp.API.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace DeliveryWebApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly IOrderService _orderService;

    public OrdersController(IOrderService orderService)
    {
        _orderService = orderService;
    }

    // GET api/orders
    [HttpGet]
    [ProducesResponseType(typeof(PagedResult<OrderDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        CancellationToken ct = default)
    {
        var result = await _orderService.GetAllAsync(page, pageSize, ct);
        return Ok(result);
    }

    // GET api/orders/id
    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof(OrderDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetById(int id, CancellationToken ct = default)
    {
        var order = await _orderService.GetByIdAsync(id, ct);

        if (order is null)
            return NotFound(new { message = $"Заказ с id={id} не найден" });

        return Ok(order);
    }

    // POST api/orders
    [HttpPost]
    [ProducesResponseType(typeof(OrderDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create([FromBody] CreateOrderDto dto, CancellationToken ct = default)
    {
        var order = await _orderService.CreateAsync(dto, ct);
        return CreatedAtAction(nameof(GetById), new { id = order.Id }, order);
    }
}