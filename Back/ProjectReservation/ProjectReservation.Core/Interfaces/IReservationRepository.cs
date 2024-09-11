
using ProjectReservation.Core.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProjectReservation.Core.Interfaces
{
    public interface IReservationRepository
    {
        Task<IEnumerable<Reservation>> GetAllAsync(DateTime? reservationDate = null, int? serviceId = null, int? customerId = null);
        Task<Reservation> GetByIdAsync(int id);
        Task<Reservation> AddAsync(Reservation reservation);
        Task UpdateAsync(Reservation reservation);
        Task<bool> DeleteAsync(int id);
    }
}
