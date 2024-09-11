using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ProjectReservation.Api.Response;
using ProjectReservation.Core.DTOs;
using ProjectReservation.Core.Entities;
using ProjectReservation.Core.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProjectReservation.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly ICustomerRepository _repository;
        private readonly IMapper _mapper;

        public CustomersController(ICustomerRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<CustomerDto>>>> GetCustomers()
        {
            var customers = await _repository.GetAllAsync();
            var customersDto = _mapper.Map<IEnumerable<CustomerDto>>(customers);
            return Ok(new ApiResponse<IEnumerable<CustomerDto>>(customersDto));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<CustomerDto>>> GetCustomer(int id)
        {
            var customer = await _repository.GetByIdAsync(id);
            if (customer == null)
            {
                return NotFound(new ApiResponse<CustomerDto>(null));
            }

            var customerDto = _mapper.Map<CustomerDto>(customer);
            return Ok(new ApiResponse<CustomerDto>(customerDto));
        }

        [HttpPost]
        public async Task<ActionResult<ApiResponse<CustomerDto>>> PostCustomer(CustomerDto customerDto)
        {
            var customer = _mapper.Map<Customer>(customerDto);
            var newCustomer = await _repository.AddAsync(customer);
            var newCustomerDto = _mapper.Map<CustomerDto>(newCustomer);
            return CreatedAtAction(nameof(GetCustomer), new { id = newCustomer.CustomerId }, new ApiResponse<CustomerDto>(newCustomerDto));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomer(int id, Customer customerDto)
        {
            if (id != customerDto.CustomerId)
            {
                return BadRequest(new ApiResponse<CustomerDto>(null));
            }

            var customer = _mapper.Map<Customer>(customerDto);
            await _repository.UpdateAsync(customer);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            var result = await _repository.DeleteAsync(id);
            if (!result)
            {
                return NotFound(new ApiResponse<CustomerDto>(null));
            }

            return NoContent();
        }
    }
}
