using ProjectReservation.Core.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProjectReservation.Core.Interfaces
{
    public interface IServiceRepository
    {
        Task<IEnumerable<Service>> GetAllAsync();
        Task<Service> GetByIdAsync(int id);
        Task<Service> AddAsync(Service service);
        Task UpdateAsync(Service service);
        Task<bool> DeleteAsync(int id);
    }
}
