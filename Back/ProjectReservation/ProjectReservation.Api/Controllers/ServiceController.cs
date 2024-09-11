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
    public class ServicesController : ControllerBase
    {
        private readonly IServiceRepository _repository;
        private readonly IMapper _mapper;

        public ServicesController(IServiceRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<ServiceDto>>>> GetServices()
        {
            var services = await _repository.GetAllAsync();
            var servicesDto = _mapper.Map<IEnumerable<ServiceDto>>(services);
            return Ok(new ApiResponse<IEnumerable<ServiceDto>>(servicesDto));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<ServiceDto>>> GetService(int id)
        {
            var service = await _repository.GetByIdAsync(id);
            if (service == null)
            {
                return NotFound(new ApiResponse<ServiceDto>(null));
            }

            var serviceDto = _mapper.Map<ServiceDto>(service);
            return Ok(new ApiResponse<ServiceDto>(serviceDto));
        }

        [HttpPost]
        public async Task<ActionResult<ApiResponse<ServiceDto>>> PostService(ServiceDto serviceDto)
        {
            var service = _mapper.Map<Service>(serviceDto);
            var newService = await _repository.AddAsync(service);
            var newServiceDto = _mapper.Map<ServiceDto>(newService);
            return CreatedAtAction(nameof(GetService), new { id = newService.ServiceId }, new ApiResponse<ServiceDto>(newServiceDto));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutService(int id, Service serviceDto)
        {
            if (id != serviceDto.ServiceId)
            {
                return BadRequest(new ApiResponse<ServiceDto>(null));
            }

            var service = _mapper.Map<Service>(serviceDto);
            await _repository.UpdateAsync(service);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteService(int id)
        {
            var result = await _repository.DeleteAsync(id);
            if (!result)
            {
                return NotFound(new ApiResponse<ServiceDto>(null));
            }

            return NoContent();
        }
    }
}
