using System;
using System.Collections.Generic;

namespace ProjectReservation.Core.Entities;

public partial class AvailableSlot
{
    public int SlotId { get; set; }

    public int? ServiceId { get; set; }

    public DateTime? SlotTime { get; set; }

    public bool? IsAvailable { get; set; }

    public virtual Service? Service { get; set; }
}
