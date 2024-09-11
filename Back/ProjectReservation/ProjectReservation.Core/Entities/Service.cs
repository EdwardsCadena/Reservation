using System;
using System.Collections.Generic;

namespace ProjectReservation.Core.Entities;

public partial class Service
{
    public int ServiceId { get; set; }

    public string? ServiceName { get; set; }

    public string? Description { get; set; }

    public decimal? Price { get; set; }

    public int? AvailableSlots { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual ICollection<AvailableSlot> AvailableSlotsNavigation { get; set; } = new List<AvailableSlot>();

    public virtual ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();
}
