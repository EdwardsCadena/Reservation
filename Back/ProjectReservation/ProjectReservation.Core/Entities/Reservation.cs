using System;
using System.Collections.Generic;

namespace ProjectReservation.Core.Entities;

public partial class Reservation
{
    public int ReservationId { get; set; }

    public int? CustomerId { get; set; }

    public int? ServiceId { get; set; }

    public DateTime? ReservationDate { get; set; }

    public string? Status { get; set; } = "Pending";

    public DateTime? CreatedAt { get; set; }

    public virtual Customer? Customer { get; set; }

    public virtual Service? Service { get; set; }
}
