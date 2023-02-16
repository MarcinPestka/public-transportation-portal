using Newtonsoft.Json;

namespace departures
{
    public class allDepartures {
        public List<departureInfo> departures {get;set;}
    }

    public class departureInfo
    {
        public int? delayInSeconds {get;set;}
        public DateTime estimatedTime {get;set;}
        public string headsign {get;set;}
        public string routeId {get;set;}
}

    public class allRoutes
    {
        public string lastUpdate {get;set;}
        public List<routeInfo> routes { get; set; }
    }
    public class todaysUpdate {
        [JsonProperty("2023-02-12")]
        public allRoutes today { get; set; }
    }


    public class routeInfo
    {
        public string routeId { get; set; }
        public string routeShortName { get; set; }
    }

    public class final
    {
        public string DisplayedTime {get;set;}
        public string busNumber {get;set;}
        public string headSign { get; set; }
        public int? delaySeconds { get; set; }
    }
}