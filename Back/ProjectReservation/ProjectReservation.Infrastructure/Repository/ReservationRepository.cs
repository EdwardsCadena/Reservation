using Microsoft.EntityFrameworkCore;
using ProjectReservation.Core.Entities;
using ProjectReservation.Core.Interfaces;
using ProjectReservation.Infrastructure.Data;
using System;
using System.Linq;


namespace ProjectReservation.Infrastructure.Repository
{
    public class ReservationRepository : IReservationRepository
    {
        private readonly ReservationContext _context;

        public ReservationRepository(ReservationContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Reservation>> GetAllAsync(DateTime? reservationDate = null, int? serviceId = null, int? customerId = null)
        {
            var query = _context.Reservations.AsQueryable();

            // Filtrar por fecha si se proporciona
            if (reservationDate.HasValue)
            {
                var dateValue = reservationDate.Value.Date; 
                query = query.Where(r => r.ReservationDate.HasValue && r.ReservationDate.Value.Date == dateValue);
            }

            // Filtrar por ID de servicio si se proporciona
            if (serviceId.HasValue)
            {
                query = query.Where(r => r.ServiceId == serviceId.Value);
            }

            // Filtrar por ID de cliente si se proporciona
            if (customerId.HasValue)
            {
                query = query.Where(r => r.CustomerId == customerId.Value);
            }

            return await query.AsNoTracking().ToListAsync();
        }


        public async Task<Reservation> GetByIdAsync(int id)
        {
            return await _context.Reservations
                                 .Include(r => r.Customer)
                                 .Include(r => r.Service)
                                 .FirstOrDefaultAsync(r => r.ReservationId == id);
        }

        public async Task<Reservation> AddAsync(Reservation reservation)
        {
            _context.Reservations.Add(reservation);
            await _context.SaveChangesAsync();
            return reservation;
        }

        public async Task UpdateAsync(Reservation reservation)
        {
            _context.Entry(reservation).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var reservation = await _context.Reservations.FindAsync(id);
            if (reservation == null)
            {
                return false;
            }

            _context.Reservations.Remove(reservation);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
