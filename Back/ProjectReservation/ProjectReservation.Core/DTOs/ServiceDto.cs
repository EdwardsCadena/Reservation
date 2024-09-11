namespace ProjectReservation.Core.DTOs
{
    public class ServiceDto
    {
        
        public string ServiceName { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int AvailableSlots { get; set; }
    }
}
