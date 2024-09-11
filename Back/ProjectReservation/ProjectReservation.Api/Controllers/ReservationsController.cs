using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ProjectReservation.Api.Response;
using ProjectReservation.Core.DTOs;
using ProjectReservation.Core.Entities;
using ProjectReservation.Core.Interfaces;

namespace ProjectReservation.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationsController : ControllerBase
    {
        private readonly IReservationRepository _repository;
        private readonly IMapper _mapper;

        public ReservationsController(IReservationRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<ReservationDto>>>> GetReservations([FromQuery] DateTime? reservationDate = null, [FromQuery] int? serviceId = null, [FromQuery] int? customerId = null)
        {
            var reservations = await _repository.GetAllAsync(reservationDate, serviceId, customerId);
            var reservationDtos = _mapper.Map<IEnumerable<ReservationDto>>(reservations);
            return Ok(new ApiResponse<IEnumerable<ReservationDto>>(reservationDtos));
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<ReservationDto>>> GetReservation(int id)
        {
            var reservation = await _repository.GetByIdAsync(id);
            if (reservation == null)
            {
                return NotFound(new ApiResponse<ReservationDto>(null));
            }

            var reservationDto = _mapper.Map<ReservationDto>(reservation);
            return Ok(new ApiResponse<ReservationDto>(reservationDto));
        }

        [HttpPost]
        public async Task<ActionResult<ApiResponse<ReservationDto>>> PostReservation(ReservationDto reservationDto)
        {
            var reservation = _mapper.Map<Reservation>(reservationDto);
            var newReservation = await _repository.AddAsync(reservation);
            var newReservationDto = _mapper.Map<ReservationDto>(newReservation);
            return CreatedAtAction(nameof(GetReservation), new { id = newReservation.ReservationId }, new ApiResponse<ReservationDto>(newReservationDto));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutReservation(int id, Reservation reservationDto)
        {
            if (id != reservationDto.ReservationId) 
            {
                return BadRequest(new ApiResponse<Reservation>(null));
            }

            // Mapear el DTO a la entidad utilizando un nombre diferente para evitar la colisión de nombres
            var reservationEntity = _mapper.Map<Reservation>(reservationDto);
            await _repository.UpdateAsync(reservationEntity);

            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReservation(int id)
        {
            var result = await _repository.DeleteAsync(id);
            if (!result)
            {
                return NotFound(new ApiResponse<ReservationDto>(null));
            }

            return NoContent();
        }
    }
}
