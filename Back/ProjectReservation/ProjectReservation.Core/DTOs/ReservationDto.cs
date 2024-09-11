using ProjectReservation.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectReservation.Core.DTOs
{
    public class ReservationDto
    {
        public int? CustomerId { get; set; }

        public int? ServiceId { get; set; }

        public DateTime? ReservationDate { get; set; }

        public string? Status { get; set; } = "Pending";


    }
}
